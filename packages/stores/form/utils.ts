//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// there are numerous locations where we are doing explicit casting and such which related to:
//
// - the fact that is seems like Node element are typed in a way they should not be
// - to account for the fact that we are modifying data without really knowing the exact type
//
// while there might be a better way to handle these things that I am aware of with typescript, the casting seems
// like the sanest solution for the time being and this can be refactored later if other pattern are learned
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import get from 'get-value';
import set from 'set-value';
import { Accessor, createSignal, Setter } from 'solid-js';
import * as zod from 'zod';

import { domUtils, InputType } from '$/utils/dom';
import { zodUtils } from '$/utils/zod';

export enum FormInputValidationState {
  NEUTRAL = 'neutral',
  VALID = 'valid',
  INVALID = 'invalid',
}

export type FormDirective = (element: HTMLFormElement) => void;

export type FormErrorsData<TFormData> = {
  [K in keyof TFormData]?: {
    errors: string[];
    [key: number]: {
      [key: string]: {
        errors: string[];
      };
    };
  };
};

export type FormErrors<TFormData> = Accessor<FormErrorsData<TFormData>>;

// using unknown here allows for outside code to not have to cast to prevent typescript errors and would rather
// localize casting in this one file than having to have everything that calls this methods have to case since
// casting really does not provide any benefit as best as I can tell
export type FormSetValue<TFormData> = (name: keyof TFormData, value: unknown) => void;

export type FormData<TFormData> = Accessor<Partial<TFormData>>;

interface CreateFormOptions<TFormData extends object> {
  onSubmit: (data: Partial<TFormData>) => void;
  // since this is a generic system, not sure what else can be done besides using any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValueChanged?: (name: keyof TFormData, value: any) => void;
  onClear?: () => void;
  onReset?: () => void;
  initialValues?: Partial<TFormData>;
  // seems like any is needed to support the zod schema type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema?: zod.ZodType<TFormData, any, any>;
  validateOnChange?: boolean;
}

const defaultCreateFormOptions = {
  validateOnChange: true,
};

interface SetValueOption {
  markAsTouched?: boolean;
}

export interface CreateFormReturn<TFormData> {
  form: FormDirective;
  data: Accessor<Partial<TFormData>>;
  addArrayField: (name: keyof TFormData, value?: Record<string, unknown>) => void;
  removeArrayField: (name: keyof TFormData, removeIndex: number) => void;
  setValue: (name: keyof TFormData, value: unknown, options?: SetValueOption) => void;
  errors: Accessor<FormErrorsData<TFormData>>;
  clear: () => void;
  reset: () => void;
  isTouched: (name: keyof TFormData) => boolean;
  touchedFields: Accessor<Array<keyof TFormData>>;
  updateValidationErrors: (fieldName?: string) => boolean;
  isValid: () => boolean;

  // since this is a generic system, we need to allow any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSchema: Setter<zod.ZodType<TFormData, any, any> | undefined>;
}

