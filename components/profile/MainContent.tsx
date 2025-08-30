"use client";
import { Product, User } from "@prisma/client";
import React, { Suspense } from "react";
import Published from "./contents/Published";

type Props = {
  isCurrentUser: boolean;
  userProfile: User;
  myProducts: Product[];
};

type TabType = {
  label: string;
  value: string;
  content: (props: { myProducts: Product[] }) => React.ReactNode;
  authorized?: boolean;
};

const TABS: TabType[] = [
  {
    label: "Publiés",
    value: "products",
    content: ({ myProducts }) => <Published myProducts={myProducts} />,
    authorized: true,
  },
  {
    label: "Achetés",
    value: "purchased",
    content: () => <div>Achat 1</div>,
  },
  {
    label: "Vendus",
    value: "bought",
    content: () => <div>Vente 1</div>,
  },
  {
    label: "Aimés",
    value: "liked",
    content: () => <div>Aimé 1</div>,
    authorized: true,
  },
  {
    label: "Notes",
    value: "feedback",
    content: () => <div>Feedback 1</div>,
  },
  {
    label: "A propos",
    value: "about",
    content: () => <div>Activité 1</div>,
  },
];

const MainContent = ({ isCurrentUser, userProfile, myProducts }: Props) => {
  const [tab, setTab] = React.useState(TABS[0]);

  return (
    <main className="py-12  max-w-7xl mx-auto w-full">
      {/* TABS */}
      <div className="flex space-x-4 border-b mb-6 overflow-x-auto px-4">
        {TABS.filter((t) => !t.authorized || isCurrentUser).map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t)}
            className={`pb-2 px-3 text-sm font-medium shrink-0 ${
              t.value === tab.value
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-400 dark:text-gray-600"
            }`}
          >
            {t.label}
          </button>
        ))}
        <div className="flex-1" />
      </div>

      {/* content */}
      <div className="mt-6 px-4">
        <Suspense fallback={<div className="p-20">chargement...</div>}>
          {tab.content({ myProducts })}
        </Suspense>
      </div>
    </main>
  );
};

export default MainContent;
