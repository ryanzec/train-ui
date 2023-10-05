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

export enum ButtonIconPosition {
  PRE = 'pre',
  POST = 'post',
}

export enum ButtonState {
  DEFAULT = 'default',
  IS_LOADING = 'is-loading',
}

export enum ButtonSentiment {
  NEUTRAL = 'neutral',
  BRAND = 'brand',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger',
}
