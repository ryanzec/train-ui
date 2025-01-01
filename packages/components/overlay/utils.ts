export enum OverlayStrength {
  STRONG = 'strong',
  WEAK = 'weak',
}

export type OverlayProps = {
  strength?: OverlayStrength;
};

export const defaultOverlayProps: Partial<OverlayProps> = {
  strength: OverlayStrength.STRONG,
};
