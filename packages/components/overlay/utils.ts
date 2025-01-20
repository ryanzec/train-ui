import type { JSX } from 'solid-js';

export const OverlayVariant = {
  STRONG: 'strong',
  WEAK: 'weak',
} as const;

export type OverlayVariant = (typeof OverlayVariant)[keyof typeof OverlayVariant];

export type OverlayProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: OverlayVariant;
  closeOnClick?: boolean;
};

export const defaultOverlayProps: Partial<OverlayProps> = {
  variant: OverlayVariant.STRONG,
  closeOnClick: false,
};
