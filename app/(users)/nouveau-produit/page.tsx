import { getUser } from "@/actions/auth";
import NewProductForm from "@/components/products/NewProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

async function page() {
  const user = await getUser();

  if (!user) return null;

  return (
    <div>
      <Link
        href={"/"}
        className="px-4 pt-4 flex items-center gap-1 text-gray-500"
      >
        <ArrowLeft className="h-7 w-7 " />
        <span>Acceuil</span>
      </Link>
      <NewProductForm />
    </div>
  );
}

export default page;
