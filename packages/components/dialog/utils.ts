import { createSignal } from 'solid-js';

export enum DialogFooterAlignment {
  LEFT = 'left',
  RIGHT = 'right',
}

const createStore = () => {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const toggleDialog = () => {
    setIsOpen(!isOpen());
  };

  return {
    isOpen,
    openDialog,
    closeDialog,
    toggleDialog,
  };
};

export const dialogComponentUtils = {
  createStore,
};
