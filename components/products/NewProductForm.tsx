"use client";
import React, { useMemo, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import SelectCurrency from "./SelectCurrency";
import {
  AccessoriesType,
  ClothingType,
  Colors_DATA,
  ElectronicsType,
  OtherType,
  ProductCategories,
  ShoesType,
  State_Data,
  StateValuesType,
} from "@/utils/productData";
import SelectOptions from "./SelectOptions";
import SelectColors from "./SelectColors";
import Image from "next/image";
import { Loader, X } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { put } from "@vercel/blob";
import { randomUID } from "@/utils/functions";
import {
  uploadProduct,
  uploadProductImagesUrls,
  UploadProductType,
} from "@/actions/product";
import { ProductCategoryValues } from "@/utils/productData";
import { useRouter } from "next/navigation";

const NewProductForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);

  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  const [currency, setCurrency] = useState("USD");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const TYPES_DATA = useMemo(
    () =>
      category === "electroniques"
        ? ElectronicsType
        : category === "vetements"
        ? ClothingType
        : category === "chaussures"
        ? ShoesType
        : category === "accessoires"
        ? AccessoriesType
        : OtherType,
    [category]
  );

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setPrice(0);
    setImage(null);
    setImages([]);
    setState("");
    setType("");
    setCategory("");
    setCurrency("USD");
    setBrand("");
    setColor("");
  };

  // add images to vercel-blob
  const uploadImages = async () => {
    let imgUrl = "";
    const imgUrls: string[] = [];

    try {
      // upload de l'image principale
      if (!image) throw new Error("L'image principale est manquante");
      const imgID = randomUID();

      const response = await put(`images/${imgID}`, image, {
        access: "public",
      });
      imgUrl = response.url;

      // upload des images additionnelles si présentes
      if (images.length > 0) {
        // on utilise map pour créer un tableau de Promesses qui retournent l'url
        const uploadPromises = images.map(async (img) => {
          const imgID = randomUID();
          const res = await put(`images/${imgID}`, img, {
            access: "public",
          });
          return res.url;
        });

        // on attend la résolution de toutes les promesses et on stocke les URLs retournées
        const urls = await Promise.all(uploadPromises);
        imgUrls.push(...urls);
      }

      return {
        imgUrl,
        imgUrls,
      };
    } catch (error) {
      console.error("Error uploading images:", error);
      throw new Error(
        "Une erreur s'est produite lors du téléchargement des images."
      );
    }
  };

  const handleSubmit = async () => {
    // Handle form submission logic here
    setLoading(true);
    try {
      if (!canProceed()) return;

      // form data for send info first.
      const formData: UploadProductType = {
        title,
        description,
        price,
        state: state as StateValuesType,
        type,
        category: category as ProductCategoryValues,
        currency: currency as "USD" | "CDF",
        brand,
        color,
      };

      // send form
      const firstResult = await uploadProduct(formData);

      if (firstResult.error) {
        toast.error(
          firstResult.message ||
            "Une erreur est survenue lors de l'ajout du produit."
        );
        return;
      }

      if (!firstResult.data) {
        toast.error("Une erreur est survenue lors de l'ajout du produit.");
        return;
      }

      const productId = firstResult.data.id;

      // second upload for images
      const { imgUrl, imgUrls } = await uploadImages();

      const secondResult = await uploadProductImagesUrls({
        image: imgUrl,
        images: imgUrls.length > 0 ? imgUrls : undefined,
        productId,
      });

      if (secondResult.error) {
        toast.error(
          secondResult.message ||
            "Une erreur est survenue lors de l'ajout des images."
        );
        return;
      }

      toast.success("Produit ajouté avec succès !");
      handleReset();
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Une erreur s'est produite lors de l'envoi du formulaire.");
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    if (!title || !description || !price || !image || !category || !type) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return false;
    }
    if (price <= 0) {
      toast.error("Le prix doit être supérieur à zéro.");
      return false;
    }
    if (images.length > 3) {
      toast.error(
        "Vous ne pouvez pas ajouter plus de 3 images supplémentaires."
      );
      return false;
    }
    return true;
  };

  return (
    <div
      className="max-w-7xl mx-auto py-8
  px-6 sm:px-8 lg:px-10
  "
    >
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* general info */}
        <div className="w-full flex flex-col gap-5">
          <h2 className="text-lg font-bold mb-2">Information generale</h2>
          {/* title */}
          <div className="grid w-full gap-2">
            <Label htmlFor="title">
              Produit <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Iphone 14"
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="product-title"
              minLength={2}
              maxLength={60}
              disabled={loading}
              required
            />
          </div>

          {/* description */}
          <div className="grid w-full gap-2">
            <Label htmlFor="des">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ram 16GB, 512GB de stockage, 14 pouces"
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="product-description"
              maxLength={200}
              disabled={loading}
              className="min-h-20 max-h-36"
              required
            />
          </div>

          <div className="grid w-full gap-4 grid-cols-2">
            <div className="grid w-full gap-2">
              <Label htmlFor="price">
                Prix <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="1000"
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="product-price"
                min={0}
                disabled={loading}
                required
              />
            </div>
            <div className="grid w-full gap-2">
              <Label htmlFor="currency">
                Devise <span className="text-red-500">*</span>
              </Label>
              <SelectCurrency
                currency={currency}
                onChange={setCurrency}
                disabled={loading}
                className="w-full"
                required
              />
            </div>
          </div>

          {/* category and type */}
          <div className="grid w-full gap-4 grid-cols-2">
            {/* category */}
            <div className="grid w-full gap-2">
              <Label htmlFor="currency">
                Categorie <span className="text-red-500">*</span>
              </Label>
              <SelectOptions
                options={ProductCategories}
                onChange={(val) => {
                  setCategory(val);
                  setType("");
                }}
                value={category}
                disabled={loading}
                className="w-full"
                placeholder="Selectionnez une categorie"
                required
              />
            </div>
            {/* type */}
            <div className="grid w-full gap-2">
              <Label htmlFor="currency">
                Type <span className="text-red-500">*</span>
              </Label>
              <SelectOptions
                options={TYPES_DATA}
                onChange={setType}
                value={type}
                disabled={loading || !category}
                className="w-full"
                placeholder="Selectionnez un type"
                required
              />
            </div>
          </div>

          {/* state */}
          <div className="grid w-full gap-2">
            <Label htmlFor="state">
              État <span className="text-red-500">*</span>
            </Label>
            <SelectOptions
              options={State_Data}
              onChange={setState}
              value={state}
              disabled={loading}
              className="w-full"
              placeholder="Selectionnez un état"
              required
            />
          </div>

          {/* Colors */}
          <div className="grid w-full gap-2">
            <Label htmlFor="color">
              Couleur <span className="text-red-500">*</span>
            </Label>
            <SelectColors
              options={Colors_DATA}
              onChange={setColor}
              value={color}
              disabled={loading}
              className="w-full"
              placeholder="Selectionnez une couleur"
              required
            />
          </div>
          {/* brand */}
          <div className="grid w-full gap-2">
            <Label htmlFor="brand">Marque</Label>
            <Input
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Apple"
              disabled={loading}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
            />
          </div>
        </div>

        {/*======================== images and btns ====================== */}
        <div
          className=" w-full  
          flex flex-col gap-6 pt-2 md:px-6
        grid-cols-1
        "
        >
          <h2 className="text-lg font-semibold">Les images</h2>
          {/* Image principale */}
          <div className="w-full grid gap-2 grid-cols-1">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image principale <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              id="image"
              accept="image/*"
              disabled={loading}
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                } else {
                  setImage(null);
                }
              }}
              required
            />

            {/* Label stylé comme un bouton pour ouvrir la sélection */}
            <label
              htmlFor="image"
              className="flex items-center justify-center cursor-pointer border 
              border-dashed border-gray-400 rounded-lg h-40 text-gray-500 
              dark:hover:bg-gray-100 hover:bg-gray-600 transition"
              aria-label="Sélectionner une image principale"
            >
              {image ? (
                <span className="text-gray-900 font-semibold">
                  Changer l’image
                </span>
              ) : (
                <span>Cliquer pour choisir une image</span>
              )}
            </label>

            {/* Affichage de l’image sélectionnée */}
            {image && (
              <div
                className="relative h-40 w-full mt-2 rounded-lg 
              shadow-md overflow-hidden"
              >
                <Image
                  src={URL.createObjectURL(image)}
                  alt="Aperçu image principale"
                  className="object-cover w-full h-full"
                  width={600}
                  height={400}
                  priority={true}
                />

                {/* Bouton de suppression */}
                <button
                  type="button"
                  aria-label="Supprimer l’image principale"
                  className="absolute top-2 right-2 bg-red-600 
                  hover:bg-red-700 text-white p-2 rounded-full 
                  shadow-lg transition"
                  onClick={() => setImage(null)}
                >
                  <X />
                </button>
              </div>
            )}
          </div>

          {/* Images additionnelles (max 3) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <label
              htmlFor="additional-images"
              className="flex items-center justify-center cursor-pointer 
              border border-dashed border-gray-400 rounded-lg h-32 
              text-gray-500 dark:hover:bg-gray-100 hover:bg-gray-700 
              transition "
            >
              <input
                type="file"
                id="additional-images"
                accept="image/*"
                multiple={images.length < 3}
                className="hidden"
                disabled={loading || images.length >= 3}
                onChange={(e) => {
                  if (e.target.files) {
                    const filesArray = Array.from(e.target.files);
                    setImages((prevImages) => {
                      const combined = [...prevImages, ...filesArray];
                      // On garde uniquement les 3 premiers fichiers au total
                      return combined.slice(0, 3);
                    });
                  }
                }}
              />
              <span className="text-center">+ Ajouter des images</span>
            </label>

            {/* Affichage des images sélectionnées */}
            {images.slice(0, 3).map((img, index) => (
              <div
                key={index}
                className="relative h-32 w-full rounded-lg 
                overflow-hidden shadow-md"
              >
                <Image
                  src={URL.createObjectURL(img)}
                  alt={`Aperçu image ${index + 1}`}
                  className="object-cover w-full h-full"
                  width={400}
                  height={300}
                  priority={true}
                />
                <button
                  type="button"
                  aria-label={`Supprimer l'image ${index + 1}`}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full shadow-lg transition"
                  onClick={() => {
                    const remaining = images.filter((_, i) => i !== index);
                    setImages(remaining);
                  }}
                >
                  <X />
                </button>
              </div>
            ))}
          </div>

          {/*======================== submit btn ====================== */}
          <div className="flex justify-center gap-6 mt-auto">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={handleReset}
            >
              Réinitialiser
            </Button>
            <Button
              type="button"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault;
                handleSubmit();
              }}
            >
              {loading && <Loader className="mr-2 animate-spin  " />} Ajouter
            </Button>
          </div>
        </div>

        {/* note d'utilisation des images */}
        <div className="mt-4 text-sm text-gray-500 col-span-2">
          <p>Les images doivent être au format JPG, PNG ou GIF.</p>
          <p>La taille maximale des fichiers est de 5 Mo.</p>
          <p>
            Les champs{" "}
            <span className="font-semibold">
              marqués {`d'un`} astérisque (*)
            </span>{" "}
            sont obligatoires.
          </p>
        </div>
      </form>
    </div>
  );
};

export default NewProductForm;
