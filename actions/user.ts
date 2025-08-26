"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "./auth";

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

// change name
export const updateUserName = async (name: string, imgUrl?: string) => {
  try {
    const user = await getUser();

    if (!user) {
      return {
        error: true,
        message: "Non authentifié",
        data: null,
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { name: name, image: imgUrl ? imgUrl : user.image },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = updatedUser;

    return {
      error: false,
      message: "Mise à jour réussie",
      data: rest,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: "Erreur lors de la mise à jour",
      data: null,
    };
  }
};
