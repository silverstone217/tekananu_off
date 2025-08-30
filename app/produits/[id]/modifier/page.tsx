import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

async function ModifyProductPage({ params }: Props) {
  const { id } = await params;
  return <div>Modifier la page du produit {id}</div>;
}

export default ModifyProductPage;
