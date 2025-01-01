import { type Accessor, createSignal } from 'solid-js';

type CreateStoreParams = {
  defaultIsOpened?: boolean;
};

export type PeekStore = {
  isOpened: Accessor<boolean>;
  toggle: (overrideIsEnabled?: boolean) => void;
  setIsOpened: (isOpened: boolean) => void;
};

const createStore = (params: CreateStoreParams = {}): PeekStore => {
  const [isOpened, setIsOpened] = createSignal(params.defaultIsOpened ?? false);

  const toggle = (overrideIsEnabled?: boolean) => {
    if (overrideIsEnabled === true || overrideIsEnabled === false) {
      setIsOpened(overrideIsEnabled);
      return;
    }

    setIsOpened(!isOpened());
  };

  return {
    isOpened,
    toggle,
    setIsOpened,
  };
};

export const peekComponentUtils = {
  createStore,
};
