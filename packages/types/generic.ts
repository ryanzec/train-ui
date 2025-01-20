export type RequestedAnimationFrameReference = number | null;

// to reference for new values:
// https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
export const Key = {
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  TAB: 'Tab',
  ENTER: 'Enter',
  ALPHA_NUMERIC: 'Alphanumeric',
  ZERO: '0',
  ONE: '1',
  TWO: '2',
  THREE: '3',
  FOUR: '4',
  FIVE: '5',
  SIX: '6',
  SEVEN: '7',
  EIGHT: '8',
  NINE: '9',
  LOWER_A: 'a',
  UPPER_A: 'A',
  LOWER_P: 'p',
  UPPER_P: 'P',
} as const;

export type Key = (typeof Key)[keyof typeof Key];

export type BaseCommonDataType = boolean | string | number | object;

export type CommonDataType = BaseCommonDataType | BaseCommonDataType[];

export type CommonDataAttributes = {
  'data-id'?: string;
};
