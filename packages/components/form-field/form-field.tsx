import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/components/form-field/form-field.module.css';

export type FormFieldProps = JSX.HTMLAttributes<HTMLDivElement>;

const FormField = (passedProps: FormFieldProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'children']);

  return (
    <div data-id="form-field" {...restOfProps} class={classnames(props.class, styles.formField)}>
      {props.children}
    </div>
  );
};

export default FormField;
