// Types TypeScript pour les options de sélection
export type CategoryOption = {
  value: string;
  label: string;
};

// Liste des catégories principales
export const ProductCategories: CategoryOption[] = [
  { value: "vetements", label: "Vêtements" },
  { value: "chaussures", label: "Chaussures" },
  { value: "electroniques", label: "Electroniques" },
  { value: "accessoires", label: "Accessoires" },
  { value: "autres", label: "Autres" },
];

// Types spécifiques pour la catégorie Electroniques
export const ElectronicsType: CategoryOption[] = [
  { value: "smartphones", label: "Smartphones" },
  { value: "ordinateurs", label: "Ordinateurs" },
  { value: "tv", label: "Télévisions" },
  { value: "tablettes", label: "Tablettes" },
  { value: "frigos", label: "Frigos et congélateurs" },
  { value: "montres", label: "Montres" },
  { value: "fer", label: "Fers à repasser" },
  { value: "autres", label: "Autres" },
];

// Types spécifiques pour la catégorie Vetements
export const ClothingType: CategoryOption[] = [
  { value: "tshirts", label: "T-shirts" },
  { value: "jeans", label: "Jeans" },
  { value: "vestes", label: "Vestes" },
  { value: "robes", label: "Robes" },
  { value: "chemises", label: "Chemises" },
  { value: "jupes", label: "Jupes" },
  { value: "pantalons", label: "Pantalons" },

  { value: "short", label: "Shorts(Cullotes)" },
  { value: "sous-vetements", label: "Sous-vêtements" },
  { value: "autres", label: "Autres" },
];

// Types spécifiques pour la catégorie Chaussures
export const ShoesType: CategoryOption[] = [
  { value: "baskets", label: "Baskets" },
  { value: "chaussures_cuir", label: "Chaussures en cuir" },
  { value: "sandales", label: "Sandales" },
  { value: "boots", label: "Boots" },
  { value: "autres", label: "Autres" },
];

// Types spécifiques pour la catégorie Accessoires
export const AccessoriesType: CategoryOption[] = [
  { value: "montres", label: "Montres" },
  { value: "lunettes", label: "Lunettes" },
  { value: "bijoux", label: "Bijoux" },
  { value: "ceintures", label: "Ceintures" },
  { value: "autres", label: "Autres" },
];

export const OtherType: CategoryOption[] = [
  { value: "autres", label: "Autres" },
];

// Type union regroupant toutes les catégories principales
export type ProductCategoryValues =
  | "vetements"
  | "chaussures"
  | "electroniques"
  | "accessoires"
  | "autres";

// Type union pour les sous-catégories électroniques
export type ElectronicsTypeValues =
  | "smartphones"
  | "laptops"
  | "tablets"
  | "frigos"
  | "montres"
  | "autres";

// Type union pour les sous-catégories vêtements
export type ClothingTypeValues =
  | "tshirts"
  | "jeans"
  | "vestes"
  | "robes"
  | "chemises"
  | "autres";

// Type union pour les sous-catégories chaussures
export type ShoesTypeValues =
  | "baskets"
  | "chaussures_cuir"
  | "sandales"
  | "boots"
  | "autres";

// Type union pour les sous-catégories accessoires
export type AccessoriesTypeValues =
  | "montres"
  | "lunettes"
  | "bijoux"
  | "ceintures"
  | "autres";

export const State_Data = [
  { value: "nouveau", label: "Nouveau" },
  { value: "reconditionne", label: "Reconditionné" },
  { value: "bon", label: "Bon état" },
  { value: "mauvais", label: "Mauvais état" },
];

export type StateValuesType = "nouveau" | "reconditionne" | "bon" | "mauvais";

export const Colors_DATA = [
  { value: "red", label: "Rouge" },
  { value: "green", label: "Vert" },
  { value: "blue", label: "Bleu" },
  { value: "yellow", label: "Jaune" },
  { value: "black", label: "Noir" },
  { value: "white", label: "Blanc" },
  { value: "gray", label: "Gris" },
  { value: "pink", label: "Rose" },
  { value: "purple", label: "Violet" },
  { value: "orange", label: "Orange" },
  { value: "brown", label: "Marron" },
  { value: "beige", label: "Beige" },
  { value: "autres", label: "Autres" },
];
