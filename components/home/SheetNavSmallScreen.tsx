"use client";
import React, { use } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HomeLinks } from "@/utils/links";
import Link from "next/link";
import { LogOut, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import AvatarUser from "../AvatarUser";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import ThemeSwitch from "../ThemeSwitch";

const SheetNavSmallScreen = () => {
  const { user } = useCurrentUser();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: "/" });
      toast.success("Déconnexion réussie");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Erreur lors de la déconnexion");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex flex-col gap-2">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="bg-yellow-500 hover:bg-yellow-700
          w-10 h-1 
          "
            />
          ))}
        </div>
      </SheetTrigger>
      <SheetContent
        className="h-full overflow-x-hidden overflow-y-auto py-2
      w-[80%] border-background shadow-2xl
      "
      >
        <SheetHeader>
          <SheetTitle className="text-lg">Teka Nanu</SheetTitle>
          <SheetDescription className="text-sm">
            Trouvez ou vendez des produits selon vos besoins.
          </SheetDescription>
        </SheetHeader>

        {/* links */}
        <div className="flex flex-col flex-1 p-4 border-y gap-1">
          {HomeLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="text-xl font-bold  tracking-wide
              flex items-center gap-1 group 
              hover:opacity-70 py-1
              transition-colors duration-300"
            >
              <span>{link.label}</span>
            </Link>
          ))}

          <Link
            href={"/"}
            className="text-xl font-bold  tracking-wide
              flex items-center gap-1 group 
              hover:opacity-70 py-1
              transition-colors duration-300"
          >
            <span>Parametres</span>
          </Link>

          <Link href={"/nouveau-produit"}>
            {/* sell product */}
            <Button
              variant={"outline"}
              className="flex items-center gap-2 text-sm font-bold w-full mt-2
            tracking-wide group hover:opacity-70 transition-colors duration-300"
              size={"default"}
            >
              <PlusCircle className="h-7 w-7 shrink-0 text-yellow-500" />
              <span>Vendre un produit</span>
            </Button>
          </Link>
        </div>

        {/* profile, actions and logout */}
        <div className="flex flex-col p-4 gap-4">
          {user && (
            <Link href={"/profil"} className="flex items-center gap-2 mb-1">
              <AvatarUser image={user.image} name={user.name} />
              <div className="flex flex-col text-sm">
                <span className="capitalize font-bold line-clamp-1">
                  {user.name}
                </span>
                <span className="text-xs text-gray-500 line-clamp-1">
                  {user.email}
                </span>
              </div>
            </Link>
          )}

          {/* Logout */}
          {user && (
            <Button
              variant="destructive"
              className="w-full flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Déconnexion
            </Button>
          )}

          {/* theme */}
          <ThemeSwitch />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetNavSmallScreen;
