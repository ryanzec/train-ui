import { createSignal } from 'solid-js';

type CreateToggleProps = {
  defaultIsToggled?: boolean;
};

export type ToggleStoreInstance = {
  isToggled: () => boolean;
  setIsToggled: (value: boolean) => void;
  toggle: () => void;
};

const createToggle = (options: CreateToggleProps = {}): ToggleStoreInstance => {
  const [isToggled, setIsToggled] = createSignal<boolean>(options.defaultIsToggled ?? false);

  const toggle = () => {
    setIsToggled(!isToggled());
  };

  return {
    isToggled,
    setIsToggled,
    toggle,
  };
};

export const toggleStoreUtils = {
  createToggle,
};
