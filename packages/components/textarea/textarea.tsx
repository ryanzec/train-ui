import classnames from 'classnames';
import { type Accessor, type JSX, splitProps } from 'solid-js';

import styles from '$/components/textarea/textarea.module.css';
import type { DefaultFormData } from '$/stores/form/utils';

export type TextareaProps<TFormData = DefaultFormData> = Omit<
  JSX.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'name'
> & {
  name?: keyof TFormData;

  // while not directly used, used to infer the type for name to give properly type checking on that property
  formData?: Accessor<Partial<TFormData>>;
};

const Textarea = <TFormData = DefaultFormData>(passedProps: TextareaProps<TFormData>) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'name', 'formData']);

  return (
    <textarea
      data-id="textarea"
      {...restOfProps}
      name={props.name as string}
      class={classnames(styles.textarea, props.class)}
    />
  );
};

export default Textarea;
