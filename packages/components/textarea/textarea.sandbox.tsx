import FormField from '$/components/form-field';
import Label from '$/components/label';
import SupportingText, { SupportingTextColor } from '$/components/supporting-text';
import Textarea from '$/components/textarea';

export default {
  title: 'Components/Textarea',
};

export const Default = () => {
  return (
    <>
      <FormField>
        <Label for="test1">Placeholder</Label>
        <Textarea id="test1" placeholder="Placeholder value" />
      </FormField>
      <FormField>
        <Label for="test2">Value</Label>
        <Textarea id="test2">Some value</Textarea>
      </FormField>
      <FormField>
        <Label for="test3">Error</Label>
        <Textarea id="test3" placeholder="Placeholder value" />
        <SupportingText supportingText={['supporting text']} color={SupportingTextColor.DANGER} />
      </FormField>
      <FormField>
        <Label for="test4">Disabled</Label>
        <Textarea id="test4" disabled>
          Disabled value
        </Textarea>
      </FormField>
      <FormField>
        <Label for="test5">Readonly</Label>
        <Textarea id="test5" readonly>
          Readonly value
        </Textarea>
      </FormField>
    </>
  );
};
