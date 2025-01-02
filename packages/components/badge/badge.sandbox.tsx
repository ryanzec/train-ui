import Badge, { BadgeSentiment, BadgeSize, BadgeStrength } from '$/components/badge';
import { BadgeShape } from '$/components/badge/utils';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/Badge',
};

export const Strength = () => {
  return (
    <div>
      <h2>Weak</h2>
      <SandboxExamplesContainer asRow>
        <Badge strength={BadgeStrength.WEAK} sentiment={BadgeSentiment.NEUTRAL}>
          Neutral
        </Badge>
        <Badge strength={BadgeStrength.WEAK} sentiment={BadgeSentiment.BRAND}>
          Brand
        </Badge>
        <Badge strength={BadgeStrength.WEAK} sentiment={BadgeSentiment.SUCCESS}>
          Success
        </Badge>
        <Badge strength={BadgeStrength.WEAK} sentiment={BadgeSentiment.INFO}>
          Info
        </Badge>
        <Badge strength={BadgeStrength.WEAK} sentiment={BadgeSentiment.WARNING}>
          Warning
        </Badge>
        <Badge strength={BadgeStrength.WEAK} sentiment={BadgeSentiment.DANGER}>
          Danger
        </Badge>
      </SandboxExamplesContainer>
      <h2>Strong</h2>
      <SandboxExamplesContainer asRow>
        <Badge strength={BadgeStrength.STRONG} sentiment={BadgeSentiment.NEUTRAL}>
          Neutral
        </Badge>
        <Badge strength={BadgeStrength.STRONG} sentiment={BadgeSentiment.BRAND}>
          Brand
        </Badge>
        <Badge strength={BadgeStrength.STRONG} sentiment={BadgeSentiment.SUCCESS}>
          Success
        </Badge>
        <Badge strength={BadgeStrength.STRONG} sentiment={BadgeSentiment.INFO}>
          Info
        </Badge>
        <Badge strength={BadgeStrength.STRONG} sentiment={BadgeSentiment.WARNING}>
          Warning
        </Badge>
        <Badge strength={BadgeStrength.STRONG} sentiment={BadgeSentiment.DANGER}>
          Danger
        </Badge>
      </SandboxExamplesContainer>
    </div>
  );
};

export const Icons = () => {
  return (
    <SandboxExamplesContainer asRow>
      <Badge strength={BadgeStrength.STRONG} sentiment={BadgeSentiment.BRAND} preIcon="check">
        Brand
      </Badge>
      <Badge strength={BadgeStrength.STRONG} sentiment={BadgeSentiment.SUCCESS} postIcon="check">
        Success
      </Badge>
      <Badge strength={BadgeStrength.STRONG} sentiment={BadgeSentiment.INFO} preIcon="check" postIcon="check">
        Info
      </Badge>
    </SandboxExamplesContainer>
  );
};

export const Shapes = () => {
  return (
    <SandboxExamplesContainer asRow>
      <Badge
        shape={BadgeShape.ROUNDED}
        strength={BadgeStrength.STRONG}
        sentiment={BadgeSentiment.BRAND}
        preIcon="check"
      >
        Rounded
      </Badge>
      <Badge
        shape={BadgeShape.PILL}
        strength={BadgeStrength.STRONG}
        sentiment={BadgeSentiment.SUCCESS}
        postIcon="check"
      >
        Pill
      </Badge>
    </SandboxExamplesContainer>
  );
};

export const Size = () => {
  return (
    <div>
      <h2>Small</h2>
      <SandboxExamplesContainer asRow>
        <Badge size={BadgeSize.SMALL} strength={BadgeStrength.STRONG} sentiment={BadgeSentiment.BRAND} preIcon="check">
          Brand
        </Badge>
        <Badge
          size={BadgeSize.SMALL}
          strength={BadgeStrength.STRONG}
          sentiment={BadgeSentiment.SUCCESS}
          postIcon="check"
        >
          Success
        </Badge>
        <Badge
          size={BadgeSize.SMALL}
          strength={BadgeStrength.STRONG}
          sentiment={BadgeSentiment.INFO}
          preIcon="check"
          postIcon="check"
        >
          Info
        </Badge>
      </SandboxExamplesContainer>
      <h2>Medium</h2>
      <SandboxExamplesContainer asRow>
        <Badge size={BadgeSize.MEDIUM} strength={BadgeStrength.STRONG} sentiment={BadgeSentiment.BRAND} preIcon="check">
          Primary
        </Badge>
        <Badge
          size={BadgeSize.MEDIUM}
          strength={BadgeStrength.STRONG}
          sentiment={BadgeSentiment.SUCCESS}
          postIcon="check"
        >
          Success
        </Badge>
        <Badge
          size={BadgeSize.MEDIUM}
          strength={BadgeStrength.STRONG}
          sentiment={BadgeSentiment.INFO}
          preIcon="check"
          postIcon="check"
        >
          Info
        </Badge>
      </SandboxExamplesContainer>
    </div>
  );
};
