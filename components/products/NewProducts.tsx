"use client";
import { Product } from "@prisma/client";
import React from "react";
import ProductCard from "./ProductCard";

type Props = {
  data: Product[];
};

const NewProducts = ({ data }: Props) => {
  if (!data || data.length === 0) return null;

  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 gap-6
    xl:grid-cols-6
    "
    >
      {data.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </section>
  );
};

export default NewProducts;
