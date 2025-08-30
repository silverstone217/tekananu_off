"use client";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  myProducts: Product[];
};

const Published = ({ myProducts }: Props) => {
  if (!myProducts || myProducts.length === 0) {
    return (
      <div className="py-10 w-full flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold">Produits publiés</h2>
        <p className="text-gray-500">Aucun produit publié</p>

        <Link href="/nouveau-produit">
          <Button className="flex items-center space-x-2 mt-4 px-8">
            Publier un produit
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {myProducts.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </section>
  );
};

export default Published;
