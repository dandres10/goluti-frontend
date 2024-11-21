export const formatNumber = (number: string) => {
  const [integerPart, decimalPart] = number.toString().split(".");
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );
  const formattedNumber =
    formattedIntegerPart + (decimalPart ? "," + decimalPart : "");
  return "$ " + formattedNumber;
};
