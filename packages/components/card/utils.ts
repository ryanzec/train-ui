export const CardFooterAlignment = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export type CardFooterAlignment = (typeof CardFooterAlignment)[keyof typeof CardFooterAlignment];
