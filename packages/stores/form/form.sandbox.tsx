import { nanoid } from 'nanoid';
import nested from 'postcss-nested';
import { createEffect, createSignal, For, Match, Show, Switch, untrack, Index } from 'solid-js';
import * as zod from 'zod';
import { ZodType } from 'zod';

import AutoComplete, {
  AutoCompleteOption,
  autoCompleteUtils,
  AutoCompleteValueStore,
} from '$/components/auto-complete';
import Button from '$/components/button';
import Checkbox from '$/components/checkbox';
import DatePicker, {
  DateFormValue,
  DatePickerInputValueStore,
  datePickerUtils,
  WhichDate,
} from '$/components/date-picker';
import FormField from '$/components/form-field';
import Input from '$/components/input';
import Label from '$/components/label';
import Radio from '$/components/radio';
import SupportingText, { SupportingTextSentiment } from '$/components/supporting-text';
import Textarea from '$/components/textarea';
import TimeInput, { timeInputUtils } from '$/components/time-input';
import { formStoreUtils } from '$/stores/form';
import { FormInputValidationState } from '$/stores/form/utils';
import { CommonDataType } from '$/types/generic';
import { dynamicDataId } from '$/utils/component';
import { zodUtils } from '$/utils/zod';
import ExpandableCode from '$sandbox/components/expandable-code';

export default {
  title: 'Stores/Form',
};

interface DeepNestedStructure {
  partA: string;
  partB?: string;
  nested: NestStructure2[];
}

interface NestStructure2 {
  partA: string;
  partB?: string;
  partC?: string;
  partD?: string;
  partE?: string;
  partF?: string;
  partG?: string;
  partH?: string;
  partI?: string;
  partJ?: string;
}

interface NestStructure {
  partA: string;
  partB?: string;
}

interface SimpleFormData {
  title: string;
  title2?: string;
  textarea?: string;
}

const simpleFormDataSchema = zodUtils.schemaForType<SimpleFormData>()(
  zod.object({
    title: zod.string().min(1, 'Required'),
  }),
);

export const SetValue = () => {
  const { form, setValue } = formStoreUtils.createForm<SimpleFormData, zod.ZodRawShape>({
    onSubmit: () => {},
  });

  return (
    <div data-id="container">
      <form use:form>
        <FormField>
          <Label>Title</Label>
          <Input type="text" name="title" />
        </FormField>
        <div>
          <Button data-id="submit-button" type="submit">
            Submit
          </Button>
          <Button data-id="set-value-button" onClick={() => setValue('title', 'test')}>
            Set Value
          </Button>
        </div>
      </form>
    </div>
  );
};

export const UsingEffects = () => {
  const formStore = formStoreUtils.createForm<SimpleFormData, zod.ZodRawShape>({
    onSubmit: () => {},
  });
  const [randomValue, setRandomValue] = createSignal('starting random value');
  const form = formStore.form;

  createEffect(() => {
    const newValue = randomValue();
    // if you want to use form functionality that modifies internal form data, you probably want to wrap that in
    // untrack() as internal form data changes can cause the effect to go into an infinite loop
    console.log('should only happen when random value changes');

    // remove the untrack() to see what happens without it
    untrack(() => {
      formStore.setValue('title', newValue);
    });
  });

  return (
    <div data-id="container">
      <form use:form>
        <FormField>
          <Label>Title</Label>
          <Input type="text" name="title" />
        </FormField>
        <div>
          <Button data-id="submit-button" type="submit">
            Submit
          </Button>
          <Button data-id="reset-value-button" onClick={() => setRandomValue(nanoid(15))}>
            update random value
          </Button>
        </div>
      </form>
    </div>
  );
};