const createForm = <TFormData extends object>(
  passedOptions: CreateFormOptions<TFormData>,
): CreateFormReturn<TFormData> => {
  const options = Object.assign({}, defaultCreateFormOptions, passedOptions);
  const [errors, setErrors] = createSignal<FormErrorsData<TFormData>>({});
  const [data, setData] = createSignal<Partial<TFormData>>(options.initialValues ?? {});
  const [touchedFields, setTouchedFields] = createSignal<Array<keyof TFormData>>([]);
  const [formElement, setFormElement] = createSignal<HTMLFormElement>();

  // seems like any is needed to support the zod schema type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [schema, setSchema] = createSignal<zod.ZodType<TFormData, any, any> | undefined>(options.schema);

  const isTouched = (name: keyof TFormData) => {
    return touchedFields().includes(name);
  };

  const setAsTouched = (name: keyof TFormData) => {
    setTouchedFields((previousTouchedFields) => [...new Set([...previousTouchedFields, name])]);
  };

  const removeAsTouched = (name: keyof TFormData) => {
    setTouchedFields((previousTouchedFields) => previousTouchedFields.filter((fieldName) => fieldName !== name));
  };

  interface TriggerValueChangeOptions {
    isTouched?: boolean;
  }

  const triggerValueChanged = (
    name: string,
    // since this is a generic system, we need to allow any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    previousValue: any,
    selfOptions: TriggerValueChangeOptions = {},
  ) => {
    if (value !== previousValue && options.onValueChanged) {
      options.onValueChanged(name as keyof TFormData, value);
    }

    if (selfOptions.isTouched !== undefined) {
      if (selfOptions.isTouched) {
        setAsTouched(name as keyof TFormData);
      } else {
        removeAsTouched(name as keyof TFormData);
      }
    }

    if (schema() && options.validateOnChange) {
      updateValidationErrors(name);
    }
  };

  const generateErrors = (
    previousErrors: FormErrorsData<TFormData> = {},
    checkIsTouched = true,
    fieldName?: string,
  ) => {
    const activeSchema = schema();

    if (!activeSchema) {
      return {};
    }

    const validationResults = activeSchema.safeParse(data());

    if (validationResults.success) {
      return {};
    }

    const formattedErrors = validationResults.error.format();

    const getErrors = (formattedErrors: { _errors: string[] }, parentPrefix = '') => {
      const errorKeys = Object.keys(formattedErrors);
      const newErrors = {};

      errorKeys.forEach((errorKey) => {
        const existingErrors = get(previousErrors, `${parentPrefix}${errorKey}`);

        // copy over existing errors so they don't get removed
        if (existingErrors) {
          // @ts-expect-error see comment at top of file
          newErrors[errorKey] = existingErrors;
        }

        // this seems to always be part of the result of zod formatted validation but is not useful is our case
        // as best I can tell
        if (
          errorKey === '_errors' ||
          (checkIsTouched && !isTouched(`${parentPrefix}${errorKey}` as keyof TFormData)) ||
          (fieldName && fieldName.indexOf(`${parentPrefix}${errorKey}`) !== 0)
        ) {
          return;
        }

        // @ts-expect-error see comment at top of file
        const currentField = formattedErrors[errorKey];
        const currentFieldKeys = Object.keys(currentField);
        const currentFieldErrors: Record<string, Record<string, { errors: string[] }>> = {};

        if (currentFieldKeys.length > 1) {
          currentFieldKeys.forEach((currentFieldKey) => {
            // this seems to always be part of the result of zod formatted validation but is not useful is our case
            // as best  I can tell
            if (currentFieldKey === '_errors') {
              return;
            }

            currentFieldErrors[currentFieldKey] = getErrors(
              currentField[currentFieldKey],
              `${errorKey}.${currentFieldKey}.`,
            );
          });
        }

        if (currentField._errors?.length > 0) {
          currentFieldErrors.errors = currentField._errors;
        }

        // @ts-expect-error see comment at top of file
        newErrors[errorKey] = currentFieldErrors;
      });

      return newErrors;
    };

    return getErrors(formattedErrors);
  };

  // this can be useful when we want to know the validation state of the form but not modify the errors themselves
  // CONTEXT: this was created to support the ability to disable form buttons when a form is invalid which would
  // be the default state however we did not want the form the start off with the validation message since the user
  // would not have had a chance to enter anything in at that point
  const isValid = () => {
    // const t = performance.now();
    const currentErrors = generateErrors(errors(), false);

    // console.log(`t: ${performance.now() - t}`);

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

    setErrors((previousErrors) => {
      return generateErrors(previousErrors, true, fieldName);
    });

    return true;
  };

  const onInput = (event: Event) => {
    // see comment at top of file as to why explicit casting is happening
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const previousValue = get(data(), name);
    const value = target.value;
    const uncontrolledValue = target.attributes.getNamedItem('data-uncontrolled-value')?.value ?? '';

    if (uncontrolledValue === 'true') {
      return;
    }

    setData((oldValue) => {
      const newValue = { ...oldValue };

      set(newValue, name, value);

      // see comment at top of file as to why explicit casting is happening
      return newValue as TFormData;
    });

    // @todo(performance) might want to make this configurable if doing this on every change becomes a problem in
    // @todo(performance) certain cases
    triggerValueChanged(name, get(data(), name), previousValue, { isTouched: true });
  };

  const onBlur = (event: Event) => {
    // see comment at top of file as to why explicit casting is happening
    const target = event.target as HTMLInputElement;
    const name = target.name;

    // while the value did not change, run this make sure things like validation are executed so we run it with
    // whatever the current value is
    triggerValueChanged(name, get(data(), name), get(data(), name), { isTouched: true });
  };

  const onTextChange = (event: Event) => {
    // see comment at top of file as to why explicit casting is happening
    const target = event.target as HTMLInputElement;
    const name = target.name;

    // since this only happen when the input loses focus, this is where we want to make sure the input is marked
    // as touched
    triggerValueChanged(name, get(data(), name), get(data(), name), { isTouched: true });
  };

  const onCheckboxChange = (event: Event) => {
    // see comment at top of file as to why explicit casting is happening
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const previousValue = get(data(), name);
    const value = target.value;
    const checked = target.checked;
    let checkboxValue = get(data(), name);

    // if there is no value attribute, assume a true / false toggle
    if (target.attributes.getNamedItem('value') === null) {
      checkboxValue = checked;
    } else {
      if (!Array.isArray(checkboxValue)) {
        checkboxValue = [];
      }

      if (checked) {
        checkboxValue.push(value);
      } else {
        checkboxValue = checkboxValue.filter((currentValue: unknown) => currentValue !== value);
      }
    }

    setData((oldValue) => {
      const newValue = { ...oldValue };

      set(newValue, name, checkboxValue);

      return newValue;
    });

    triggerValueChanged(name, get(data(), name), previousValue, { isTouched: true });
  };

  const onRadioChange = (event: Event) => {
    // see comment at top of file as to why explicit casting is happening
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const previousValue = get(data(), name);
    const value = target.value;
    const checked = target.checked;

    // since when a radio changes its value, the radio that was previous checked also changes, so we need to
    // see if this change is being done to newly checked radio as we only want to process the radio changing
    // to checked fully as otherwise the code that triggers the change event for the radio that is being
    // unchecked would cause an infinite loop
    const isCurrentValue = value === previousValue;
    const isChangingToChecked = checked && !isCurrentValue;

    if (isChangingToChecked) {
      setData((oldValue) => {
        const newValue = { ...oldValue };

        set(newValue, name, checked ? value : '');

        return newValue;
      });

      // we need to make sure that the radio being unchecked also trigger any change event that might be attached
      const relatedInputs = formElement()?.querySelectorAll(`[name="${name}"][value="${previousValue}"]`) ?? [];

      if (relatedInputs.length > 0) {
        for (let i = 0; i < relatedInputs.length; i++) {
          relatedInputs[i].dispatchEvent(new Event('change'));
        }
      }
    }

    triggerValueChanged(name, get(data(), name), previousValue, { isTouched: true });
  };

  const onSelectChange = (event: Event) => {
    // see comment at top of file as to why explicit casting is happening
    const target = event.target as HTMLSelectElement;
    const name = target.name;
    const previousValue = get(data(), name);
    const value = target.value;

    setData((oldValue) => {
      const newValue = { ...oldValue };

      set(newValue, name, value);

      return newValue;
    });

    triggerValueChanged(name, get(data(), name), previousValue, { isTouched: true });
  };

  const onSubmitForm = (event: Event) => {
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
      element.addEventListener('change', onCheckboxChange);

      return;
    }

    if (inputType === InputType.RADIO) {
      element.addEventListener('change', onRadioChange);

      return;
    }

    if (inputType === InputType.SELECT) {
      element.addEventListener('change', onSelectChange);

      return;
    }

    element.addEventListener('input', onInput);
    element.addEventListener('change', onTextChange);
    element.addEventListener('blur', onBlur);
  };

  const applyValueFromStore = (element: Element) => {
    const inputType = domUtils.getInputType(element);
    const inputName = element.attributes.getNamedItem('name')?.value ?? '';

    // if the value is not in the store then we should clear out the input to make sure it reflects the stored values
    const storedValue = get(data(), inputName) ?? '';

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

  const form = (element: HTMLFormElement) => {
    const inputElements = getAllInputElements(element);

    for (const inputElement of inputElements) {
      assignFormInputEventHandlers(inputElement);
      applyValueFromStore(inputElement);
    }

    setFormElement(element);

    element.addEventListener('submit', onSubmitForm);

    const domObserver = new MutationObserver(domMutationHandler);

    domObserver.observe(element, { childList: true, subtree: true });
  };

  const addArrayField = (name: keyof TFormData, value: Record<string, unknown> = {}) => {
    const previousValue = get(data(), name as string);

    setData((oldValue) => {
      const newValue = { ...oldValue };

      if (!newValue[name]) {
        // @ts-expect-error see comment at top of file
        newValue[name] = [];
      }

      // see comment at top of file as to why explicit casting is happening
      (newValue[name] as unknown[]).push(value);

      return newValue;
    });

    triggerValueChanged(name as string, get(data(), name as string), previousValue);
  };

  const removeArrayField = (name: keyof TFormData, removeIndex: number) => {
    const previousValue = get(data(), name as string);

    setData((oldValue) => {
      return {
        ...oldValue,
        // see comment at top of file as to why explicit casting is happening
        [name]: (oldValue[name] as unknown[]).filter((value, index) => removeIndex !== index),
      };
    });

    triggerValueChanged(name as string, get(data(), name as string), previousValue, { isTouched: true });
  };

  const setValue: FormSetValue<TFormData> = (name: keyof TFormData, value: unknown, options: SetValueOption = {}) => {
    const previousValue = get(data(), name as string);

    setData((oldValue) => {
      const newValue = { ...oldValue };

      newValue[name] = value as TFormData[keyof TFormData];

      return newValue;
    });

    triggerValueChanged(name as string, value, previousValue, { isTouched: options.markAsTouched ?? true });

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

  return {
    form,
    data,
    addArrayField,
    removeArrayField,
    setValue,
    errors,
    clear,
    reset,
    setSchema,
    isTouched,
    touchedFields,
    updateValidationErrors,
    isValid,
  };
};

export const formStoreUtils = {
  createForm,
};
