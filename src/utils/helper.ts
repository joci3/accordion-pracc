export function convertToUsd(currency: string, amount: number): number {
  const exchangeRates: { [key: string]: number } = {
    USD: 1,
    EUR: 1.1,
    GBP: 1.3,
  };
  return Math.round(amount * (exchangeRates[currency] || 1));
}

export function getCurrency(currency: string): string {
  const currencies: { [key: string]: string } = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  return currencies[currency];
}

export function formatDate(inputNumber: number) {
  const date = new Date(inputNumber);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}/${year}`;
}
