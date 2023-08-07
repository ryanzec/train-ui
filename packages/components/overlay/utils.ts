export enum OverlayStrength {
	STRONG = 'strong',
	WEAK = 'weak',
}

export interface OverlayProps {
	strength?: OverlayStrength;
}

export const defaultOverlayProps: Partial<OverlayProps> = {
	strength: OverlayStrength.STRONG,
};
