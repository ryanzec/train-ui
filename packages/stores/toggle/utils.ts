import { createSignal } from 'solid-js';

interface CreateToggleProps {
  isToggled?: boolean;
}

const createToggle = (options: CreateToggleProps = {}) => {
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
