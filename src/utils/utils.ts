export function capitalizeFirstLetter(string: string): string {
  if (!string) return string;

  let newString = string.split("_").join(" ")
    
  return newString
    .charAt(0)
    .toUpperCase() + newString
    .slice(1)
    .toLowerCase();
};