import classnames from 'classnames';
import { splitProps } from 'solid-js';

import { Button, type ButtonProps } from '$/components/button/button';
import styles from '$/components/button/button.module.css';
import { ButtonSentiment, ButtonVariant } from '$/components/button/utils';

export type ButtonToggleProps = Omit<ButtonProps, 'variant' | 'sentiment'> & {
  isSelected?: boolean;
};

const ToggleButton = (passedProps: ButtonToggleProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'isSelected']);

  return (
    <Button
      class={classnames(props.class, { [styles.isSelected]: props.isSelected })}
      variant={ButtonVariant.OUTLINED}
      sentiment={ButtonSentiment.NEUTRAL}
      {...restOfProps}
    />
  );
};

export default ToggleButton;
