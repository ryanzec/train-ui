import Radio, { type RadioProps } from '$/components/radio/radio';
import Group, { type RadioGroupProps } from '$/components/radio/radio-group';

export type { RadioGroupProps, RadioProps };

export default Object.assign(Radio, { Group });
