export const EmojiSpacing = {
  LEFT: 'left',
  RIGHT: 'right',
  BOTH: 'both',
} as const;

export type EmojiSpacing = (typeof EmojiSpacing)[keyof typeof EmojiSpacing];
