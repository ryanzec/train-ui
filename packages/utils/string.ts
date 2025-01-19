const pascalToKabob = (value: string) => {
  return value
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
};

const isPascalCase = (value: string): boolean => {
  return /^([A-Z][a-z]+)+$/.test(value);
};

const pascalToWords = (value: string) => {
  const result = value.replace(/([A-Z])/g, ' $1');

  // make sure first word is capitalized to make this also handle camelCase
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const snakeToCamel = (value: string) => {
  return value.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const stringUtils = {
  pascalToKabob,
  isPascalCase,
  pascalToWords,
  snakeToCamel,
};
