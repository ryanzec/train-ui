import { type Accessor, createSignal } from 'solid-js';

export enum TooltipTriggerEvent {
  CLICK = 'click',
  HOVER = 'hover',
  STRICT_HOVER = 'strict-hover',
}

type CreateStoreParams = {
  defaultIsEnabled?: boolean;
};

export type TooltipStore = {
  isEnabled: Accessor<boolean>;
  toggle: (overrideIsEnabled?: boolean) => void;
};

const createStore = (params: CreateStoreParams = {}): TooltipStore => {
  const [isEnabled, setIsEnabled] = createSignal(params.defaultIsEnabled ?? false);

  const toggle = (overrideIsEnabled?: boolean) => {
    if (overrideIsEnabled === true || overrideIsEnabled === false) {
      setIsEnabled(overrideIsEnabled);
      return;
    }

    setIsEnabled(!isEnabled());
  };

  return {
    isEnabled,
    toggle,
  };
};

export const tooltipUtils = {
  createStore,
};
