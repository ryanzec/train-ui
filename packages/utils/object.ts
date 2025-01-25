// biome-ignore lint/suspicious/noExplicitAny: this ia a generic function so we need to allow any here
const toQueryString = (value: Record<string, any>) => {
  return Object.keys(value)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(value[key])}`)
    .join('&');
};

export const objectUtils = {
  toQueryString,
};
