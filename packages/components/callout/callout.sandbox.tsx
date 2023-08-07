import Callout, { CalloutSentiment, CalloutStrength } from '$/components/callout';

export default {
  title: 'Components/Callout',
};

export const Strength = () => {
  return (
    <div>
      <h2>Weak</h2>
      <div>
        <Callout strength={CalloutStrength.WEAK} sentiment={CalloutSentiment.NEUTRAL}>
          Primary
        </Callout>
        <Callout strength={CalloutStrength.WEAK} sentiment={CalloutSentiment.BRAND}>
          Primary
        </Callout>
        <Callout strength={CalloutStrength.WEAK} sentiment={CalloutSentiment.SUCCESS}>
          Success
        </Callout>
        <Callout strength={CalloutStrength.WEAK} sentiment={CalloutSentiment.INFO}>
          Info
        </Callout>
        <Callout strength={CalloutStrength.WEAK} sentiment={CalloutSentiment.WARNING}>
          Warning
        </Callout>
        <Callout strength={CalloutStrength.WEAK} sentiment={CalloutSentiment.DANGER}>
          Danger
        </Callout>
      </div>
      <h2>Strong</h2>
      <div>
        <Callout strength={CalloutStrength.STRONG} sentiment={CalloutSentiment.NEUTRAL}>
          Primary
        </Callout>
        <Callout strength={CalloutStrength.STRONG} sentiment={CalloutSentiment.BRAND}>
          Primary
        </Callout>
        <Callout strength={CalloutStrength.STRONG} sentiment={CalloutSentiment.SUCCESS}>
          Success
        </Callout>
        <Callout strength={CalloutStrength.STRONG} sentiment={CalloutSentiment.INFO}>
          Info
        </Callout>
        <Callout strength={CalloutStrength.STRONG} sentiment={CalloutSentiment.WARNING}>
          Warning
        </Callout>
        <Callout strength={CalloutStrength.STRONG} sentiment={CalloutSentiment.DANGER}>
          Danger
        </Callout>
      </div>
    </div>
  );
};
