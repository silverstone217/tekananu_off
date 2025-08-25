import z from "zod";

export const UploadProductSchema = z.object({
  title: z.string().min(2).max(60),
  description: z.string().min(10).max(200),
  price: z.number().min(0),
  state: z.enum(["bon", "nouveau", "reconditionne", "mauvais"]),
  type: z.string().min(2).max(30),
  category: z.enum([
    "electroniques",
    "vetements",
    "chaussures",
    "accessoires",
    "autres",
  ]),
  currency: z.enum(["USD", "CDF"]),
  brand: z.string().max(30).optional(),
  color: z.string().min(2).max(30).optional(),
});

export const ProductImagesUrlsSchema = z.object({
  image: z.url(),
  images: z.array(z.url()).optional(),
  productId: z.string(),
});
