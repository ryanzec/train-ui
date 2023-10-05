// need any to match wrapped method
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const log = (...args: any[]) => {
  console.log.apply(undefined, args);
};

// need any to match wrapped method
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logWarn = (...args: any[]) => {
  console.warn.apply(undefined, args);
};

// need any to match wrapped method
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logError = (...args: any[]) => {
  console.error.apply(undefined, args);
};

export const developmentUtils = { logError, logWarn, log };
