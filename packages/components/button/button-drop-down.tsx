import type { Placement } from '@floating-ui/dom';
import { type JSX, Show, mergeProps, splitProps } from 'solid-js';

import Button, { type ButtonProps } from '$/components/button/button';
import ButtonDropDownContent from '$/components/button/button-drop-down-content';
import styles from '$/components/button/button.module.css';
import Tooltip, { TooltipTriggerEvent, type TooltipStore } from '$/components/tooltip';
import type { CommonDataAttributes } from '$/types/generic';

export type ButtonDropDownProps = ButtonProps &
  CommonDataAttributes & {
    label: string | JSX.Element;
    placement?: Placement;
    defaultIsEnabled?: boolean;
    triggerEvent?: TooltipTriggerEvent;
    buttonClass?: string;
    contentClass?: string;
    tooltipStore: TooltipStore;
  };

const defaultProps: Omit<ButtonDropDownProps, 'label' | 'tooltipStore'> = {
  placement: 'bottom-end',
  defaultIsEnabled: false,
};

export const ButtonDropDown = (passedProps: ButtonDropDownProps) => {
  const [props, restOfProps] = splitProps(mergeProps(defaultProps, passedProps), [
    'label',
    'placement',
    'defaultIsEnabled',
    'triggerEvent',
    'children',
    'class',
    'buttonClass',
    'contentClass',
    'tooltipStore',
  ]);

  const getDefaultTriggerEvent = () => (passedProps.disabled ? TooltipTriggerEvent.HOVER : TooltipTriggerEvent.CLICK);

  return (
    <Tooltip
      class={styles.dropDown}
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
        <Button data-id="button-drop-down-trigger" {...restOfProps} class={props.class}>
          {props.label}
        </Button>
      </span>
      <ButtonDropDownContent
        classList={{
          [props.contentClass ?? '']: !!props.contentClass,
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
