import Button from '$/components/button';
import Label from '$/components/label';

export default {
  title: 'Components/Label',
};

export const Default = () => {
  return (
    <>
      <div>
        <Label>Default Label</Label>
      </div>
      <div>
        <Label isLoading>Loading</Label>
      </div>
      <div style={{ width: '500px' }}>
        <Label postItem={<Button>Button</Button>}>With Post Item</Label>
      </div>
    </>
  );
};
