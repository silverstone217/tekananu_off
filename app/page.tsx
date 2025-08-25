import { getProducts } from "@/actions/product";
import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import SpecialProducts from "@/components/home/SpecialProducts";
import { Suspense } from "react";
// import TestComp from "@/components/testComp";
// // import { Button } from "@/components/ui/button";
// import { prisma } from "@/lib/prisma";
// import Link from "next/link";

// const getUsersLength = async () => {
//   const users = await prisma.user.findMany();
//   return users.length;
// };

export default async function Home() {
  // const usersLength = await getUsersLength();

  const products = await getProducts();

  return (
    <div className="pt-14 lg:pt-16">
      <Header />
      <div className=" w-full ">
        {/* HERO SECTION */}
        <HeroSection />

        {/* SPECIAL PRODUCTS */}
        <section className="py-12 px-4 sm:px-6 xl:px-8 lg:max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 sr-only">Produits Spéciaux</h2>

          <Suspense fallback={<div>Loading...</div>}>
            <SpecialProducts data={products.slice(0, 4)} />
          </Suspense>
        </section>

        {/* MOST POPULAR PRODUCTS */}
        <section className="py-12 px-4 sm:px-6 xl:px-8">
          <h2 className="text-2xl font-bold mb-6">
            Les produits les plus populaires
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product cards go here */}
          </div>
        </section>
      </div>
    </div>
  );
}
