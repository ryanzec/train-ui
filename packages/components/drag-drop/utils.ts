import type { Accessor, Setter } from 'solid-js';

export type DragDropId = string | number;

export type DragDropItem<T> = {
  id: DragDropId;
  item: T;
};

export const dragDropComponentUtils = {
  swapItems: <T extends { id: DragDropId }>(
    accessor: Accessor<T[]>,
    setter: Setter<T[]>,
    index1: number,
    index2: number,
  ) => {
    const newArray = [...accessor()];
    const temp = newArray[index1];

    newArray[index1] = newArray[index2];
    newArray[index2] = temp;

    setter(newArray);
  },

  shiftItems: <T extends { id: DragDropId }>(
    accessor: Accessor<T[]>,
    setter: Setter<T[]>,
    shiftIndex: number,
    shiftTo: number,
  ) => {
    const newArray = [...accessor()];
    const temp = newArray.splice(shiftIndex, 1);

    newArray.splice(shiftTo, 0, ...temp);

    setter(newArray);
  },

  moveItem: <T extends { id: DragDropId }>(addToSetter: Setter<T[]>, removeFromSetter: Setter<T[]>, itemToMove: T) => {
    if (!addToSetter || !removeFromSetter || addToSetter === removeFromSetter) {
      return;
    }

    removeFromSetter((currentValue) => currentValue.filter((item) => item.id !== itemToMove.id));
    addToSetter((currentValue) => [...currentValue, itemToMove]);
  },

  isDroppingOnDraggable: (sourceElement: HTMLElement, destinationElement: HTMLElement) => {
    return (
      sourceElement.dataset.isDraggable === 'true' &&
      destinationElement.dataset.isDraggable === 'true' &&
      destinationElement.dataset.isDroppable === 'true'
    );
  },

  isDraggable: (element: HTMLElement) => {
    return element.dataset.isDraggable === 'true';
  },
};
