import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/components/form-fields/form-fields.module.css';

export type FormFieldsProps = JSX.HTMLAttributes<HTMLDivElement>;

const FormFields = (passedProps: FormFieldsProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'children']);

  return (
    <div data-id="form-fields" {...restOfProps} class={classnames(props.class, styles.formFields)}>
      {props.children}
    </div>
  );
};

export default FormFields;
