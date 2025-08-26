"use client";
import { User } from "@prisma/client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

type Props = {
  isCurrentUser: boolean;
  userProfile: User;
};

const ProfileView = ({ isCurrentUser, userProfile }: Props) => {
  const shortName = userProfile.name
    ? userProfile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex w-full flex-wrap gap-y-8 relative">
      {/* absolute bg gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 
      to-purple-500 opacity-30 xl:rounded-lg"
      ></div>

      {/* absolute edit button */}
      {isCurrentUser && (
        <div className="absolute top-4 right-4">
          <Button variant={"outline"} size={"sm"} className="text-xs">
            Modifier
          </Button>
        </div>
      )}

      {/* image profile */}
      <div className="md:w-40 md:h-40 w-32 h-32 flex items-center justify-center">
        <Avatar className="w-full h-full">
          {userProfile.image ? (
            <AvatarImage src={userProfile.image} />
          ) : (
            <AvatarFallback className="font-bold text-5xl">
              {shortName}
            </AvatarFallback>
          )}
        </Avatar>
      </div>

      {/* name and email */}
      <div className="flex flex-col ml-4 justify-center">
        <h2 className=" text-lg md:text-2xl font-bold capitalize">
          {userProfile.name}
        </h2>
        <p className="text-xs md:text-sm text-gray-400 dark:text-gray-500">
          {userProfile.email}
        </p>
        <p className="text-[10px] text-gray-400 dark:text-gray-500">
          a rejoint le{" "}
          {userProfile.createdAt.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* number of sales, number of items */}
      <div
        className="flex items-center md:gap-6 gap-4 md:ml-4 w-full 
      md:justify-center justify-around md:w-fit md:flex-1"
      >
        {/* sales */}
        <div className="flex flex-col gap-2 justify-center items-center">
          <span className="text-xs md:text-sm text-gray-400 dark:text-gray-500">
            Ventes
          </span>
          <span className="text-lg md:text-xl font-bold">0</span>
        </div>

        {/* buy */}
        <div className="flex flex-col gap-2 justify-center items-center">
          <span className="text-xs md:text-sm text-gray-400 dark:text-gray-500">
            Achats
          </span>
          <span className="text-lg md:text-xl font-bold">0</span>
        </div>

        {/* rating */}
        <div className="flex flex-col gap-2 justify-center items-center">
          <span className="text-xs md:text-sm text-gray-400 dark:text-gray-500">
            Évaluation
          </span>
          <span className="text-lg md:text-xl font-bold">0/5</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
