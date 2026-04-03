export const formatPrice = (num) => {
  if (num === null || num === undefined) return "0";

  return Number(num).toLocaleString("zh-TW");
};
