import { type Accessor, createSignal } from 'solid-js';
import * as uuid from 'uuid';

export enum TooltipTriggerEvent {
  CLICK = 'click',
  HOVER = 'hover',
  STRICT_HOVER = 'strict-hover',
}

type CreateStoreParams = {
  defaultIsEnabled?: boolean;
  id?: string;
};

export type TooltipStore = {
  id: Accessor<string>;
  isEnabled: Accessor<boolean>;
  toggle: (overrideIsEnabled?: boolean) => void;
};

const createStore = (params: CreateStoreParams = {}): TooltipStore => {
  const [isEnabled, setIsEnabled] = createSignal(params.defaultIsEnabled ?? false);
  const [id] = createSignal<string>(params.id || uuid.v4());

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
    id,
  };
};

export const tooltipUtils = {
  createStore,
};
