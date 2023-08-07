import classnames from 'classnames';
import { JSX, splitProps } from 'solid-js';

import styles from '$/components/textarea/textarea.module.css';
import { FormInputValidationState } from '$/stores/form/utils';

export interface TextareaProps extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
  validationState?: FormInputValidationState;
}

const Textarea = (passedProps: TextareaProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'validationState']);

  return <textarea class={classnames(styles.textarea, props.class)} {...restOfProps} />;
};

export default Textarea;
