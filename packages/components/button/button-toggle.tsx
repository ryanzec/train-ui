import { Button, ButtonProps } from '$/components/button/button';
import { ButtonSentiment, ButtonVariant } from '$/components/button/utils';

export type ButtonToggleProps = Omit<ButtonProps, 'variant' | 'sentiment'>;

const ToggleButton = (props: ButtonToggleProps) => {
  return <Button variant={ButtonVariant.OUTLINED} sentiment={ButtonSentiment.NEUTRAL} {...props} />;
};

export default ToggleButton;
