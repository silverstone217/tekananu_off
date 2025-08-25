"use client";
import { HeroSectiondata } from "@/utils/data";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { capitalize, formatMoney } from "@/utils/functions";

const DATA = HeroSectiondata;

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = useMemo(() => DATA[currentIndex], [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DATA.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <div
        className="relative h-[50vh] bg-secondary flex items-center 
      justify-center"
      >
        <Image
          src={currentItem.image}
          alt={currentItem.title}
          className="object-cover object-center w-full h-full"
          priority={currentIndex === 0}
          width={1000}
          height={800}
        />

        {/* Overlay gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-t 
        from-black/50 to-transparent "
        />

        {/* Content */}
        <div
          className="absolute bottom-14 left-6 right-6 max-w-md 
        text-white flex flex-col gap-3"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold capitalize leading-tight drop-shadow-lg">
            {capitalize(currentItem.title)}
          </h2>
          <p
            className="text-xs md:text-sm text-gray-300 
          line-clamp-2 drop-shadow-sm"
          >
            {currentItem.description}
          </p>
          <Button
            className="w-max px-6 py-2 text-xs md:text-sm 
          transition hover:bg-yellow-600"
          >
            Acheter {formatMoney(currentItem.price, currentItem.devise)}
          </Button>
        </div>
      </div>

      {/* Navigation dots */}
      <nav
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
        flex space-x-1.5 bg-white/30 backdrop-blur rounded-full px-3  py-1.5 "
        aria-label="Navigation slides"
      >
        {DATA.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2  rounded-full border transition-colors duration-300 ${
              index === currentIndex
                ? "bg-white border-white"
                : "bg-gray-400 border-gray-400 hover:bg-white hover:border-white"
            }`}
          />
        ))}
      </nav>
    </section>
  );
};

export default HeroSection;
