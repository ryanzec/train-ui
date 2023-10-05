import FormField from '$/components/form-field';
import Icon from '$/components/icon';
import Input from '$/components/input';
import Label from '$/components/label';
import SupportingText, { SupportingTextSentiment } from '$/components/supporting-text';
import { FormInputValidationState } from '$/stores/form';

export default {
  title: 'Components/Input',
};

export const Default = () => {
  return (
    <>
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
        <Input id="test3" placeholder="Just a placeholder" preItem={<Icon icon="add" />} />
      </FormField>
      <FormField>
        <Label for="test4">Label</Label>
        <Input id="test4" preItem={<Icon icon="add" />} />
      </FormField>
      <FormField>
        <Label for="test5">Post Item</Label>
        <Input id="test5" placeholder="Just a placeholder" postItem={<Icon icon="add" />} />
      </FormField>
      <FormField>
        <Label for="test6">Clickable Post Item</Label>
        <Input
          id="test6"
          placeholder="Just a placeholder"
          postItem={<Icon icon="add" onClick={() => console.log('test')} />}
          postItemIsClickable
        />
      </FormField>
      <FormField>
        <Label for="test7">Post + Post Item</Label>
        <Input
          id="test7"
          placeholder="Just a placeholder"
          postItem={<Icon icon="add" />}
          preItem={<Icon icon="add" />}
        />
      </FormField>
      <FormField>
        <Label for="test8">Invalid</Label>
        <Input id="test8" placeholder="Just a placeholder" validationState={FormInputValidationState.INVALID} />
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
      <FormField>
        <Label for="test11">Invalid</Label>
        <Input id="test11" placeholder="Just a placeholder" validationState={FormInputValidationState.INVALID} />
        <SupportingText supportingText={['supporting text']} sentiment={SupportingTextSentiment.DANGER} />
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
    </>
  );
};
