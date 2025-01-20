export const GlobalNotificationPosition = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
} as const;

export type GlobalNotificationPosition = (typeof GlobalNotificationPosition)[keyof typeof GlobalNotificationPosition];
