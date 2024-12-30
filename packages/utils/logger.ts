// proxy methods for some console.* so need to allow any here

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const log = (...args: any) => {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  console.log(...args);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const warn = (...args: any) => {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  console.warn(...args);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
