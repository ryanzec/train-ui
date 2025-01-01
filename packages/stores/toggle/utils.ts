import { createSignal } from 'solid-js';

type CreateToggleProps = {
  isToggled?: boolean;
};

export type ToggleStoreInstance = {
  isToggled: () => boolean;
  setIsToggled: (value: boolean) => void;
  toggle: () => void;
};

const createToggle = (options: CreateToggleProps = {}): ToggleStoreInstance => {
  const [isToggled, setIsToggled] = createSignal<boolean>(options.isToggled ?? false);

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
