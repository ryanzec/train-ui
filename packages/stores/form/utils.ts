//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// there are numerous locations where we are doing explicit casting and such which related to:
//
// - the fact that is seems like Node element are typed in a way they should not be
// - to account for the fact that we are modifying data without really knowing the exact type
//
// while there might be a better way to handle these things that I am aware of with typescript, the casting seems
// like the sanest solution for the time being and this can be refactored later if other pattern are learned
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { produce } from 'immer';
import * as lodash from 'lodash';
import { type Accessor, type Setter, createSignal, onCleanup } from 'solid-js';
import type * as zod from 'zod';

import { InputType, domUtils } from '$/utils/dom';
import { zodUtils } from '$/utils/zod';

export enum FormInputValidationState {
  NEUTRAL = 'neutral',
  VALID = 'valid',
  INVALID = 'invalid',
}

export type FormDirective = (element: HTMLFormElement) => void;

// this split allows for recursive typing since arrays and have array which can have arrays and so on
type ArrayFieldErrors = {
  [key: string]: {
    errors: string[];
    [key: number]: ArrayFieldErrors;
  };
};

export type FormErrorsData<TFormData> = {
  [K in keyof TFormData]?: {
    errors: string[];
    [key: number]: ArrayFieldErrors;
  };
};

export type FormErrors<TFormData> = Accessor<FormErrorsData<TFormData>>;

type SetValueOptions = {
  markAsTouched?: boolean;
};

// using unknown here allows for outside code to not have to cast to prevent typescript errors and would rather
// localize casting in this one file than having to have everything that calls this methods have to case since
// casting really does not provide any benefit as best as I can tell
export type FormSetValue<TFormData> = (name: keyof TFormData, value: unknown, options?: SetValueOptions) => void;

export type FormSetValues<TFormData> = (values?: Partial<TFormData>, options?: SetValueOptions) => void;

export type FormData<TFormData> = Accessor<Partial<TFormData>>;

type CreateFormOptions<TFormData extends object, TSchemaObject extends zod.ZodRawShape> = {
  // this is partial as without validation (which is not required), the data could be missing data
  onSubmit: (data: Partial<TFormData>) => void;
  onClear?: () => void;
  onReset?: () => void;
  initialValues?: Partial<TFormData>;
  // seems like any is needed to support the zod schema type
  schema?: zod.ZodObject<TSchemaObject>;
  validateOnChange?: boolean;
};

const defaultCreateFormOptions = {
  validateOnChange: true,
};

type SetValueOption = {
  markAsTouched?: boolean;
};

export type CreateFormReturn<TFormData extends object, TSchemaObject extends zod.ZodRawShape> = {
  formDirective: FormDirective;
  data: Accessor<Partial<TFormData>>;
  // @todo(refactor) would prefer a type that matched the string to what is can be based on the TFormData but not
  // @todo(refactor) sure if that is possible
  addArrayField: (name: string, value?: Record<string, unknown>) => void;
  // @todo(refactor) would prefer a type that matched the string to what is can be based on the TFormData but not
  // @todo(refactor) sure if that is possible
  removeArrayField: (name: string, removeIndex: number) => void;
  setValue: FormSetValue<TFormData>;
  setValues: FormSetValues<TFormData>;
  errors: Accessor<FormErrorsData<TFormData>>;
  clear: () => void;
  reset: () => void;
  isTouched: (name: keyof TFormData) => boolean;
  isDirty: (name: keyof TFormData) => boolean;
  touchedFields: Accessor<Array<keyof TFormData>>;
  dirtyFields: Accessor<Array<keyof TFormData>>;
  updateValidationErrors: (fieldName?: string) => boolean;
  isValid: () => boolean;
  watch: (watcher: FormWatcher<TFormData>) => WatchReturns;

  // since this is a generic system, we need to allow any
  setSchema: Setter<zod.ZodObject<TSchemaObject> | undefined>;

  // make it easier to submit the form when the button can't be in the <form> element
  submitForm: () => void;
};

export type FormWatcher<TFormData extends object> = (name: keyof TFormData, data: Partial<TFormData>) => void;

