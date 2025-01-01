import { createSignal } from 'solid-js';

interface CreateToggleProps {
  isToggled?: boolean;
}

export interface ToggleStoreInstance {
  isToggled: () => boolean;
  setIsToggled: (value: boolean) => void;
  toggle: () => void;
}

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
