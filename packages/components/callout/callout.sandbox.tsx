import Button from '$/components/button';
import Callout, { CalloutSentiment, CalloutStrength } from '$/components/callout';
import calloutStyles from '$/components/callout/callout.module.css';
import Icon from '$/components/icon';

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

export const PrePostItems = () => {
  return (
    <div>
      <h2>Pre</h2>
      <div>
        <Callout strength={CalloutStrength.WEAK} sentiment={CalloutSentiment.NEUTRAL} preItem={<Icon icon="check" />}>
          Primary
        </Callout>
        <Callout strength={CalloutStrength.WEAK} sentiment={CalloutSentiment.BRAND} preItem={<Button>Button</Button>}>
          Primary
        </Callout>
        <Callout strength={CalloutStrength.WEAK} sentiment={CalloutSentiment.SUCCESS} preItem={<Icon icon="check" />}>
          Success
        </Callout>
        <Callout strength={CalloutStrength.WEAK} sentiment={CalloutSentiment.INFO} preItem={<Icon icon="check" />}>
          Info
        </Callout>
        <Callout strength={CalloutStrength.WEAK} sentiment={CalloutSentiment.WARNING} preItem={<Icon icon="check" />}>
          Warning
        </Callout>
        <Callout strength={CalloutStrength.WEAK} sentiment={CalloutSentiment.DANGER} preItem={<Icon icon="check" />}>
          Danger
        </Callout>
      </div>
      <h2>Post</h2>
      <div>
        <Callout
          strength={CalloutStrength.STRONG}
          sentiment={CalloutSentiment.NEUTRAL}
          postItem={<Icon icon="check" />}
        >
          Primary
        </Callout>
        <Callout
          strength={CalloutStrength.STRONG}
          sentiment={CalloutSentiment.BRAND}
          postItem={<Button>Button</Button>}
        >
          Primary
        </Callout>
        <Callout
          strength={CalloutStrength.STRONG}
          sentiment={CalloutSentiment.SUCCESS}
          postItem={<Icon icon="check" />}
        >
          Success
        </Callout>
        <Callout strength={CalloutStrength.STRONG} sentiment={CalloutSentiment.INFO} postItem={<Icon icon="check" />}>
          Info
        </Callout>
        <Callout
          strength={CalloutStrength.STRONG}
          sentiment={CalloutSentiment.WARNING}
          postItem={<Icon icon="check" />}
        >
          Warning
        </Callout>
        <Callout strength={CalloutStrength.STRONG} sentiment={CalloutSentiment.DANGER} postItem={<Icon icon="check" />}>
          Danger
        </Callout>
      </div>
      <h2>Both</h2>
      <div>
        <Callout
          strength={CalloutStrength.STRONG}
          sentiment={CalloutSentiment.NEUTRAL}
          preItem={<Icon icon="check" />}
          postItem={<Icon icon="check" />}
        >
          Primary
        </Callout>
        <Callout
          strength={CalloutStrength.STRONG}
          sentiment={CalloutSentiment.BRAND}
          preItem={<Button>Button</Button>}
          postItem={<Button>Button</Button>}
        >
          Primary
        </Callout>
        <Callout
          strength={CalloutStrength.STRONG}
          sentiment={CalloutSentiment.SUCCESS}
          preItem={<Icon icon="check" />}
          postItem={<Icon icon="check" />}
        >
          Success
        </Callout>
        <Callout
          strength={CalloutStrength.STRONG}
          sentiment={CalloutSentiment.INFO}
          preItem={<Icon icon="check" />}
          postItem={<Icon icon="check" />}
        >
          Info
        </Callout>
        <Callout
          strength={CalloutStrength.STRONG}
          sentiment={CalloutSentiment.WARNING}
          preItem={<Icon icon="check" />}
          postItem={<Icon icon="check" />}
        >
          Warning
        </Callout>
        <Callout
          strength={CalloutStrength.STRONG}
          sentiment={CalloutSentiment.DANGER}
          preItem={<Icon icon="check" />}
          postItem={<Icon icon="check" />}
        >
          Danger
        </Callout>
      </div>
    </div>
  );
};
