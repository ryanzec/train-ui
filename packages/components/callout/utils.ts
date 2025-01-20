export const CalloutColor = {
  NEUTRAL: 'neutral',
  BRAND: 'brand',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  DANGER: 'danger',
} as const;

export type CalloutColor = (typeof CalloutColor)[keyof typeof CalloutColor];

export const CalloutVariant = {
  WEAK: 'weak',
  STRONG: 'strong',
} as const;

export type CalloutVariant = (typeof CalloutVariant)[keyof typeof CalloutVariant];
