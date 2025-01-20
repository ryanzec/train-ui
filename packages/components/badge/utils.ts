export const BadgeColor = {
  NEUTRAL: 'neutral',
  BRAND: 'brand',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  DANGER: 'danger',
} as const;

export type BadgeColor = (typeof BadgeColor)[keyof typeof BadgeColor];

export const BadgeVariant = {
  WEAK: 'weak',
  STRONG: 'strong',
} as const;

export type BadgeVariant = (typeof BadgeVariant)[keyof typeof BadgeVariant];

export const BadgeSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
} as const;

export type BadgeSize = (typeof BadgeSize)[keyof typeof BadgeSize];

export const BadgeShape = {
  ROUNDED: 'rounded',
  PILL: 'pill',
} as const;

export type BadgeShape = (typeof BadgeShape)[keyof typeof BadgeShape];
