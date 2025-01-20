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
import HomeIcon from '$/components/icon/icons/home.svg?raw';
import LoaderIcon from '$/components/icon/icons/loader.svg?raw';
import MoonIcon from '$/components/icon/icons/moon.svg?raw';
import PencilIcon from '$/components/icon/icons/pencil.svg?raw';
import PlugIcon from '$/components/icon/icons/plug.svg?raw';
import PlusIcon from '$/components/icon/icons/plus.svg?raw';
import QuestionIcon from '$/components/icon/icons/question.svg?raw';
import SelectorIcon from '$/components/icon/icons/selector.svg?raw';
import SquareCheckIcon from '$/components/icon/icons/square-check.svg?raw';
import SquareFilledIcon from '$/components/icon/icons/square-filled.svg?raw';
import SquareMinusIcon from '$/components/icon/icons/square-minus.svg?raw';
import SquareIcon from '$/components/icon/icons/square.svg?raw';
import SunIcon from '$/components/icon/icons/sun.svg?raw';
import XIcon from '$/components/icon/icons/x.svg?raw';

export const IconSize = {
  BASE: 'base',
  EXTRA_SMALL: 'extra-small',
  EXTRA_SMALL2: 'extra-small2',
  SMALL: 'small',
  LARGE: 'large',
  EXTRA_LARGE: 'extra-large',
  EXTRA_LARGE2: 'extra-large2',
  EXTRA_LARGE3: 'extra-large3',
  EXTRA_LARGE4: 'extra-large4',
} as const;

export type IconSize = (typeof IconSize)[keyof typeof IconSize];

export const IconColor = {
  INHERIT: 'inherit',
  NEUTRAL: 'neutral',
  BRAND: 'brand',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  DANGER: 'danger',
} as const;

export type IconColor = (typeof IconColor)[keyof typeof IconColor];

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
  home: HomeIcon,
  loader: LoaderIcon,
  moon: MoonIcon,
  pencil: PencilIcon,
  plug: PlugIcon,
  plus: PlusIcon,
  question: QuestionIcon,
  'square-check': SquareCheckIcon,
  square: SquareIcon,
  'square-filled': SquareFilledIcon,
  'square-minus': SquareMinusIcon,
  sun: SunIcon,
  x: XIcon,
};

export type IconName = keyof typeof internalIconComponents;
export const iconComponents: Record<IconName, string> = internalIconComponents;
