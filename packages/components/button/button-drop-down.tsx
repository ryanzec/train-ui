import type { Placement } from '@floating-ui/dom';
import classnames from 'classnames';
import { type JSX, type ParentProps, Show, mergeProps, splitProps } from 'solid-js';

import Button, { type ButtonProps } from '$/components/button/button';
import ButtonDropDownContent from '$/components/button/button-drop-down-content';
import styles from '$/components/button/button.module.css';
import Tooltip, { TooltipTriggerEvent, type TooltipStore } from '$/components/tooltip';

export type ButtonDropDownProps = ButtonProps &
  JSX.HTMLAttributes<HTMLButtonElement> & {
    label: string | JSX.Element;
    placement?: Placement;
    defaultIsEnabled?: boolean;
    triggerEvent?: TooltipTriggerEvent;
    buttonClass?: string;
    contentClass?: string;
    tooltipStore: TooltipStore;
  };

export const ButtonDropDown = (passedProps: ParentProps<ButtonDropDownProps>) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        placement: 'bottom-end',
        defaultIsEnabled: false,
      } as Required<ButtonDropDownProps>,
      passedProps,
    ),
    [
      'label',
      'placement',
      'defaultIsEnabled',
      'triggerEvent',
      'children',
      'class',
      'buttonClass',
      'contentClass',
      'tooltipStore',
    ],
  );

  const getDefaultTriggerEvent = () => (passedProps.disabled ? TooltipTriggerEvent.HOVER : TooltipTriggerEvent.CLICK);

  return (
    <Tooltip
      class={classnames(styles.dropDown, props.class)}
      store={props.tooltipStore}
      placement={props.placement}
      triggerEvent={props.triggerEvent ?? getDefaultTriggerEvent()}
    >
      {/*
       * if the button is disabled, the pointer events are disable so the tooltip would not work so we wrap the
       * button in a span so that the span gets the tooltip handle events attached instead of the button so the tooltip
       * does work when the button is disabled
       */}
      <span>
        <Button {...restOfProps} data-id="button-drop-down-trigger" class={props.buttonClass}>
          {props.label}
        </Button>
      </span>
      <ButtonDropDownContent
        classList={{
          [props.contentClass]: !!props.contentClass,
          [styles.dropDownContentIsEnabled]: props.tooltipStore.isEnabled(),
        }}
      >
        <Show when={props.tooltipStore.isEnabled()}>
          <div>{props.children}</div>
        </Show>
      </ButtonDropDownContent>
    </Tooltip>
  );
};

export default ButtonDropDown;
