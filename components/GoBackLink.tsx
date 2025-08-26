"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const GoBackLink = () => {
  const router = useRouter();

  const handleGoBack = () => {
    const canGoBack = window.history.length > 1;
    if (canGoBack) {
      window.history.back();
    } else {
      router.push("/");
    }
  };
  return (
    <button
      className="flex items-center gap-1.5 text-xl group hover:text-gray-700
      cursor-pointer"
      onClick={handleGoBack}
    >
      <ArrowLeft />
      <span className="text-gray-500 goup-hover:text-gray-700">Retour</span>
    </button>
  );
};

export default GoBackLink;
