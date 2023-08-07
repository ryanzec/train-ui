import Bubble, { BubbleSentiment, BubbleSize, BubbleStrength } from '$/components/bubble';
import Icon from '$/components/icon';

export default {
  title: 'Components/Bubble',
};

export const Strength = () => {
  return (
    <div>
      <h2>Weak</h2>
      <div>
        <Bubble strength={BubbleStrength.WEAK} sentiment={BubbleSentiment.NEUTRAL}>
          Neutral
        </Bubble>
        <Bubble strength={BubbleStrength.WEAK} sentiment={BubbleSentiment.BRAND}>
          Brand
        </Bubble>
        <Bubble strength={BubbleStrength.WEAK} sentiment={BubbleSentiment.SUCCESS}>
          Success
        </Bubble>
        <Bubble strength={BubbleStrength.WEAK} sentiment={BubbleSentiment.INFO}>
          Info
        </Bubble>
        <Bubble strength={BubbleStrength.WEAK} sentiment={BubbleSentiment.WARNING}>
          Warning
        </Bubble>
        <Bubble strength={BubbleStrength.WEAK} sentiment={BubbleSentiment.DANGER}>
          Danger
        </Bubble>
      </div>
      <h2>Strong</h2>
      <div>
        <Bubble strength={BubbleStrength.STRONG} sentiment={BubbleSentiment.NEUTRAL}>
          Neutral
        </Bubble>
        <Bubble strength={BubbleStrength.STRONG} sentiment={BubbleSentiment.BRAND}>
          Brand
        </Bubble>
        <Bubble strength={BubbleStrength.STRONG} sentiment={BubbleSentiment.SUCCESS}>
          Success
        </Bubble>
        <Bubble strength={BubbleStrength.STRONG} sentiment={BubbleSentiment.INFO}>
          Info
        </Bubble>
        <Bubble strength={BubbleStrength.STRONG} sentiment={BubbleSentiment.WARNING}>
          Warning
        </Bubble>
        <Bubble strength={BubbleStrength.STRONG} sentiment={BubbleSentiment.DANGER}>
          Danger
        </Bubble>
      </div>
    </div>
  );
};

export const Icons = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Bubble strength={BubbleStrength.STRONG} sentiment={BubbleSentiment.BRAND} preIcon="check">
        Brand
      </Bubble>
      <Bubble strength={BubbleStrength.STRONG} sentiment={BubbleSentiment.SUCCESS} postIcon="check">
        Success
      </Bubble>
      <Bubble strength={BubbleStrength.STRONG} sentiment={BubbleSentiment.INFO} preIcon="check" postIcon="check">
        Info
      </Bubble>
    </div>
  );
};

export const Size = () => {
  return (
    <div>
      <h2>Small</h2>
      <div style={{ display: 'flex' }}>
        <Bubble
          size={BubbleSize.SMALL}
          strength={BubbleStrength.STRONG}
          sentiment={BubbleSentiment.BRAND}
          preIcon="check"
        >
          Brand
        </Bubble>
        <Bubble
          size={BubbleSize.SMALL}
          strength={BubbleStrength.STRONG}
          sentiment={BubbleSentiment.SUCCESS}
          postIcon="check"
        >
          Success
        </Bubble>
        <Bubble
          size={BubbleSize.SMALL}
          strength={BubbleStrength.STRONG}
          sentiment={BubbleSentiment.INFO}
          preIcon="check"
          postIcon="check"
        >
          Info
        </Bubble>
      </div>
      <h2>Medium</h2>
      <div style={{ display: 'flex' }}>
        <Bubble
          size={BubbleSize.MEDIUM}
          strength={BubbleStrength.STRONG}
          sentiment={BubbleSentiment.BRAND}
          preIcon="check"
        >
          Primary
        </Bubble>
        <Bubble
          size={BubbleSize.MEDIUM}
          strength={BubbleStrength.STRONG}
          sentiment={BubbleSentiment.SUCCESS}
          postIcon="check"
        >
          Success
        </Bubble>
        <Bubble
          size={BubbleSize.MEDIUM}
          strength={BubbleStrength.STRONG}
          sentiment={BubbleSentiment.INFO}
          preIcon="check"
          postIcon="check"
        >
          Info
        </Bubble>
      </div>
    </div>
  );
};
