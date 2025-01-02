import Icon from '$/components/icon';
import Badge, { BadgeSentiment, BadgeSize, BadgeStrength } from 'packages/components/badge';

export default {
  title: 'Components/Badge',
};

export const Strength = () => {
  return (
    <div>
      <h2>Weak</h2>
      <div>
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
      </div>
      <h2>Strong</h2>
      <div>
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
      </div>
    </div>
  );
};

export const Icons = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Badge strength={BadgeStrength.STRONG} sentiment={BadgeSentiment.BRAND} preIcon="check">
        Brand
      </Badge>
      <Badge strength={BadgeStrength.STRONG} sentiment={BadgeSentiment.SUCCESS} postIcon="check">
        Success
      </Badge>
      <Badge strength={BadgeStrength.STRONG} sentiment={BadgeSentiment.INFO} preIcon="check" postIcon="check">
        Info
      </Badge>
    </div>
  );
};

export const Size = () => {
  return (
    <div>
      <h2>Small</h2>
      <div style={{ display: 'flex' }}>
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
      </div>
      <h2>Medium</h2>
      <div style={{ display: 'flex' }}>
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
      </div>
    </div>
  );
};
