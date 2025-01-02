import Badge, { BadgeColor, BadgeSize, BadgeVariant } from '$/components/badge';
import { BadgeShape } from '$/components/badge/utils';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/Badge',
};

export const Variant = () => {
  return (
    <div>
      <h2>Weak</h2>
      <SandboxExamplesContainer asRow>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.NEUTRAL}>
          Neutral
        </Badge>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.BRAND}>
          Brand
        </Badge>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.SUCCESS}>
          Success
        </Badge>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.INFO}>
          Info
        </Badge>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.WARNING}>
          Warning
        </Badge>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.DANGER}>
          Danger
        </Badge>
      </SandboxExamplesContainer>
      <h2>Strong</h2>
      <SandboxExamplesContainer asRow>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.NEUTRAL}>
          Neutral
        </Badge>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.BRAND}>
          Brand
        </Badge>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.SUCCESS}>
          Success
        </Badge>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.INFO}>
          Info
        </Badge>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.WARNING}>
          Warning
        </Badge>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.DANGER}>
          Danger
        </Badge>
      </SandboxExamplesContainer>
    </div>
  );
};

export const Icons = () => {
  return (
    <SandboxExamplesContainer asRow>
      <Badge variant={BadgeVariant.STRONG} color={BadgeColor.BRAND} preIcon="check">
        Brand
      </Badge>
      <Badge variant={BadgeVariant.STRONG} color={BadgeColor.SUCCESS} postIcon="check">
        Success
      </Badge>
      <Badge variant={BadgeVariant.STRONG} color={BadgeColor.INFO} preIcon="check" postIcon="check">
        Info
      </Badge>
    </SandboxExamplesContainer>
  );
};

export const Shapes = () => {
  return (
    <SandboxExamplesContainer asRow>
      <Badge shape={BadgeShape.ROUNDED} variant={BadgeVariant.STRONG} color={BadgeColor.BRAND} preIcon="check">
        Rounded
      </Badge>
      <Badge shape={BadgeShape.PILL} variant={BadgeVariant.STRONG} color={BadgeColor.SUCCESS} postIcon="check">
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
        <Badge size={BadgeSize.SMALL} variant={BadgeVariant.STRONG} color={BadgeColor.BRAND} preIcon="check">
          Brand
        </Badge>
        <Badge size={BadgeSize.SMALL} variant={BadgeVariant.STRONG} color={BadgeColor.SUCCESS} postIcon="check">
          Success
        </Badge>
        <Badge
          size={BadgeSize.SMALL}
          variant={BadgeVariant.STRONG}
          color={BadgeColor.INFO}
          preIcon="check"
          postIcon="check"
        >
          Info
        </Badge>
      </SandboxExamplesContainer>
      <h2>Medium</h2>
      <SandboxExamplesContainer asRow>
        <Badge size={BadgeSize.MEDIUM} variant={BadgeVariant.STRONG} color={BadgeColor.BRAND} preIcon="check">
          Primary
        </Badge>
        <Badge size={BadgeSize.MEDIUM} variant={BadgeVariant.STRONG} color={BadgeColor.SUCCESS} postIcon="check">
          Success
        </Badge>
        <Badge
          size={BadgeSize.MEDIUM}
          variant={BadgeVariant.STRONG}
          color={BadgeColor.INFO}
          preIcon="check"
          postIcon="check"
        >
          Info
        </Badge>
      </SandboxExamplesContainer>
    </div>
  );
};
