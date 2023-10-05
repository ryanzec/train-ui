import SupportingText, { SupportingTextSentiment } from '$/components/supporting-text';

export default {
  title: 'Components/SupportingText',
};

export const Default = () => {
  return (
    <>
      <SupportingText>Default supporting text</SupportingText>
      <SupportingText sentiment={SupportingTextSentiment.NEUTRAL}>Neutral supporting text</SupportingText>
      <SupportingText sentiment={SupportingTextSentiment.DANGER}>Danger supporting text</SupportingText>
    </>
  );
};
