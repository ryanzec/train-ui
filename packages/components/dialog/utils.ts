import { createSignal } from 'solid-js';

export const DialogFooterAlignment = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export type DialogFooterAlignment = (typeof DialogFooterAlignment)[keyof typeof DialogFooterAlignment];

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
