// capitalize text
export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// is text empty
export const isEmpty = (text: string) => {
  return text.trim().length === 0;
};

// format money
export const formatMoney = (amount: number, currency: string) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency,
  }).format(amount);
};
