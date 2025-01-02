import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/components/textarea/textarea.module.css';
import type { FormInputValidationState } from '$/stores/form/utils';

export type TextareaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  validationState?: FormInputValidationState;
};

const Textarea = (passedProps: TextareaProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'validationState']);

  return <textarea data-id="textarea" {...restOfProps} class={classnames(styles.textarea, props.class)} />;
};

export default Textarea;
