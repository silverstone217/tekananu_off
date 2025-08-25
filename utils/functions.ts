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

// random uid
export function randomUID(): string {
  const digits = "0123456789";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  // Prendre 4 chiffres aléatoires
  const getRandom = (chars: string, count: number) =>
    Array.from(
      { length: count },
      () => chars[Math.floor(Math.random() * chars.length)]
    );

  const uidParts = [
    ...getRandom(digits, 4),
    ...getRandom(lowercase, 4),
    ...getRandom(uppercase, 1),
    ...getRandom(special, 1),
  ];

  // Mélanger aléatoirement les caractères
  for (let i = uidParts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [uidParts[i], uidParts[j]] = [uidParts[j], uidParts[i]];
  }

  return uidParts.join("");
}

// return label by value in dataValue
export const returnLabelByValue = (
  value: string,
  dataValue: { value: string; label: string }[]
) => {
  const found = dataValue.find((item) => item.value === value);
  return found ? found.label : value;
};
