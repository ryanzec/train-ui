import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/components/form-fields/form-fields.module.css';

export type FormFieldProps = JSX.HTMLAttributes<HTMLDivElement>;

const FormField = (passedProps: FormFieldProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'children']);

  return (
    <div data-id="form-fields" {...restOfProps} class={classnames(props.class, styles.formFields)}>
      {props.children}
    </div>
  );
};

export default FormField;
