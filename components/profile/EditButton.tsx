"use client";
import { User } from "@prisma/client";
import React, { useState, useEffect, useRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { isEmpty } from "@/utils/functions";
import Image from "next/image";
import { X } from "lucide-react";

type Props = {
  isCurrentUser: boolean;
  userProfile: User;
};

const EditButton = ({ isCurrentUser, userProfile }: Props) => {
  const [name, setName] = useState(userProfile.name ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    userProfile.image ?? ""
  );

  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Génère un preview à chaque fois que le fichier change
  useEffect(() => {
    if (!imageFile) {
      setImagePreview(userProfile.image ?? "");
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile, userProfile.image]);

  const handleImageClick = () => {
    inputFileRef.current?.click();
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // empêche l’ouverture du file dialog lors du clic sur le bouton
    setImageFile(null);
    setImagePreview(userProfile.image ?? "");
  };

  const handleModifyName = async () => {
    setLoading(true);
    try {
      // API call : envoyer name + imageFile
      // await modifyUserProfile({ name, imageFile });
      router.refresh();
    } catch (error) {
      console.error("Error modifying profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          Modifier
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Modifier le profil</AlertDialogTitle>
          <AlertDialogDescription hidden>
            Êtes-vous sûr de vouloir modifier votre profil ?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="p-4 w-full flex flex-col gap-8">
          {/* Image */}
          <div className="grid w-full items-center gap-3">
            <Label>Image</Label>

            {/* Zone cliquable image/placeholder */}
            <div
              onClick={handleImageClick}
              className="relative cursor-pointer w-40 h-40 rounded-md border border-dashed border-gray-400 flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 transition"
              title="Cliquez pour changer l'image"
            >
              {!imagePreview ? (
                <span className="text-gray-500 text-center px-2">
                  {` Ajouter l'image`}
                </span>
              ) : (
                <Image
                  src={imagePreview}
                  alt="Aperçu de l'image"
                  className="w-full h-full object-cover"
                  draggable={false}
                  priority
                  width={300}
                  height={300}
                />
              )}

              {/* Bouton de suppression absolu */}
              {imagePreview && (
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-1 right-1 bg-red-600 
                  hover:bg-red-700 text-white rounded-full  p-1 shadow-lg
                   transition"
                  aria-label="Supprimer l'image sélectionnée"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Input file caché */}
            <Input
              type="file"
              accept="image/*"
              ref={inputFileRef}
              className="hidden"
              onChange={(e) =>
                e.target.files && setImageFile(e.target.files[0])
              }
            />

            <AlertDialogAction
              disabled={loading || !imageFile}
              className="max-w-40"
            >
              Valider
            </AlertDialogAction>
          </div>

          {/* Nom */}
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="name">Noms</Label>
            <div className="w-full flex gap-4">
              <Input
                type="text"
                id="name"
                placeholder="John Doe"
                autoCapitalize="off"
                autoComplete="name"
                autoCorrect="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <AlertDialogAction
                onClick={handleModifyName}
                disabled={
                  loading ||
                  isEmpty(name) ||
                  (name === userProfile.name && imageFile === null)
                }
              >
                Valider
              </AlertDialogAction>
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Annuler</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditButton;
