import classnames from 'classnames';
import { type Accessor, type JSX, createSignal, splitProps } from 'solid-js';

import Icon from '$/components/icon';
import styles from '$/components/radio/radio.module.css';
import type { DefaultFormData } from '$/stores/form.store';

export type RadioProps<TFormData = DefaultFormData> = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'name'> & {
  labelElement: JSX.Element;
  alignEnd?: boolean;
  name?: keyof TFormData;

  // while not directly used, used to infer the type for name to give properly type checking on that property
  formData?: Accessor<Partial<TFormData>>;
};

// we exposed a plain input in the off chance we need an input not hooked up to react-hook-form directly (like the
// auto complete component)
const Radio = <TFormData = DefaultFormData>(passedProps: RadioProps<TFormData>) => {
  const [props, restOfProps] = splitProps(passedProps, [
    'class',
    'labelElement',
    'alignEnd',
    'onSelect',
    'name',
    'formData',
  ]);

  // we need to manually track the checked state of the input in order to make sure the toggle slider properly
  // reacts when the checked state of the input changes
  const [isChecked, setIsChecked] = createSignal(restOfProps.checked);

  const handleSelect: JSX.EventHandlerUnion<HTMLInputElement, Event> = (event) => {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;

    setIsChecked(checked);

    if (props.onSelect) {
      const eventHandler = props.onSelect as JSX.EventHandler<HTMLInputElement, Event>;

      eventHandler(event);
    }
  };

  return (
    <span
      class={classnames(styles.radio, props.class, {
        [styles.alignEnd]: props.alignEnd,
      })}
    >
      <label>
        <input data-id="radio" {...restOfProps} type="radio" name={props.name as string} onChange={handleSelect} />
        <Icon
          class={classnames(styles.icon, {
            [styles.iconIsChecked]: isChecked(),
          })}
          icon={isChecked() ? 'circle-check' : 'circle'}
        />
        <span class={styles.label}>{props.labelElement}</span>
      </label>
    </span>
  );
};

// by default, we should be using the input the auto hooks with react-hook-form
export default Radio;
