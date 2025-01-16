import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/components/textarea/textarea.module.css';

export type TextareaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = (passedProps: TextareaProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class']);

  return <textarea data-id="textarea" {...restOfProps} class={classnames(styles.textarea, props.class)} />;
};

export default Textarea;
