import type { JSX } from 'solid-js';

export enum OverlayStrength {
  STRONG = 'strong',
  WEAK = 'weak',
}

export type OverlayProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  strength?: OverlayStrength;
  closeOnClick?: boolean;
};

export const defaultOverlayProps: Partial<OverlayProps> = {
  strength: OverlayStrength.STRONG,
  closeOnClick: false,
};
