import { Product } from "@prisma/client";
import React from "react";

import ProductCard from "../products/ProductCard";

type Props = {
  data: Product[];
};

const SpecialProducts = ({ data }: Props) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {data.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </section>
  );
};

export default SpecialProducts;
