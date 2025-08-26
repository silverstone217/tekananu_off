import { getUser } from "@/actions/auth";
import { getUserById } from "@/actions/user";
import GoBackLink from "@/components/GoBackLink";
import MainContent from "@/components/profile/MainContent";
import ProfileView from "@/components/profile/ProfileView";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

async function page({ params }: Props) {
  const { id } = await params;
  const user = await getUser();

  if (!id) return redirect("/");

  if (!user) return null;

  const userProfile = await getUserById(id);

  if (!userProfile) {
    return (
      <div>
        <h2>Profil non trouvé!</h2>
        <p>
          {`L'utilisateur`} que vous recherchez {`n'existe pas.`}
        </p>
      </div>
    );
  }

  const isCurrentUser = userProfile.id === user.id;

  return (
    <div className="">
      <div className="p-4 sm:px-6 lg:px-8">
        <GoBackLink />
      </div>
      {/* ProfileView */}
      <ProfileView userProfile={userProfile} isCurrentUser={isCurrentUser} />

      {/* main content */}
      <MainContent isCurrentUser={isCurrentUser} userProfile={userProfile} />
    </div>
  );
}

export default page;
