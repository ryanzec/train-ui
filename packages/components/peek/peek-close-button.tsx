import Button, { ButtonColor, ButtonVariant } from '$/components/button';

const PeekCloseButton = () => {
  return (
    <Button data-id="close-button" color={ButtonColor.NEUTRAL} variant={ButtonVariant.GHOST} data-peek-close="true">
      Close
    </Button>
  );
};

export default PeekCloseButton;
