export const ErrorMessage = {
  UNKNOWN: 'unknown error occurred',
};

export type ErrorMessage = (typeof ErrorMessage)[keyof typeof ErrorMessage];
