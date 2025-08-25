"use server";

import { ProductImagesUrlsSchema, UploadProductSchema } from "@/schema/product";
import { infer as zInfer } from "zod";
import { getUser } from "./auth";
import { prisma } from "@/lib/prisma";

export type UploadProductType = zInfer<typeof UploadProductSchema>;

export const uploadProduct = async (data: UploadProductType) => {
  // implementation
  try {
    const user = await getUser();
    if (!user) {
      return { error: true, message: " Connectez-vous pour continuer" };
    }

    // revalidate data
    const validated = UploadProductSchema.safeParse(data);
    if (!validated.success) {
      const errorsM = validated.error.issues
        .map((issue) => issue.message)
        .join(" ");
      return { error: true, message: errorsM, data: null };
    }

    const image =
      "https://u5ctxtnjh8dri8gw.public.blob.vercel-storage.com/images/no-image.jpg";

    const newProduct = await prisma.product.create({
      data: {
        ...validated.data,
        image,
        userId: user.id,
      },
    });

    return {
      error: false,
      message: "Produit ajouté avec succès",
      data: newProduct,
    };
  } catch (error) {
    return { error: true, message: "Une erreur est survenue", details: error };
  }
};

// upload images urls to product
export type ProductImagesUrlsType = zInfer<typeof ProductImagesUrlsSchema>;
export const uploadProductImagesUrls = async (data: ProductImagesUrlsType) => {
  // implementation
  try {
    const validated = ProductImagesUrlsSchema.safeParse(data);
    if (!validated.success) {
      const errorsM = validated.error.issues
        .map((issue) => issue.message)
        .join(" ");
      return { error: true, message: errorsM, data: null };
    }

    const revalidated = validated.data;

    // is product exist
    const product = await prisma.product.findUnique({
      where: {
        id: revalidated.productId,
      },
    });

    if (!product) {
      return { error: true, message: "Produit introuvable", data: null };
    }

    const newProductImage = await prisma.product.update({
      where: {
        id: revalidated.productId,
      },
      data: {
        image: revalidated.image,
        images: revalidated.images,
      },
    });

    return {
      error: false,
      message: "Images ajoutées avec succès",
      data: newProductImage,
    };
  } catch (error) {
    return { error: true, message: "Une erreur est survenue", details: error };
  }
};

// get products
export const getProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return products ?? [];
  } catch (error) {
    console.log("Error fetching products:", error);
    return [];
  }
};
