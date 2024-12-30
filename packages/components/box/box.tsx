import { type JSX, splitProps } from 'solid-js';

export type BoxProps = JSX.HTMLAttributes<HTMLDivElement> & {
  onClick?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>;
};

const Box = (passedProps: BoxProps) => {
  let divRef: HTMLDivElement | undefined;
  const [props, restOfProps] = splitProps(passedProps, ['onClick', 'onKeyDown']);
  const extraProps: JSX.HTMLAttributes<HTMLDivElement> = {};

  if (props.onClick) {
    const clickHandler = props.onClick as JSX.EventHandler<HTMLDivElement, MouseEvent>;

    extraProps.onClick = props.onClick;

    // add in the properties needed for accessibility
    extraProps.role = 'button';
    extraProps.tabIndex = '0';
    extraProps.onKeyDown = (keyEvent) => {
      if (!divRef) {
        return;
      }

      const event = new MouseEvent('click', { relatedTarget: divRef });

      if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
        // @ts-expect-error: This is a hack to allow the event to be fired
        clickHandler(event);
      }
    };
  }

  return <div ref={divRef} {...restOfProps} {...extraProps} />;
};

export default Box;
