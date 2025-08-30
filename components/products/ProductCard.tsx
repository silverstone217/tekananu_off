"use client";

import { capitalize, formatMoney } from "@/utils/functions";
import { Product } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { SquarePen, ShoppingCart } from "lucide-react";
import Link from "next/link";
import ReturnStateBadge from "../ReturnStateBadge";
import { StateValuesType } from "@/utils/productData";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const isNew =
    product.createdAt > new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
  const { user } = useCurrentUser();
  const isMyProduct = product.userId === user?.id;
  const router = useRouter();

  return (
    <div key={product.id} className="group">
      {/* image */}
      {product.image && (
        <Link
          href={`/produits/${product.id}`}
          className=" w-full h-48 rounded-lg flex overflow-hidden relative"
        >
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            priority
            className="object-cover w-full h-full rounded-lg
                  group-hover:scale-125 transform
                  transition-transform duration-300 ease-in-out
                  "
          />
          {/* new */}
          {isNew && (
            <div className="absolute top-2 left-2 bg-green-500 text-white hidden text-xs font-semibold px-2 py-1 rounded">
              Nouveau
            </div>
          )}

          {/* state */}
          <div className="absolute top-2 right-2 ">
            <ReturnStateBadge state={product.state as StateValuesType} />
          </div>
        </Link>
      )}

      <div className="mt-2" />

      {/* infos */}
      <Link href={`/produits/${product.id}`}>
        <h3 className="text-lg font-semibold line-clamp-2">
          {capitalize(product.title)}
        </h3>
        <p className="text-gray-600 line-clamp-2 text-sm">
          {product.description}
        </p>
      </Link>

      {/* btn and price */}
      <div className="mt-2 flex items-center w-full justify-between">
        {/* price */}
        <p className="text-sm font-medium">
          {formatMoney(product.price, product.currency)}
        </p>
        {/* btn */}
        {isMyProduct ? (
          <Button
            className=" rounded-2xl text-xs flex items-center"
            size={"sm"}
            variant={"secondary"}
            onClick={() => router.push(`/produits/${product.id}/modifier`)}
          >
            <SquarePen />
            <span className="sr-only"> Modifier</span>
          </Button>
        ) : (
          <Button
            className=" rounded-2xl text-xs flex items-center"
            size={"sm"}
          >
            <ShoppingCart />
            <span className="sr-only"> Au panier</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
