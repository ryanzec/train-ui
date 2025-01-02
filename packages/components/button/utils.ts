export enum ButtonVariant {
  FILLED = 'filled',
  WEAK = 'weak',
  OUTLINED = 'outlined',
  TEXT = 'text',
  GHOST = 'ghost',

  // this is unused when you need text clickable as it avoid the whole aria issue when you attempt to make a
  // div / span with a on click event
  UNSTYLED = 'unstyled',
}

export enum ButtonItemPosition {
  PRE = 'pre',
  POST = 'post',
}

export enum ButtonState {
  DEFAULT = 'default',
  IS_LOADING = 'is-loading',
}

export enum ButtonColor {
  NEUTRAL = 'neutral',
  BRAND = 'brand',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger',
}

export enum ButtonShape {
  ROUNDED = 'rounded',
  CIRCLE = 'circle',
}
