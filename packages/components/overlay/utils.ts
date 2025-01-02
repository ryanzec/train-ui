import type { JSX } from 'solid-js';

export enum OverlayVariant {
  STRONG = 'strong',
  WEAK = 'weak',
}

export type OverlayProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  variant?: OverlayVariant;
  closeOnClick?: boolean;
};

export const defaultOverlayProps: Partial<OverlayProps> = {
  variant: OverlayVariant.STRONG,
  closeOnClick: false,
};
