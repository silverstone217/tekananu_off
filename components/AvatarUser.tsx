"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AvatarUserProps = {
  name?: string | null;
  image?: string | null;
};

const AvatarUser = ({ name, image }: AvatarUserProps) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "UT";

  return (
    <Avatar>
      {image ? (
        <AvatarImage src={image} alt="User Avatar" className="object-cover" />
      ) : (
        <AvatarFallback className="font-bold shadow-xl">
          {initials}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default AvatarUser;
