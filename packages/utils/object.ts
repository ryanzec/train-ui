import { stringUtils } from '$/utils/string';

// biome-ignore lint/suspicious/noExplicitAny: this ia a generic function so we need to allow any here
const toQueryString = (value: Record<string, any>) => {
  return Object.keys(value)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(value[key])}`)
    .join('&');
};

const toCamelCase = <TData extends object>(value: TData): TData => {
  if (typeof value !== 'object' || value === null || value === undefined) {
    return value;
  }

  if (Array.isArray(value)) {
    // @todo(research)
    // @ts-expect-error: I don't know how to get the typing to work here so just ignore for now since it works
    return value.map(toCamelCase);
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, value]) => [stringUtils.snakeToCamel(key), toCamelCase(value)]),
  ) as TData;
};

export const objectUtils = {
  toQueryString,
  toCamelCase,
};
