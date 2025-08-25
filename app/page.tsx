import { getProducts } from "@/actions/product";
import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import SpecialProducts from "@/components/home/SpecialProducts";
import NewProducts from "@/components/products/NewProducts";
import Link from "next/link";
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

        {/* MOST POPULAR NEW PRODUCTS */}
        <section className="py-12 px-4 sm:px-6 xl:px-8 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Nouveautés</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <NewProducts data={products.slice(0, 10)} />
          </Suspense>

          {/* see more products */}
          <div className="mt-10 mx-auto w-fit">
            <Link
              href="/catalogues"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Voir plus de produits
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
