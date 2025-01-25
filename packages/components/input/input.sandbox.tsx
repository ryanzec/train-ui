import Button from '$/components/button';
import FormField from '$/components/form-field';
import FormFields from '$/components/form-fields/form-fields';
import Icon from '$/components/icon';
import Input from '$/components/input';
import Label from '$/components/label';
import Peek, { peekComponentUtils } from '$/components/peek';
import SupportingText, { SupportingTextColor } from '$/components/supporting-text';
import { formStoreUtils } from '$/stores/form.store';

export default {
  title: 'Components/Input',
};

export const Default = () => {
  return (
    <FormFields>
      <FormField>
        <Label for="test1">Label</Label>
        <Input id="test1" />
      </FormField>
      <FormField>
        <Label for="test2">Label</Label>
        <Input id="test2" placeholder="Just a placeholder" />
      </FormField>
      <FormField>
        <Label for="test3">Pre Item</Label>
        <Input id="test3" placeholder="Just a placeholder" preItem={<Icon icon="plus" />} />
      </FormField>
      <FormField>
        <Label for="test4">Label</Label>
        <Input id="test4" preItem={<Icon icon="plus" />} />
      </FormField>
      <FormField>
        <Label for="test5">Post Item</Label>
        <Input id="test5" placeholder="Just a placeholder" postItem={<Icon icon="plus" />} />
      </FormField>
      <FormField>
        <Label for="test6">Clickable Post Item</Label>
        <Input
          id="test6"
          placeholder="Just a placeholder"
          postItem={<Icon icon="plus" onClick={() => console.log('test')} />}
          postItemIsClickable
        />
      </FormField>
      <FormField>
        <Label for="test7">Post + Post Item</Label>
        <Input
          id="test7"
          placeholder="Just a placeholder"
          postItem={<Icon icon="plus" />}
          preItem={<Icon icon="plus" />}
        />
      </FormField>
      <FormField errors={['this is an error']}>
        <Label for="test8">Invalid</Label>
        <Input id="test8" placeholder="Just a placeholder" />
      </FormField>
      <FormField>
        <Label for="test9">Disabled</Label>
        <Input id="test9" placeholder="Just a placeholder" disabled />
      </FormField>
      <FormField>
        <Label for="test10">Label</Label>
        <Input id="test10" placeholder="Just a placeholder" />
        <SupportingText supportingText={['supporting text']} />
      </FormField>
      <FormField errors={['this is an error']}>
        <Label for="test11">Invalid</Label>
        <Input id="test11" placeholder="Just a placeholder" />
        <SupportingText supportingText={['supporting text']} color={SupportingTextColor.NEUTRAL} />
      </FormField>
      <FormField>
        <Label for="test12">Disabled</Label>
        <Input id="test12" placeholder="Just a placeholder" disabled />
        <SupportingText supportingText={['supporting text']} />
      </FormField>
      <FormField>
        <Label for="test13">Pre Item Inline</Label>
        <Input id="test13" placeholder="Just a placeholder" preItem="$" preItemIsInline />
      </FormField>
      <FormField>
        <Label for="test14">Readonly</Label>
        <Input id="test14" placeholder="Just a placeholder" preItem="$" preItemIsInline readonly />
      </FormField>
      <FormField>
        <Label for="test15">Readonly (with normal display)</Label>
        <Input
          id="test15"
          placeholder="Just a placeholder"
          preItem="$"
          preItemIsInline
          readonly
          includeReadonlyStyles={false}
        />
      </FormField>
    </FormFields>
  );
};

export const AutoFocus = () => {
  const peekStore = peekComponentUtils.createStore();

  return (
    <>
      <FormField>
        <Input autofocus />
      </FormField>
      <Button onClick={() => peekStore.setIsOpened(true)}>open peek</Button>
      <Peek peekStore={peekStore}>
        <Peek.Header title="Peek Header" />
        <Peek.Content>
          <FormField>
            <Input autofocus />
          </FormField>
        </Peek.Content>
        <Peek.Footer>
          <Button.Group>
            <Peek.CloseButton />
            <Button>Process</Button>
          </Button.Group>
        </Peek.Footer>
      </Peek>
    </>
  );
};

export const SelectAll = () => {
  return (
    <>
      <FormField>
        <Input value="test" selectAllOnFocus />
      </FormField>
    </>
  );
};

// not exported as this is only for testing and would be caught in a `pnpm build:check`
const NameTypingTest = () => {
  const formStore = formStoreUtils.createStore<{ input: string }>({
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <FormField>
      {/* @ts-expect-error should error since it is not part of the form data, intended to test this functionality */}
      <Input name="inpu" value="1" formData={formStore.data} />
    </FormField>
  );
};
