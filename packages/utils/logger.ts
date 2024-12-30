// proxy methods for some console.* so need to allow any here

// biome-ignore lint/suspicious/noExplicitAny: match native api
const log = (...args: any) => {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  console.log(...args);
};

// biome-ignore lint/suspicious/noExplicitAny: match native api
const warn = (...args: any) => {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  console.warn(...args);
};

// biome-ignore lint/suspicious/noExplicitAny: match native api
const error = (...args: any) => {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  console.error(...args);
};

export const loggerUtils = {
  log,
  warn,
  error,
};
