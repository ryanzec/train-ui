import classnames from 'classnames';
import { type JSX, type ParentProps, splitProps } from 'solid-js';

import styles from '$/components/form-field/form-field.module.css';

export type FormFieldProps = JSX.HTMLAttributes<HTMLDivElement>;

const FormField = (passedProps: ParentProps<FormFieldProps>) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'children']);

  return (
    <div class={classnames(props.class, styles.formField)} data-id="form-field" {...restOfProps}>
      {props.children}
    </div>
  );
};

export default FormField;
