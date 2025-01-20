export const SupportingTextColor = {
  NEUTRAL: 'neutral',
  DANGER: 'danger',
} as const;

export type SupportingTextColor = (typeof SupportingTextColor)[keyof typeof SupportingTextColor];