export const InitializeWithValues = () => {
  const { form, clear } = formStoreUtils.createForm<SimpleFormData, zod.ZodRawShape>({
    onSubmit: () => {},
    initialValues: {
      title: 'test',
      title2: 'test2',
    },
  });

  return (
    <div data-id="container">
      <form use:form>
        <FormField>
          <Label>Title</Label>
          <Input type="text" name="title" />
        </FormField>
        <FormField>
          <Label>Title2</Label>
          <Input type="text" name="title2" />
        </FormField>
        <div>
          <Button data-id="submit-button" type="submit">
            Submit
          </Button>
          <Button data-id="clear-button" onClick={() => clear()}>
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export const Clear = () => {
  const { form, clear } = formStoreUtils.createForm<SimpleFormData, zod.ZodRawShape>({
    onSubmit: () => {},
    initialValues: {
      title: 'test',
      title2: 'test2',
    },
  });

  return (
    <div data-id="container">
      <form use:form>
        <FormField>
          <Label>Title</Label>
          <Input type="text" name="title" />
        </FormField>
        <FormField>
          <Label>Title2</Label>
          <Input type="text" name="title2" />
        </FormField>
        <div>
          <Button data-id="submit-button" type="submit">
            Submit
          </Button>
          <Button data-id="clear-button" onClick={() => clear()}>
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export const ResetWithoutInitial = () => {
  const { form, reset } = formStoreUtils.createForm<SimpleFormData, zod.ZodRawShape>({
    onSubmit: () => {},
  });

  return (
    <div data-id="container">
      <form use:form>
        <FormField>
          <Label>Title</Label>
          <Input type="text" name="title" placeholder="placeholder" />
        </FormField>
        <FormField>
          <Label>Title2</Label>
          <Input type="text" name="title2" placeholder="placeholder" />
        </FormField>
        <FormField>
          <Label>Textarea</Label>
          <Textarea name="textarea" placeholder="placeholder" />
        </FormField>
        <div>
          <Button data-id="submit-button" type="submit">
            Submit
          </Button>
          <Button data-id="reset-button" onClick={() => reset()}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export const ResetWithInitial = () => {
  const { form, reset, clear } = formStoreUtils.createForm<SimpleFormData, zod.ZodRawShape>({
    onSubmit: () => {},
    initialValues: {
      title: 'test',
      title2: 'test2',
      textarea: 'test3',
    },
  });

  return (
    <div data-id="container">
      <form use:form>
        <FormField>
          <Label>Title</Label>
          <Input type="text" name="title" placeholder="placeholder" />
        </FormField>
        <FormField>
          <Label>Title2</Label>
          <Input type="text" name="title2" placeholder="placeholder" />
        </FormField>
        <FormField>
          <Label>Textarea</Label>
          <Textarea name="textarea" placeholder="placeholder" />
        </FormField>
        <div>
          <Button data-id="submit-button" type="submit">
            Submit
          </Button>
          <Button data-id="reset-button" onClick={() => reset()}>
            Reset
          </Button>
          <Button data-id="clear-button" onClick={() => clear()}>
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export const IsTouched = () => {
  const { form, reset, clear, isTouched } = formStoreUtils.createForm<SimpleFormData, zod.ZodRawShape>({
    onSubmit: () => {},
    initialValues: {
      title: 'test',
    },
  });

  return (
    <div data-id="container">
      <form use:form>
        <FormField>
          <Label>Title</Label>
          <Input type="text" name="title" />
        </FormField>
        <div>
          <Button data-id="submit-button" type="submit">
            Submit
          </Button>
          <Button data-id="clear-button" onClick={() => clear()}>
            Clear
          </Button>
          <Button data-id="reset-button" onClick={() => reset()}>
            Reset
          </Button>
        </div>
      </form>
      <Show when={isTouched('title')}>
        <div data-id="is-touched-indicator">title was touched</div>
      </Show>
    </div>
  );
};

export const Events = () => {
  const [submitTriggered, setSubmitTriggered] = createSignal(false);
  const [clearEventTriggered, setClearEventTriggered] = createSignal(false);
  const [resetEventTriggered, setResetEventTriggered] = createSignal(false);
  const [valueChangedEventTriggered, setValueChangedEventTriggered] = createSignal(false);
  const { form, reset, clear, errors, watch } = formStoreUtils.createForm<
    SimpleFormData,
    typeof simpleFormDataSchema.shape
  >({
    schema: simpleFormDataSchema,
    onSubmit: () => {
      setSubmitTriggered(true);
    },
    initialValues: {
      title: 'test',
    },
    onReset: () => {
      setResetEventTriggered(true);
    },
    onClear: () => {
      setClearEventTriggered(true);
    },
  });

  createEffect(() => {
    const watcher = watch((name, data) => {
      if (name !== 'title') {
        return;
      }

      setValueChangedEventTriggered(true);
    });

    return () => {
      watcher.unsubscribe();
    };
  });

  return (
    <div data-id="container">
      <form use:form>
        <FormField>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            validationState={errors().title?.errors ? FormInputValidationState.INVALID : FormInputValidationState.VALID}
          />
          <Show when={!!errors().title?.errors}>
            <SupportingText
              data-id={dynamicDataId.VALIDATION_MESSAGE}
              supportingText={errors().title?.errors}
              sentiment={SupportingTextSentiment.DANGER}
            />
          </Show>
        </FormField>
        <div>
          <Button data-id="submit-button" type="submit">
            Submit
          </Button>
          <Button data-id="reset-button" onClick={() => reset()}>
            Reset
          </Button>
          <Button data-id="clear-button" onClick={() => clear()}>
            Clear
          </Button>
        </div>
      </form>
      <Show when={valueChangedEventTriggered()}>
        <div data-id="value-changed-event-triggered-indicator">value changed event triggered</div>
      </Show>
      <Show when={clearEventTriggered()}>
        <div data-id="clear-event-triggered-indicator">clear event triggered</div>
      </Show>
      <Show when={resetEventTriggered()}>
        <div data-id="reset-event-triggered-indicator">reset event triggered</div>
      </Show>
      <Show when={submitTriggered()}>
        <div data-id="submit-event-triggered-indicator">submit event triggered</div>
      </Show>
    </div>
  );
};

export const ValidateOnChange = () => {
  const { form, reset, clear, errors } = formStoreUtils.createForm<SimpleFormData, typeof simpleFormDataSchema.shape>({
    schema: simpleFormDataSchema,
    onSubmit: () => {},
  });

  createEffect(() => {
    console.log(errors());
  });

  return (
    <div data-id="container">
      <form use:form>
        <FormField>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            validationState={errors().title?.errors ? FormInputValidationState.INVALID : FormInputValidationState.VALID}
          />
          <Show when={!!errors().title?.errors}>
            <SupportingText
              data-id={dynamicDataId.VALIDATION_MESSAGE}
              supportingText={errors().title?.errors}
              sentiment={SupportingTextSentiment.DANGER}
            />
          </Show>
        </FormField>
        <div>
          <Button data-id="submit-button" type="submit">
            Submit
          </Button>
          <Button data-id="reset-button" onClick={() => reset()}>
            Reset
          </Button>
          <Button data-id="clear-button" onClick={() => clear()}>
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export const NoValidateOnChange = () => {
  const { form, reset, clear, errors } = formStoreUtils.createForm<SimpleFormData, typeof simpleFormDataSchema.shape>({
    schema: simpleFormDataSchema,
    validateOnChange: false,
    onSubmit: () => {},
  });

  return (
    <div data-id="container">
      <form use:form>
        <FormField>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            validationState={errors().title?.errors ? FormInputValidationState.INVALID : FormInputValidationState.VALID}
          />
          <Show when={!!errors().title?.errors}>
            <SupportingText
              data-id={dynamicDataId.VALIDATION_MESSAGE}
              supportingText={errors().title?.errors}
              sentiment={SupportingTextSentiment.DANGER}
            />
          </Show>
        </FormField>
        <div>
          <Button data-id="submit-button" type="submit">
            Submit
          </Button>
          <Button data-id="reset-button" onClick={() => reset()}>
            Reset
          </Button>
          <Button data-id="clear-button" onClick={() => clear()}>
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

interface SimpleArrayFormData {
  array: NestStructure[];
}

const simpleArrayFormDataSchema = zodUtils.schemaForType<SimpleArrayFormData>()(
  zod.object({
    array: zod
      .object({
        partA: zod.string().min(1, 'Required'),
        partB: zod.string().optional(),
      })
      .array()
      .min(2, '2 Required'),
  }),
);

export const ArrayFields = () => {
  const { form, data, errors, addArrayField, removeArrayField, touchedFields } = formStoreUtils.createForm<
    SimpleArrayFormData,
    typeof simpleArrayFormDataSchema.shape
  >({
    onSubmit: () => {},
    schema: simpleArrayFormDataSchema,
  });

  createEffect(() => {
    console.log(errors());
  });

  return (
    <div data-id="container">
      <Button data-id="add-array-field-button" type="button" onclick={() => addArrayField('array', {})}>
        + Add Array Field
      </Button>
      <form use:form>
        <For each={data().array}>
          {(arrayField, index) => {
            const getArrayFieldError = () => errors().array?.[index()] ?? {};

            return (
              <div data-id="array-field-element">
                <FormField>
                  <Label>Part A</Label>
                  <Input
                    type="text"
                    name={`array.${index()}.partA`}
                    validationState={
                      getArrayFieldError().partA?.errors
                        ? FormInputValidationState.INVALID
                        : FormInputValidationState.VALID
                    }
                  />
                  <Show when={!!getArrayFieldError().partA?.errors}>
                    <SupportingText
                      data-id={dynamicDataId.VALIDATION_MESSAGE}
                      supportingText={getArrayFieldError().partA?.errors}
                      sentiment={SupportingTextSentiment.DANGER}
                    />
                  </Show>
                </FormField>
                <FormField>
                  <Label>Part B</Label>
                  <Input
                    type="text"
                    name={`array.${index()}.partB`}
                    validationState={
                      getArrayFieldError().partB?.errors
                        ? FormInputValidationState.INVALID
                        : FormInputValidationState.VALID
                    }
                  />
                  <Show when={!!getArrayFieldError().partB?.errors}>
                    <SupportingText
                      data-id={dynamicDataId.VALIDATION_MESSAGE}
                      supportingText={getArrayFieldError().partB?.errors}
                      sentiment={SupportingTextSentiment.DANGER}
                    />
                  </Show>
                </FormField>
                <Button
                  // @todo(!!!) make danger when implemented
                  data-id="remove-array-field-button"
                  onclick={() => removeArrayField('array', index())}
                >
                  REMOVE
                </Button>
              </div>
            );
          }}
        </For>
        <SupportingText
          data-id={dynamicDataId.VALIDATION_MESSAGE}
          supportingText={errors().array?.errors}
          sentiment={errors().array?.errors ? SupportingTextSentiment.DANGER : undefined}
        />
        <div>
          <Button data-id="submit-button" type="submit">
            Submit
          </Button>
        </div>
      </form>
      <hr />
      <h1>Debug Tools</h1>
      <ExpandableCode label="Errors">{JSON.stringify(errors(), null, 2)}</ExpandableCode>
      <ExpandableCode label="Touched Fields">{JSON.stringify(touchedFields(), null, 2)}</ExpandableCode>
    </div>
  );
};

interface NestedArrayFormData {
  array: DeepNestedStructure[];
  object: {
    test: string;
  };
}

const nestedArrayFormDataSchema = zodUtils.schemaForType<NestedArrayFormData>()(
  zod.object({
    array: zod
      .object({
        partA: zod.string().min(1, 'Required'),
        partB: zod.string().optional(),
        nested: zod
          .object({
            partA: zod.string().min(1, 'Required'),
            partB: zod.string().optional(),
          })
          .array()
          .min(1, '1 Required'),
      })
      .array()
      .min(2, '2 Required'),
    object: zod.object({
      test: zod.string().min(3, '3 Required'),
    }),
  }),
);

export const NestedArrayFields = () => {
  const { form, data, errors, addArrayField, removeArrayField, touchedFields } = formStoreUtils.createForm<
    NestedArrayFormData,
    typeof nestedArrayFormDataSchema.shape
  >({
    onSubmit: () => {},
    initialValues: { array: [{ partA: 'test', nested: [{ partA: 'test2' }] }] },
    schema: nestedArrayFormDataSchema,
  });

  return (
    <div data-id="container">
      <Button data-id="add-array-field-button" type="button" onclick={() => addArrayField('array', {})}>
        + Add Array Field
      </Button>
      <form use:form>
        <Index each={data().array}>
          {(arrayField, index) => {
            console.log('should only happen once');
            const getArrayFieldError = () => errors().array?.[index] ?? {};

            return (
              <div data-id="array-field-element">
                <FormField>
                  <Label>Part A</Label>
                  <Input
                    type="text"
                    name={`array.${index}.partA`}
                    validationState={
                      getArrayFieldError().partA?.errors
                        ? FormInputValidationState.INVALID
                        : FormInputValidationState.VALID
                    }
                  />
                  <Show when={!!getArrayFieldError().partA?.errors}>
                    <SupportingText
                      data-id={dynamicDataId.VALIDATION_MESSAGE}
                      supportingText={getArrayFieldError().partA?.errors}
                      sentiment={SupportingTextSentiment.DANGER}
                    />
                  </Show>
                </FormField>
                <FormField>
                  <Label>Part B</Label>
                  <Input
                    type="text"
                    name={`array.${index}.partB`}
                    validationState={
                      getArrayFieldError().partB?.errors
                        ? FormInputValidationState.INVALID
                        : FormInputValidationState.VALID
                    }
                  />
                  <Show when={!!getArrayFieldError().partB?.errors}>
                    <SupportingText
                      data-id={dynamicDataId.VALIDATION_MESSAGE}
                      supportingText={getArrayFieldError().partB?.errors}
                      sentiment={SupportingTextSentiment.DANGER}
                    />
                  </Show>
                </FormField>
                <FormField>
                  <Label>Nested</Label>
                  <Button
                    data-id="add-array-field-button"
                    type="button"
                    onclick={() => {
                      for (let i = 0; i < 50; i++) {
                        addArrayField(`array.${index}.nested`, {});
                      }
                    }}
                  >
                    + Add Array Field
                  </Button>
                  <Index each={arrayField().nested}>
                    {(arrayField2, index2) => {
                      const getArrayFieldError2 = () => errors().array?.[index]?.nested?.[index2] ?? {};

                      return (
                        <div data-id="array-field-element">
                          <FormField>
                            <Label>Part A</Label>
                            <Input
                              type="text"
                              name={`array.${index}.nested.${index2}.partA`}
                              validationState={
                                getArrayFieldError2().partA?.errors
                                  ? FormInputValidationState.INVALID
                                  : FormInputValidationState.VALID
                              }
                            />
                            <Show when={!!getArrayFieldError2().partA?.errors}>
                              <SupportingText
                                data-id={dynamicDataId.VALIDATION_MESSAGE}
                                supportingText={getArrayFieldError2().partA?.errors}
                                sentiment={SupportingTextSentiment.DANGER}
                              />
                            </Show>
                          </FormField>
                          <FormField>
                            <Label>Part B</Label>
                            <Input
                              type="text"
                              name={`array.${index}.nested.${index2}.partB`}
                              validationState={
                                getArrayFieldError2().partB?.errors
                                  ? FormInputValidationState.INVALID
                                  : FormInputValidationState.VALID
                              }
                            />
                            <Show when={!!getArrayFieldError2().partB?.errors}>
                              <SupportingText
                                data-id={dynamicDataId.VALIDATION_MESSAGE}
                                supportingText={getArrayFieldError2().partB?.errors}
                                sentiment={SupportingTextSentiment.DANGER}
                              />
                            </Show>
                          </FormField>
                          <FormField>
                            <Label>Part A</Label>
                            <Input
                              type="text"
                              name={`array.${index}.nested.${index2}.partC`}
                              validationState={
                                getArrayFieldError2().partC?.errors
                                  ? FormInputValidationState.INVALID
                                  : FormInputValidationState.VALID
                              }
                            />
                            <Show when={!!getArrayFieldError2().partC?.errors}>
                              <SupportingText
                                data-id={dynamicDataId.VALIDATION_MESSAGE}
                                supportingText={getArrayFieldError2().partC?.errors}
                                sentiment={SupportingTextSentiment.DANGER}
                              />
                            </Show>
                          </FormField>
                          <FormField>
                            <Label>Part A</Label>
                            <Input
                              type="text"
                              name={`array.${index}.nested.${index2}.partD`}
                              validationState={
                                getArrayFieldError2().partD?.errors
                                  ? FormInputValidationState.INVALID
                                  : FormInputValidationState.VALID
                              }
                            />
                            <Show when={!!getArrayFieldError2().partD?.errors}>
                              <SupportingText
                                data-id={dynamicDataId.VALIDATION_MESSAGE}
                                supportingText={getArrayFieldError2().partD?.errors}
                                sentiment={SupportingTextSentiment.DANGER}
                              />
                            </Show>
                          </FormField>
                          <FormField>
                            <Label>Part A</Label>
                            <Input
                              type="text"
                              name={`array.${index}.nested.${index2}.partE`}
                              validationState={
                                getArrayFieldError2().partE?.errors
                                  ? FormInputValidationState.INVALID
                                  : FormInputValidationState.VALID
                              }
                            />
                            <Show when={!!getArrayFieldError2().partE?.errors}>
                              <SupportingText
                                data-id={dynamicDataId.VALIDATION_MESSAGE}
                                supportingText={getArrayFieldError2().partE?.errors}
                                sentiment={SupportingTextSentiment.DANGER}
                              />
                            </Show>
                          </FormField>
                          <FormField>
                            <Label>Part A</Label>
                            <Input
                              type="text"
                              name={`array.${index}.nested.${index2}.partF`}
                              validationState={
                                getArrayFieldError2().partF?.errors
                                  ? FormInputValidationState.INVALID
                                  : FormInputValidationState.VALID
                              }
                            />
                            <Show when={!!getArrayFieldError2().partF?.errors}>
                              <SupportingText
                                data-id={dynamicDataId.VALIDATION_MESSAGE}
                                supportingText={getArrayFieldError2().partF?.errors}
                                sentiment={SupportingTextSentiment.DANGER}
                              />
                            </Show>
                          </FormField>
                          <FormField>
                            <Label>Part A</Label>
                            <Input
                              type="text"
                              name={`array.${index}.nested.${index2}.partG`}
                              validationState={
                                getArrayFieldError2().partG?.errors
                                  ? FormInputValidationState.INVALID
                                  : FormInputValidationState.VALID
                              }
                            />
                            <Show when={!!getArrayFieldError2().partG?.errors}>
                              <SupportingText
                                data-id={dynamicDataId.VALIDATION_MESSAGE}
                                supportingText={getArrayFieldError2().partG?.errors}
                                sentiment={SupportingTextSentiment.DANGER}
                              />
                            </Show>
                          </FormField>
                          <FormField>
                            <Label>Part A</Label>
                            <Input
                              type="text"
                              name={`array.${index}.nested.${index2}.partH`}
                              validationState={
                                getArrayFieldError2().partH?.errors
                                  ? FormInputValidationState.INVALID
                                  : FormInputValidationState.VALID
                              }
                            />
                            <Show when={!!getArrayFieldError2().partH?.errors}>
                              <SupportingText
                                data-id={dynamicDataId.VALIDATION_MESSAGE}
                                supportingText={getArrayFieldError2().partH?.errors}
                                sentiment={SupportingTextSentiment.DANGER}
                              />
                            </Show>
                          </FormField>
                          <FormField>
                            <Label>Part A</Label>
                            <Input
                              type="text"
                              name={`array.${index}.nested.${index2}.partI`}
                              validationState={
                                getArrayFieldError2().partI?.errors
                                  ? FormInputValidationState.INVALID
                                  : FormInputValidationState.VALID
                              }
                            />
                            <Show when={!!getArrayFieldError2().partI?.errors}>
                              <SupportingText
                                data-id={dynamicDataId.VALIDATION_MESSAGE}
                                supportingText={getArrayFieldError2().partI?.errors}
                                sentiment={SupportingTextSentiment.DANGER}
                              />
                            </Show>
                          </FormField>
                          <FormField>
                            <Label>Part A</Label>
                            <Input
                              type="text"
                              name={`array.${index}.nested.${index2}.partJ`}
                              validationState={
                                getArrayFieldError2().partJ?.errors
                                  ? FormInputValidationState.INVALID
                                  : FormInputValidationState.VALID
                              }
                            />
                            <Show when={!!getArrayFieldError2().partJ?.errors}>
                              <SupportingText
                                data-id={dynamicDataId.VALIDATION_MESSAGE}
                                supportingText={getArrayFieldError2().partJ?.errors}
                                sentiment={SupportingTextSentiment.DANGER}
                              />
                            </Show>
                          </FormField>
                          <Button
                            // @todo(!!!) make danger when implemented
                            data-id="remove-array-field-button"
                            onclick={() => removeArrayField(`array.${index}.nested`, index2)}
                          >
                            REMOVE
                          </Button>
                        </div>
                      );
                    }}
                  </Index>
                </FormField>
                <Button
                  // @todo(!!!) make danger when implemented
                  data-id="remove-array-field-button"
                  onclick={() => removeArrayField('array', index)}
                >
                  REMOVE
                </Button>
              </div>
            );
          }}
        </Index>
        <SupportingText
          data-id={dynamicDataId.VALIDATION_MESSAGE}
          supportingText={errors().array?.errors}
          sentiment={errors().array?.errors ? SupportingTextSentiment.DANGER : undefined}
        />
        <div>
          <Button data-id="submit-button" type="submit">
            Submit
          </Button>
        </div>
      </form>
      <hr />
      <h1>Debug Tools</h1>
      <ExpandableCode label="Data">{JSON.stringify(data(), null, 2)}</ExpandableCode>
      <ExpandableCode label="Errors">{JSON.stringify(errors(), null, 2)}</ExpandableCode>
      <ExpandableCode label="Touched Fields">{JSON.stringify(touchedFields(), null, 2)}</ExpandableCode>
    </div>
  );
};

interface DynamicFormData {
  title: string;
  [key: string]: CommonDataType;
}

const dynamicFormDataSchema = zodUtils.schemaForType<DynamicFormData>()(
  zod.object({
    title: zod.string().min(1, 'Required'),
  }),
);

enum RandomFormFieldType {
  STRING = 'string',
  NUMBER = 'number',
  CHECKBOX = 'checkbox',
  SINGLE_CHECKBOX = 'single-checkbox',
  AUTO_COMPLETE = 'auto-complete',
  RADIO = 'radio',
  CHECKBOX_TOGGLE = 'checkbox-toggle',
  SINGLE_RADIO = 'single-radio',
  TEXTAREA = 'textarea',
  DATE = 'date',
  DATE_RANGE = 'date-range',
  TIME_INPUT = 'time-input',
  ARRAY = 'array',
}

interface RandomFormField {
  name: string;
  type: RandomFormFieldType;
  validation: zod.ZodType;
}

const possibleRandomFields: RandomFormField[] = [
  {
    name: 'string',
    type: RandomFormFieldType.STRING,
    validation: zod.string().min(1, 'Required'),
  },
  {
    name: 'number',
    type: RandomFormFieldType.NUMBER,
    validation: zod.coerce.number().min(10, 'Required'),
  },
  {
    name: 'checkbox',
    type: RandomFormFieldType.CHECKBOX,
    validation: zod.string().array().min(1, 'Required'),
  },
  {
    name: 'single-checkbox',
    type: RandomFormFieldType.SINGLE_CHECKBOX,
    validation: zod.string().array().min(1, 'Required'),
  },
  {
    name: 'checkbox-toggle',
    type: RandomFormFieldType.CHECKBOX_TOGGLE,
    validation: zod.string().array().min(1, 'Required'),
  },
  {
    name: 'autocomplete',
    type: RandomFormFieldType.AUTO_COMPLETE,
    validation: zod.number().array().min(1, 'must select at least 1 value'),
  },
  {
    name: 'radio',
    type: RandomFormFieldType.RADIO,
    validation: zod.string().min(1, 'Required'),
  },
  {
    name: 'single-radio',
    type: RandomFormFieldType.SINGLE_RADIO,
    validation: zod.string().min(1, 'Required'),
  },
  {
    name: 'textarea',
    type: RandomFormFieldType.TEXTAREA,
    validation: zod.string().min(1, 'Required'),
  },
  {
    name: 'date',
    type: RandomFormFieldType.DATE,
    // @todo(!!!) date specific validation
    validation: zod.custom((value) => datePickerUtils.isValidDate(value as DateFormValue), {
      message: 'must select a date',
    }),
  },
  {
    name: 'date-range',
    type: RandomFormFieldType.DATE_RANGE,
    // @todo(!!!) date specific validation
    validation: zod.custom((value) => datePickerUtils.isValidDateRange(value as DateFormValue), {
      message: 'must select a date',
    }),
  },
  {
    name: 'time-input',
    type: RandomFormFieldType.TIME_INPUT,
    // @todo(!!!) date specific validation
    validation: zod.custom((value) => timeInputUtils.isValidTime(value as string), {
      message: 'must select a time',
    }),
  },
  {
    name: 'array',
    type: RandomFormFieldType.ARRAY,
    validation: zod
      .object({
        partA: zod.string().min(1, 'Required'),
        partB: zod.string().optional(),
      })
      .array()
      .min(2, '2 Required'),
  },
];

const checkedValue1 = 'checked1';
const checkedValue2 = 'checked2';
const checkedValue3 = 'checked3';
const radioValueYes = 'yes';
const radioValueNo = 'no';
const radioValueMaybe = 'maybe';

export const DynamicFormElements = () => {
  const formStore = formStoreUtils.createForm<DynamicFormData, typeof dynamicFormDataSchema.shape>({
    schema: dynamicFormDataSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [addDefaultValue, setAddDefaultValue] = createSignal(true);
  const [autoCompleteValues, setAutoCompleteValues] = createSignal<Record<string, AutoCompleteValueStore>>({});
  const [datePickerValues, setDatePickerValues] = createSignal<Record<string, DatePickerInputValueStore>>();
  const [randomInputs, setRandomInputs] = createSignal<RandomFormField[]>([]);

  const addRandomField = (randomField: RandomFormField) => {
    const randomFieldName = `${randomField.name}${randomInputs().length + 1}`;
    const currentAddDefaultValue = addDefaultValue();

    if (randomField.type === RandomFormFieldType.AUTO_COMPLETE) {
      setAutoCompleteValues({
        ...autoCompleteValues(),
        [randomFieldName]: autoCompleteUtils.createAutoCompleteValue(),
      });
    }

    if (randomField.type === RandomFormFieldType.DATE || randomField.type === RandomFormFieldType.DATE_RANGE) {
      setDatePickerValues({
        ...datePickerValues(),
        [randomFieldName]: datePickerUtils.createDatePickerInputValue(),
      });
    }

    if (currentAddDefaultValue) {
      if (randomField.type === RandomFormFieldType.CHECKBOX_TOGGLE) {
        formStore.setValue(randomFieldName, [checkedValue1]);
      }

      if (randomField.type === RandomFormFieldType.RADIO) {
        formStore.setValue(randomFieldName, radioValueMaybe);
      }
    }

    setRandomInputs([
      ...randomInputs(),
      {
        ...randomField,
        name: randomFieldName,
      },
    ]);
  };

  createEffect(() => {
    const customZodElements: Record<string, ZodType> = {};

    randomInputs().forEach((input) => {
      customZodElements[input.name] = input.validation;
    });

    formStore.setSchema(
      zodUtils.schemaForType<DynamicFormData>()(
        zod.object({
          title: zod.string().min(1, 'Required'),
          ...customZodElements,
        }),
      ),
    );
  });

  const form = formStore.form;

  return (
    <div data-id="container">
      {/*<div>validation state separate from validation messages: {JSON.stringify(formStore.isValid())}</div>*/}
      <Checkbox
        labelElement="add default value"
        name="addDefaultValue"
        value="yes"
        checked={addDefaultValue()}
        onClick={(event) => setAddDefaultValue((event.target as HTMLInputElement).checked)}
      />{' '}
      <For each={possibleRandomFields}>
        {(randomField) => {
          return (
            <Button data-id={`add-${randomField.type}-field`} onClick={() => addRandomField(randomField)}>
              Add {randomField.name} Field
            </Button>
          );
        }}
      </For>
      <form use:form>
        <FormField>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            validationState={
              formStore.errors().title?.errors ? FormInputValidationState.INVALID : FormInputValidationState.VALID
            }
          />
          <Show when={!!formStore.errors().title?.errors}>
            <SupportingText
              data-id={dynamicDataId.VALIDATION_MESSAGE}
              supportingText={formStore.errors().title?.errors}
              sentiment={SupportingTextSentiment.DANGER}
            />
          </Show>
        </FormField>
        <Show when={randomInputs().length > 0}>
          <For each={randomInputs()}>
            {(input) => {
              const getValidationState = () =>
                formStore.errors()[input.name]?.errors
                  ? FormInputValidationState.INVALID
                  : FormInputValidationState.VALID;

              return (
                <FormField data-id={input.type}>
                  <Label>{input.name}</Label>
                  <Switch>
                    <Match when={input.type === RandomFormFieldType.STRING}>
                      <Input
                        type="text"
                        name={input.name}
                        validationState={getValidationState()}
                        placeholder="placeholder"
                      />
                    </Match>
                    <Match when={input.type === RandomFormFieldType.NUMBER}>
                      <Input
                        type="number"
                        name={input.name}
                        validationState={getValidationState()}
                        placeholder="placeholder"
                      />
                    </Match>
                    <Match when={input.type === RandomFormFieldType.CHECKBOX}>
                      <Checkbox.Group validationState={getValidationState()}>
                        <Checkbox labelElement="checked 1" name={input.name} value={checkedValue1} />
                        <Checkbox labelElement="checked 2" name={input.name} value={checkedValue2} />
                        <Checkbox labelElement="checked 3" name={input.name} value={checkedValue3} />
                      </Checkbox.Group>
                    </Match>
                    <Match when={input.type === RandomFormFieldType.SINGLE_CHECKBOX}>
                      <Checkbox
                        labelElement="checked 1"
                        name={input.name}
                        value={checkedValue1}
                        validationState={getValidationState()}
                      />
                    </Match>
                    <Match when={input.type === RandomFormFieldType.CHECKBOX_TOGGLE}>
                      <Checkbox.Toggle
                        labelElement="yes"
                        name={input.name}
                        value={checkedValue1}
                        validationState={getValidationState()}
                      />
                    </Match>
                    <Match when={input.type === RandomFormFieldType.RADIO}>
                      <Radio.Group validationState={getValidationState()}>
                        <Radio labelElement="yes" name={input.name} value={radioValueYes} />
                        <Radio labelElement="no" name={input.name} value={radioValueNo} />
                        <Radio labelElement="maybe" name={input.name} value={radioValueMaybe} />
                      </Radio.Group>
                    </Match>
                    <Match when={input.type === RandomFormFieldType.SINGLE_RADIO}>
                      <Radio
                        labelElement="yes"
                        name={input.name}
                        value={radioValueYes}
                        validationState={getValidationState()}
                      />
                    </Match>
                    <Match when={input.type === RandomFormFieldType.TEXTAREA}>
                      <Textarea name={input.name} validationState={getValidationState()} placeholder="placeholder" />
                    </Match>
                    <Match when={input.type === RandomFormFieldType.DATE}>
                      <DatePicker.Input
                        includeTime
                        name={input.name}
                        validationState={getValidationState()}
                        placeholder="placeholder"
                        onSelectDate={(date?: Date, which?: WhichDate) => {
                          datePickerValues()?.[input.name]?.setDate(date, which);

                          formStore.setValue(input.name, datePickerValues()?.[input.name]?.getFormValue());
                        }}
                      />
                    </Match>
                    <Match when={input.type === RandomFormFieldType.DATE_RANGE}>
                      <DatePicker.Input
                        isRange
                        name={input.name}
                        validationState={getValidationState()}
                        placeholder="placeholder"
                        onSelectDate={(date?: Date, which?: WhichDate) => {
                          datePickerValues()?.[input.name]?.setDate(date, which);

                          // we don't want to mark as touched in the case and setting 1 date in the range would
                          // always result in a validation error
                          formStore.setValue(input.name, datePickerValues()?.[input.name]?.getFormValue(), {
                            markAsTouched: false,
                          });
                        }}
                      />
                    </Match>
                    <Match when={input.type === RandomFormFieldType.TIME_INPUT}>
                      <TimeInput name={input.name} validationState={getValidationState()} />
                    </Match>
                    <Match when={input.type === RandomFormFieldType.ARRAY}>
                      <For each={formStore.data()[input.name] as NestStructure[]}>
                        {(arrayField, index) => {
                          const getArrayFieldErrors = () => formStore.errors()[input.name]?.[index()] ?? {};

                          return (
                            <div data-id="array-field-element">
                              <FormField>
                                <Label>Part A</Label>
                                <Input
                                  type="text"
                                  name={`${input.name}.${index()}.partA`}
                                  placeholder="placeholder"
                                  validationState={
                                    getArrayFieldErrors().partA?.errors
                                      ? FormInputValidationState.INVALID
                                      : FormInputValidationState.VALID
                                  }
                                />
                                <Show when={!!getArrayFieldErrors().partA?.errors}>
                                  <SupportingText
                                    data-id={dynamicDataId.VALIDATION_MESSAGE}
                                    supportingText={getArrayFieldErrors().partA?.errors}
                                    sentiment={SupportingTextSentiment.DANGER}
                                  />
                                </Show>
                              </FormField>
                              <FormField>
                                <Label>Part B</Label>
                                <Input
                                  type="text"
                                  name={`${input.name}.${index()}.partB`}
                                  placeholder="placeholder"
                                  validationState={
                                    getArrayFieldErrors().partB?.errors
                                      ? FormInputValidationState.INVALID
                                      : FormInputValidationState.VALID
                                  }
                                />
                                <Show when={!!getArrayFieldErrors().partB?.errors}>
                                  <SupportingText
                                    data-id={dynamicDataId.VALIDATION_MESSAGE}
                                    supportingText={getArrayFieldErrors().partB?.errors}
                                    sentiment={SupportingTextSentiment.DANGER}
                                  />
                                </Show>
                              </FormField>
                              <Button
                                data-id="remove-array-field-button"
                                // @todo(!!!) make danger when implemented
                                onclick={() => formStore.removeArrayField(input.name, index())}
                              >
                                REMOVE
                              </Button>
                            </div>
                          );
                        }}
                      </For>
                      <Button
                        data-id="add-array-field-button"
                        type="button"
                        onclick={() => formStore.addArrayField(input.name, {})}
                      >
                        + Add Array Field
                      </Button>
                    </Match>
                    <Match when={input.type === RandomFormFieldType.AUTO_COMPLETE}>
                      <AutoComplete
                        autoShowOptions
                        options={[
                          { display: 'option 1', value: 11 },
                          { display: 'option 2', value: 22 },
                          { display: 'option 3', value: 33 },
                          { display: 'option 4', value: 44 },
                        ]}
                        filterOptions={autoCompleteUtils.excludeSelectedFilter}
                        setSelected={(options: AutoCompleteOption[]) => {
                          // cast needed since auto complete values can be a number of types
                          const value = options.map((option) => option.value) as number[];

                          formStore.setValue(input.name, value);
                          autoCompleteValues()[input.name].setSelected(options);
                        }}
                        selected={autoCompleteValues()[input.name].selected()}
                        name={input.name}
                        selectedComponent={AutoComplete.SelectedOption}
                        selectableComponent={AutoComplete.SelectableOption}
                        validationState={getValidationState()}
                        placeholder="placeholder"
                      />
                    </Match>
                  </Switch>
                  <SupportingText
                    data-id={dynamicDataId.VALIDATION_MESSAGE}
                    supportingText={formStore.errors()[input.name]?.errors}
                    sentiment={formStore.errors()[input.name]?.errors ? SupportingTextSentiment.DANGER : undefined}
                  />
                </FormField>
              );
            }}
          </For>
        </Show>
        <Button data-id="submit-button" type="submit">
          Submit
        </Button>
      </form>
      <hr />
      <h1>Debug Tools</h1>
      <ExpandableCode label="Errors">{JSON.stringify(formStore.errors(), null, 2)}</ExpandableCode>
      <ExpandableCode label="Touched Fields">{JSON.stringify(formStore.touchedFields(), null, 2)}</ExpandableCode>
    </div>
  );
};
