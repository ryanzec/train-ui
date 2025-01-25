import classnames from 'classnames';
import { type Accessor, type JSX, createSignal, mergeProps, onMount, splitProps } from 'solid-js';

import styles from '$/components/textarea/textarea.module.css';
import type { DefaultFormData } from '$/stores/form.store';

export type TextareaProps<TFormData = DefaultFormData> = Omit<
  JSX.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'name'
> & {
  name?: keyof TFormData;
  selectAllOnFocus?: boolean;

  // while not directly used, used to infer the type for name to give properly type checking on that property
  formData?: Accessor<Partial<TFormData>>;
};

const Textarea = <TFormData = DefaultFormData>(passedProps: TextareaProps<TFormData>) => {
  const [props, restOfProps] = splitProps(mergeProps({ selectAllOnFocus: false }, passedProps), [
    'class',
    'name',
    'formData',
    'selectAllOnFocus',
    'onFocus',

    // autofocus does not seem to work by default is some contexts (like is dialogs) so manually dealing with it
    'autofocus',
  ]);

  const [textareaElement, setTextareaElement] = createSignal<HTMLTextAreaElement>();

  const textareaRef = (element: HTMLTextAreaElement) => {
    setTextareaElement(element);
  };

  const handleFocus: JSX.EventHandlerUnion<HTMLTextAreaElement, FocusEvent> = (event) => {
    if (props.selectAllOnFocus) {
      textareaElement()?.select();
    }

    if (props.onFocus) {
      const eventHandler = props.onFocus as JSX.EventHandler<HTMLTextAreaElement, FocusEvent>;

      eventHandler(event);
    }
  };

  onMount(() => {
    if (props.autofocus !== true) {
      return;
    }

    textareaElement()?.focus();
  });

  return (
    <textarea
      data-id="textarea"
      ref={textareaRef}
      {...restOfProps}
      onFocus={handleFocus}
      name={props.name as string}
      class={classnames(styles.textarea, props.class)}
    />
  );
};

export default Textarea;
