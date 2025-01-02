import Button from '$/components/button';
import Callout, { CalloutColor, CalloutVariant } from '$/components/callout';
import Icon from '$/components/icon';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/Callout',
};

export const Variant = () => {
  return (
    <div>
      <h2>Weak</h2>
      <SandboxExamplesContainer>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.NEUTRAL}>
          Primary
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.BRAND}>
          Primary
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.SUCCESS}>
          Success
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.INFO}>
          Info
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.WARNING}>
          Warning
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.DANGER}>
          Danger
        </Callout>
      </SandboxExamplesContainer>
      <h2>Strong</h2>
      <SandboxExamplesContainer>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.NEUTRAL}>
          Primary
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.BRAND}>
          Primary
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.SUCCESS}>
          Success
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.INFO}>
          Info
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.WARNING}>
          Warning
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.DANGER}>
          Danger
        </Callout>
      </SandboxExamplesContainer>
    </div>
  );
};

export const PrePostItems = () => {
  return (
    <div>
      <h2>Pre</h2>
      <SandboxExamplesContainer>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.NEUTRAL} preItem={<Icon icon="check" />}>
          Primary
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.BRAND} preItem={<Button>Button</Button>}>
          Primary
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.SUCCESS} preItem={<Icon icon="check" />}>
          Success
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.INFO} preItem={<Icon icon="check" />}>
          Info
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.WARNING} preItem={<Icon icon="check" />}>
          Warning
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.DANGER} preItem={<Icon icon="check" />}>
          Danger
        </Callout>
      </SandboxExamplesContainer>
      <h2>Post</h2>
      <SandboxExamplesContainer>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.NEUTRAL} postItem={<Icon icon="check" />}>
          Primary
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.BRAND} postItem={<Button>Button</Button>}>
          Primary
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.SUCCESS} postItem={<Icon icon="check" />}>
          Success
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.INFO} postItem={<Icon icon="check" />}>
          Info
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.WARNING} postItem={<Icon icon="check" />}>
          Warning
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.DANGER} postItem={<Icon icon="check" />}>
          Danger
        </Callout>
      </SandboxExamplesContainer>
      <h2>Both</h2>
      <SandboxExamplesContainer>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.NEUTRAL}
          preItem={<Icon icon="check" />}
          postItem={<Icon icon="check" />}
        >
          Primary
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.BRAND}
          preItem={<Button>Button</Button>}
          postItem={<Button>Button</Button>}
        >
          Primary
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.SUCCESS}
          preItem={<Icon icon="check" />}
          postItem={<Icon icon="check" />}
        >
          Success
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.INFO}
          preItem={<Icon icon="check" />}
          postItem={<Icon icon="check" />}
        >
          Info
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.WARNING}
          preItem={<Icon icon="check" />}
          postItem={<Icon icon="check" />}
        >
          Warning
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.DANGER}
          preItem={<Icon icon="check" />}
          postItem={<Icon icon="check" />}
        >
          Danger
        </Callout>
      </SandboxExamplesContainer>
    </div>
  );
};
