import dayjs from 'dayjs';

import { dateTimeFormat } from '$/utils/date';

export enum EditItem {
  NONE = 0,
  HOURS = 1,
  MINUTES = 2,
  MERIDIEM = 3,
}

export const editItemsOrder = [EditItem.HOURS, EditItem.MINUTES, EditItem.MERIDIEM];

type GetNewEditItemIndexOptions = {
  allowWrapping?: boolean;
};

const getNewEditItemIndex = (currentIndex: number, move: number, optionOverrides: GetNewEditItemIndexOptions = {}) => {
  const options = structuredClone(Object.assign({ allowWrapping: false }, optionOverrides));
  let newIndex = editItemsOrder.findIndex((item) => item === currentIndex);

  if (newIndex === -1) {
    return -1;
  }

  newIndex += move;

  if (newIndex >= editItemsOrder.length) {
    return options.allowWrapping ? 0 : -1;
  }

  if (newIndex < 0) {
    newIndex = options.allowWrapping ? editItemsOrder.length - 1 : -1;
  }

  return newIndex;
};

const getEditItemStringLocations = (editItem: EditItem): number[] | undefined => {
  if (editItem === EditItem.HOURS) {
    return [0, 2];
  }
  if (editItem === EditItem.MINUTES) {
    return [3, 5];
  }
  return [6, 8];
};

const getNewSteppedEditItemValue = (
  editItem: EditItem,
  currentValue: string,
  increaseStep: boolean,
): string | undefined => {
  if (editItem === EditItem.HOURS) {
    let newValue = Number.parseInt(currentValue);

    if (Number.isNaN(newValue)) {
      return '01';
    }

    newValue += increaseStep ? 1 : -1;

    if (newValue < 1) {
      newValue = 12;
    }

    if (newValue > 12) {
      newValue = 1;
    }

    return newValue > 9 ? `${newValue}` : `0${newValue}`;
  }

  if (editItem === EditItem.MINUTES) {
    let newValue = Number.parseInt(currentValue);

    if (Number.isNaN(newValue)) {
      return '00';
    }

    newValue += increaseStep ? 1 : -1;

    if (newValue < 0) {
      newValue = 59;
    }

    if (newValue > 59) {
      newValue = 0;
    }

    return newValue > 9 ? `${newValue}` : `0${newValue}`;
  }

  if (editItem === EditItem.MERIDIEM) {
    return currentValue === 'am' ? 'pm' : 'am';
  }
};

export const DEFAULT_VALUE = 'hh:mm aa';

const isValidTime = (value: string) => {
  const date = dayjs(value, dateTimeFormat.TIME_INPUT_TIME);

  if (dayjs(date).isValid()) {
    return true;
  }

  return false;
};

export const timeInputComponentUtils = {
  isValidTime,
  getNewEditItemIndex,
  getEditItemStringLocations,
  getNewSteppedEditItemValue,
};
