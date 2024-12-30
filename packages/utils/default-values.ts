// allow any here as it jut make it easier to create default state setter for default context state
// biome-ignore lint/suspicious/noExplicitAny: to avoid typescript issues
const noopStateSetter = (value: any) => {};

const noop = () => {};

export const defaultValuesUtils = {
  noopStateSetter,
  noop,
};
