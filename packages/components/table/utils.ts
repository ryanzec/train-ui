export const TableShape = {
  SQUARE: 'square',
  ROUNDED: 'rounded',
} as const;

export type TableShape = (typeof TableShape)[keyof typeof TableShape];
