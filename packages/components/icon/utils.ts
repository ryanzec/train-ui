import AlignJustifiedIcon from '$/components/icon/icons/align-justified.svg?raw';
import CheckIcon from '$/components/icon/icons/check.svg?raw';
import ChevronDownIcon from '$/components/icon/icons/chevron-down.svg?raw';
import ChevronLeftIcon from '$/components/icon/icons/chevron-left.svg?raw';
import ChevronRightIcon from '$/components/icon/icons/chevron-right.svg?raw';
import ChevronUpIcon from '$/components/icon/icons/chevron-up.svg?raw';
import CircleCheckIcon from '$/components/icon/icons/circle-check.svg?raw';
import CircleDotIcon from '$/components/icon/icons/circle-dot.svg?raw';
import CircleIcon from '$/components/icon/icons/circle.svg?raw';
import GripVerticalIcon from '$/components/icon/icons/grip-vertical.svg?raw';
import LoaderIcon from '$/components/icon/icons/loader.svg?raw';
import PlusIcon from '$/components/icon/icons/plus.svg?raw';
import QuestionIcon from '$/components/icon/icons/question.svg?raw';
import SelectorIcon from '$/components/icon/icons/selector.svg?raw';
import SquareCheckIcon from '$/components/icon/icons/square-check.svg?raw';
import SquareMinusIcon from '$/components/icon/icons/square-minus.svg?raw';
import SquareIcon from '$/components/icon/icons/square.svg?raw';
import XIcon from '$/components/icon/icons/x.svg?raw';

export enum IconSize {
  BASE = 'base',
  EXTRA_SMALL = 'extra-small',
  SMALL = 'small',
  LARGE = 'large',
  EXTRA_LARGE = 'extra-large',
  EXTRA_LARGE2 = 'extra-large2',
}

export enum IconColor {
  INHERIT = 'inherit',
  NEUTRAL = 'neutral',
  BRAND = 'brand',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger',
}

// this is not typed as we want to have the types be dynamically generated so by doing this we can add to the object
// and the IconName type will be updated automatically and also make sure the values passed in here are of type
// Component since what we export is properly typed
const internalIconComponents = {
  'align-justified': AlignJustifiedIcon,
  check: CheckIcon,
  'chevron-down': ChevronDownIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  'chevron-up': ChevronUpIcon,
  selector: SelectorIcon,
  'circle-check': CircleCheckIcon,
  'circle-dot': CircleDotIcon,
  circle: CircleIcon,
  'grip-vertical': GripVerticalIcon,
  loader: LoaderIcon,
  plus: PlusIcon,
  question: QuestionIcon,
  'square-check': SquareCheckIcon,
  square: SquareIcon,
  'square-minus': SquareMinusIcon,
  x: XIcon,
};

export type IconName = keyof typeof internalIconComponents;
export const iconComponents: Record<IconName, string> = internalIconComponents;