export type WatchReturns = {
  unsubscribe: () => void;
};

const createForm = <TFormData extends object, TSchemaObject extends zod.ZodRawShape>(
  passedOptions: CreateFormOptions<TFormData, TSchemaObject>,
): CreateFormReturn<TFormData, TSchemaObject> => {
  // @todo(investigate) unfortunately the onSubmit causes a weird issue with structuredClone so not using that here
  const options = Object.assign({}, defaultCreateFormOptions, passedOptions);
  const [errors, setErrors] = createSignal<FormErrorsData<TFormData>>({});
  const [data, setData] = createSignal<Partial<TFormData>>(options.initialValues ?? {});
  const [touchedFields, setTouchedFields] = createSignal<Array<keyof TFormData>>([]);
  const [dirtyFields, setDirtyFields] = createSignal<Array<keyof TFormData>>([]);
  const [formElement, setFormElement] = createSignal<HTMLFormElement>();
  const [formWatchers, setFormWatchers] = createSignal<FormWatcher<TFormData>[]>([]);

  // seems like any is needed to support the zod schema type
  const [schema, setSchema] = createSignal<zod.ZodObject<TSchemaObject> | undefined>(options.schema);

  const isTouched = (name: keyof TFormData) => {
    return touchedFields().includes(name);
  };

  const setAsTouched = (name: keyof TFormData) => {
    setTouchedFields((previousTouchedFields) => [...new Set([...previousTouchedFields, name])]);
  };

  const removeAsTouched = (name: keyof TFormData) => {
    setTouchedFields((previousTouchedFields) => previousTouchedFields.filter((fieldName) => fieldName !== name));
  };

  const isDirty = (name: keyof TFormData) => {
    return dirtyFields().includes(name);
  };

  const setAsDirty = (name: keyof TFormData) => {
    setDirtyFields((previousTouchedFields) => [...new Set([...previousTouchedFields, name])]);
  };

  const removeAsDirty = (name: keyof TFormData) => {
    setDirtyFields((previousTouchedFields) => previousTouchedFields.filter((fieldName) => fieldName !== name));
  };

  type TriggerValueChangeOptions = {
    isTouched?: boolean;
  };

  const triggerValueChanged = (
    name: string,
    // biome-ignore lint/suspicious/noExplicitAny: since this is a generic system, we need to allow any
    value: any,
    // biome-ignore lint/suspicious/noExplicitAny: since this is a generic system, we need to allow any
    previousValue: any,
    selfOptions: TriggerValueChangeOptions = {},
  ) => {
    if (formWatchers().length > 0) {
      for (const watcher of formWatchers()) {
        watcher(name as keyof TFormData, data());
      }
    }

    // these values eqaute to undefined as it related to checking for dirty state (so that is some types something
    // and then clear it, it is not longer dirty since it is not)
    const dirtyValueCheck = value === '' || value === null || value === undefined ? undefined : value;
    const isDirty = lodash.isEqual(dirtyValueCheck, options.initialValues?.[name as keyof TFormData]) === false;
    let currentValueIsTouched = touchedFields().includes(name as keyof TFormData);

    if (selfOptions.isTouched !== undefined) {
      // once touched only resetting the form component can undo that
      if (currentValueIsTouched || selfOptions.isTouched) {
        setAsTouched(name as keyof TFormData);
        currentValueIsTouched = true;
      } else {
        removeAsTouched(name as keyof TFormData);
        currentValueIsTouched = false;
      }
    }

    if (isDirty) {
      setAsDirty(name as keyof TFormData);
    } else {
      removeAsDirty(name as keyof TFormData);
    }

    if (schema() && options.validateOnChange && currentValueIsTouched) {
      updateValidationErrors(name);
    }
  };

  const generateErrors = (checkIsTouched = true, fieldName?: string) => {
    const activeSchema = schema();

    if (!activeSchema) {
      return {};
    }

    // if we are validating a specific field, we only need to validate that, this will make sure performance is good
    // by not wasting time validating data that did not change
    if (fieldName) {
      const value = lodash.get(data(), fieldName);
      const fieldValidationResults = zodUtils.getNestedSchema(fieldName, activeSchema.shape).safeParse(value);
      let currentErrors = errors();

      if (fieldValidationResults.success === false) {
        currentErrors = produce(currentErrors, (draft) => {
          lodash.set(draft, fieldName, {
            errors: fieldValidationResults.error.format()._errors,
          });
        });
      } else {
        currentErrors = produce(currentErrors, (draft) => {
          lodash.unset(draft, fieldName);
        });
      }

      return currentErrors;
    }

    // do full validation if we are not updating a specific field
    const validationResults = activeSchema.safeParse(data());

    if (validationResults.success) {
      return {};
    }

    const formattedErrors = validationResults.error.format();

    // biome-ignore lint/suspicious/noExplicitAny: avoid weird typescript error
    const getErrors = (formattedErrors: { _errors: string[]; [key: string]: any }, parentPath = '') => {
      // biome-ignore lint/suspicious/noExplicitAny: avoid weird typescript error
      const newFormat: { [key: string]: any } = {};

      const keys = Object.keys(formattedErrors);

      for (const key of keys) {
        if (key === '_errors') {
          continue;
        }

        const touchedCheckFailed = checkIsTouched && !isTouched(`${parentPath}${key}` as keyof TFormData);
        const nestedKeys = Object.keys(formattedErrors[key]);

        if (nestedKeys.length > 1) {
          const value = getErrors(formattedErrors[key], `${parentPath}${key}.`);

          if (Object.keys(value).length > 0) {
            newFormat[key] = value;
          }
        }

        if (touchedCheckFailed) {
          continue;
        }

        if (touchedCheckFailed || formattedErrors[key]._errors.length === 0) {
          continue;
        }

        if (formattedErrors[key]._errors.length > 0) {
          newFormat[key] = {
            ...(newFormat[key] || {}),
            errors: formattedErrors[key]._errors,
          };
        }
      }

      // biome-ignore lint/suspicious/noExplicitAny: avoid weird typescript error
      return newFormat as any;
    };

    return getErrors(formattedErrors);
  };

  // this can be useful when we want to know the validation state of the form but not modify the errors themselves
  // CONTEXT: this was created to support the ability to disable form buttons when a form is invalid which would
  // be the default state however we did not want the form the start off with the validation message since the user
  // would not have had a chance to enter anything in at that point
  const isValid = () => {
    const currentErrors = generateErrors(false);

    return Object.keys(currentErrors).length === 0;
  };

  const updateValidationErrors = (fieldName?: string) => {
    const activeSchema = schema();

    if (!activeSchema) {
      setErrors({});

      return false;
    }

    const validationResults = activeSchema.safeParse(data());

    if (validationResults.success) {
      setErrors({});

      return false;
    }

    const newTouchedFields = fieldName ? [] : zodUtils.getErrorPaths<keyof TFormData>(validationResults.error);

    // make sure any path that have errors are marked as touched so the errors are processed
    setTouchedFields((previousTouchedFields) => [...new Set([...previousTouchedFields, ...newTouchedFields])]);

    setErrors(() => {
      return generateErrors(true, fieldName);
    });

    return true;
  };

  const handleInput = (event: Event) => {
    // see comment at top of file as to why explicit casting is happening
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const previousValue = lodash.get(data(), name);
    const value = target.value;
    const uncontrolledValue = target.attributes.getNamedItem('data-uncontrolled-value')?.value ?? '';

    if (uncontrolledValue === 'true') {
      return;
    }

    setData((oldValue) =>
      produce(oldValue, (draft) => {
        lodash.set(draft, name, value);
      }),
    );

    // @todo(performance) might want to make this configurable if doing this on every change becomes a problem in
    // @todo(performance) certain cases
    triggerValueChanged(name, lodash.get(data(), name), previousValue, {
      isTouched: true,
    });
  };

  const handleBlur = (event: Event) => {
    // see comment at top of file as to why explicit casting is happening
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const currentValue = lodash.get(data(), name);
    const blurredOverride = target.attributes.getNamedItem('data-blurred')?.value ?? 'true';

    if (blurredOverride === 'false') {
      return;
    }

    // while the value did not change, run this make sure things like validation are executed so we run it with
    // whatever the current value is
    triggerValueChanged(name, currentValue, currentValue, { isTouched: true });
  };

  const handleTextChange = (event: Event) => {
    // see comment at top of file as to why explicit casting is happening
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const currentValue = lodash.get(data(), name);

    // since this only happen when the input loses focus, this is where we want to make sure the input is marked
    // as touched
    triggerValueChanged(name, currentValue, currentValue, { isTouched: true });
  };

  const handleCheckboxChange = (event: Event) => {
    // see comment at top of file as to why explicit casting is happening
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const previousValue = lodash.get(data(), name);
    const value = target.value;
    const checked = target.checked;
    let checkboxValue = lodash.get(data(), name);

    // if there is no value attribute, assume a true / false toggle
    if (target.attributes.getNamedItem('value') === null) {
      checkboxValue = checked;
    } else {
      if (!Array.isArray(checkboxValue)) {
        checkboxValue = [];
      }

      if (checked) {
        // since checkboxValue is from a store and that is not directly mutable, we need to create a new array
        // insteead of using push
        checkboxValue = [...new Set([...checkboxValue, value])];
      } else {
        checkboxValue = checkboxValue.filter((currentValue: unknown) => currentValue !== value);
      }
    }

    setData((oldValue) =>
      produce(oldValue, (draft) => {
        lodash.set(draft, name, checkboxValue);
      }),
    );

    triggerValueChanged(name, lodash.get(data(), name), previousValue, {
      isTouched: true,
    });
  };

  const handleRadioChange = (event: Event) => {
    // see comment at top of file as to why explicit casting is happening
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const previousValue = lodash.get(data(), name);
    const value = target.value;
    const checked = target.checked;

    // since when a radio changes its value, the radio that was previous checked also changes, so we need to
    // see if this change is being done to newly checked radio as we only want to process the radio changing
    // to checked fully as otherwise the code that triggers the change event for the radio that is being
    // unchecked would cause an infinite loop
    const isCurrentValue = value === previousValue;
    const isChangingToChecked = checked && !isCurrentValue;

    if (isChangingToChecked) {
      setData((oldValue) =>
        produce(oldValue, (draft) => {
          lodash.set(draft, name, checked ? value : '');
        }),
      );

      // we need to make sure that the radio being unchecked also trigger any change event that might be attached
      const relatedInputs = formElement()?.querySelectorAll(`[name="${name}"][value="${previousValue}"]`) ?? [];

      if (relatedInputs.length > 0) {
        for (let i = 0; i < relatedInputs.length; i++) {
          relatedInputs[i].dispatchEvent(new Event('change'));
        }
      }
    }

    triggerValueChanged(name, lodash.get(data(), name), previousValue, {
      isTouched: true,
    });
  };

  const handleSelectChange = (event: Event) => {
    // see comment at top of file as to why explicit casting is happening
    const target = event.target as HTMLSelectElement;
    const name = target.name;
    const previousValue = lodash.get(data(), name);
    const value = target.value;

    setData((oldValue) =>
      produce(oldValue, (draft) => {
        lodash.set(draft, name, value);
      }),
    );

    triggerValueChanged(name, lodash.get(data(), name), previousValue, {
      isTouched: true,
    });
  };

  const handleSubmitForm = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const values = data();

    if (updateValidationErrors()) {
      return;
    }

    options.onSubmit(values);
  };

  const assignFormInputEventHandlers = (element: Element) => {
    const inputType = domUtils.getInputType(element);

    if (inputType === InputType.CHECKBOX) {
      element.addEventListener('change', handleCheckboxChange);

      return;
    }

    if (inputType === InputType.RADIO) {
      element.addEventListener('change', handleRadioChange);

      return;
    }

    if (inputType === InputType.SELECT) {
      element.addEventListener('change', handleSelectChange);

      return;
    }

    element.addEventListener('input', handleInput);
    element.addEventListener('change', handleTextChange);
    element.addEventListener('blur', handleBlur);
  };

  const applyValueFromStore = (element: Element) => {
    const inputType = domUtils.getInputType(element);
    const inputName = element.attributes.getNamedItem('name')?.value ?? '';

    // if the value is not in the store then we should clear out the input to make sure it reflects the stored values
    const storedValue = lodash.get(data(), inputName) ?? '';

    // there are times when the input is going to be managed by another piece of code (
    const uncontrolledValue = element.attributes.getNamedItem('data-uncontrolled-value')?.value ?? '';

    if (uncontrolledValue === 'true') {
      return;
    }

    if (inputType === InputType.CHECKBOX || inputType === InputType.RADIO) {
      const inputValue = element.attributes.getNamedItem('value')?.value ?? '';
      const domCheckedValue = (element as HTMLInputElement).checked;
      const storeCheckedValue =
        inputType === InputType.RADIO ? storedValue === inputValue : storedValue.includes(inputValue);
      const triggerChangeEvent = domCheckedValue !== storeCheckedValue;

      // see comment at top of file as to why explicit casting is happening
      (element as HTMLInputElement).checked = storeCheckedValue;

      if (triggerChangeEvent) {
        // manually changing the checked value here will not trigger a change event for the input if the value
        // does actually change, so we manually trigger it
        element.dispatchEvent(new Event('change'));
      }

      return;
    }

    // see comment at top of file as to why explicit casting is happening
    (element as HTMLInputElement).value = storedValue;
  };

  const checkForInputElements = (mutation: MutationRecord) => {
    Array.from(mutation.addedNodes).some((node) => {
      const formInputElements = domUtils.getFormInputElementsRecursive(node as Element);

      for (const inputElement of formInputElements) {
        assignFormInputEventHandlers(inputElement);
        applyValueFromStore(inputElement);
      }
    });
  };

  const domMutationHandler = (mutationList: MutationRecord[]) => {
    for (const mutation of mutationList) {
      checkForInputElements(mutation);
    }
  };

  const getAllInputElements = (element: HTMLFormElement): Element[] => {
    const inputElements = element.querySelectorAll('input');
    const textareaElements = element.querySelectorAll('textarea');
    const selectElements = element.querySelectorAll('select');

    return [...Array.from(inputElements), ...Array.from(textareaElements), ...Array.from(selectElements)];
  };

  const getInputElementsBySelector = (selector: string): Element[] => {
    const currentFormElement = formElement();

    if (!currentFormElement) {
      return [];
    }

    return Array.from(currentFormElement.querySelectorAll(selector));
  };

  const formDirective = (element: HTMLFormElement) => {
    const inputElements = getAllInputElements(element);

    for (const inputElement of inputElements) {
      assignFormInputEventHandlers(inputElement);
      applyValueFromStore(inputElement);
    }

    setFormElement(element);

    element.addEventListener('submit', handleSubmitForm);

    const domObserver = new MutationObserver(domMutationHandler);

    domObserver.observe(element, { childList: true, subtree: true });

    onCleanup(() => {
      domObserver.disconnect();
    });
  };

  const addArrayField = (name: string, value: unknown) => {
    const previousValue = lodash.get(data(), name);

    setData((oldValue) =>
      produce(oldValue, (draft) => {
        // biome-ignore lint/suspicious/noExplicitAny: to avoid typescript issues
        const currentValue = (lodash.get(draft, name) || []) as Array<any>;

        currentValue.push(value);

        lodash.set(draft, name, currentValue);
      }),
    );

    triggerValueChanged(name, lodash.get(data(), name), previousValue);
  };

  const removeArrayField = (name: string, removeIndex: number) => {
    const previousValue = lodash.get(data(), name);

    setData((oldValue) =>
      produce(oldValue, (draft) => {
        // have to go this round about way to remove an item from an array with a path string as lodash.unset does
        // not properly work ith arrays
        // reference: https://github.com/lodash/lodash/issues/5630
        // biome-ignore lint/suspicious/noExplicitAny: to avoid typescript issues
        const arrayValue = lodash.get(draft, `${name}`) as any[];

        arrayValue.splice(removeIndex, 1);

        lodash.set(draft, name, arrayValue);
      }),
    );

    setTouchedFields((touchedValues) => {
      return touchedValues.filter((touchedValue) => (touchedValue as string).indexOf(`${name}.${removeIndex}`) !== 0);
    });

    // biome-ignore lint/suspicious/noExplicitAny: to avoid typescript issues
    const currentValue = lodash.get(data(), name) as any[];

    let touchedAsString = JSON.stringify(touchedFields());

    for (let i = removeIndex + 1; i <= currentValue.length; i++) {
      touchedAsString = touchedAsString.replaceAll(`${name}.${i}`, `${name}.${i - 1}`);
    }

    setTouchedFields(JSON.parse(touchedAsString));

    updateElementsFromStore(`[name^="${name}"]`);
    triggerValueChanged(name, currentValue, previousValue, { isTouched: true });
  };

  const setValue: FormSetValue<TFormData> = (name: keyof TFormData, value: unknown, options: SetValueOption = {}) => {
    const previousValue = lodash.get(data(), name as string);

    setData((oldValue) =>
      produce(oldValue, (draft) => {
        lodash.set(draft, name, value);
      }),
    );

    triggerValueChanged(name as string, value, previousValue, {
      isTouched: options.markAsTouched ?? true,
    });

    // see comment at top of file as to why explicit casting is happening
    // we do all version to properly support checkboxes and radios that can have the same name
    const inputElements = formElement()?.querySelectorAll(`[name="${name as string}"]`);

    if (!inputElements) {
      return;
    }

    for (const inputElement of inputElements) {
      applyValueFromStore(inputElement);
    }
  };

  const setValues: FormSetValues<TFormData> = (values?: Partial<TFormData>, options?: SetValueOption) => {
    if (!values) {
      return;
    }

    // @todo(performance) if this becomes a bottleneck, refactor to make this do all value update first and the
    // @todo(performance) secondary stuff (trigger change, update validation, etc.)
    for (const key of Object.keys(values)) {
      setValue(key as keyof TFormData, values[key as keyof TFormData], options);
    }
  };

  const resetHtmlElements = () => {
    const currentFormElement = formElement();

    if (!currentFormElement) {
      return;
    }

    // reset the html elements
    const inputElements = getAllInputElements(currentFormElement);

    for (const inputElement of inputElements) {
      applyValueFromStore(inputElement);
    }
  };

  const updateElementsFromStore = (selector: string) => {
    const elements = getInputElementsBySelector(selector);

    for (const element of elements) {
      applyValueFromStore(element);
    }
  };

  const reset = () => {
    // reset the internal data
    setData(options.initialValues ?? {});
    setErrors({});
    setTouchedFields([]);

    if (options.onReset) {
      options.onReset();
    }

    resetHtmlElements();
  };

  const clear = () => {
    // clear the internal data
    setData({});
    setErrors({});
    setTouchedFields([]);

    if (options.onClear) {
      options.onClear();
    }

    resetHtmlElements();
  };

  const watch = (newFormWatcher: FormWatcher<TFormData>): WatchReturns => {
    // @note(performance) using ... can cause performance / memory issues
    setFormWatchers((oldFormWatchers) => [...oldFormWatchers, newFormWatcher]);

    // used to allow the subscriber to unsubscribe
    return {
      unsubscribe: () => {
        setFormWatchers((oldFormWatchers) => oldFormWatchers.filter((formWatcher) => newFormWatcher !== formWatcher));
      },
    };
  };

  const submitForm = () => {
    const currentFormElement = formElement();

    if (!currentFormElement) {
      return;
    }

    currentFormElement.dispatchEvent(new Event('submit'));
  };

  return {
    formDirective,
    data,
    addArrayField,
    removeArrayField,
    setValue,
    setValues,
    errors,
    clear,
    reset,
    setSchema,
    isTouched,
    isDirty,
    touchedFields,
    dirtyFields,
    updateValidationErrors,
    isValid,
    watch,
    submitForm,
  };
};

export const formStoreUtils = {
  createForm,
  getValidationState: (errors?: string[]) => {
    return errors ? FormInputValidationState.INVALID : FormInputValidationState.VALID;
  },
};
