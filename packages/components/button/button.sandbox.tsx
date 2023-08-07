import Button, { ButtonVariant, ButtonSentiment } from '$/components/button';
import { tooltipUtils } from '$/components/tooltip';

export default {
  title: 'Components/Button',
};

export const Variant = () => {
  return (
    <>
      Filled
      <Button.Group>
        <Button variant={ButtonVariant.FILLED}>Filled</Button>
        <Button variant={ButtonVariant.FILLED} preIcon="add">
          Filled
        </Button>
        <Button variant={ButtonVariant.FILLED} postIcon="add">
          Filled
        </Button>
        <Button variant={ButtonVariant.FILLED} preIcon="add" postIcon="add">
          Filled
        </Button>
        <Button variant={ButtonVariant.FILLED} disabled>
          Filled (Disabled)
        </Button>
      </Button.Group>
      Weak
      <Button.Group>
        <Button variant={ButtonVariant.WEAK}>Filled</Button>
        <Button variant={ButtonVariant.WEAK} preIcon="add">
          Weak
        </Button>
        <Button variant={ButtonVariant.WEAK} postIcon="add">
          Weak
        </Button>
        <Button variant={ButtonVariant.WEAK} preIcon="add" postIcon="add">
          Weak
        </Button>
        <Button variant={ButtonVariant.WEAK} disabled>
          Weak (Disabled)
        </Button>
      </Button.Group>
      Outlined
      <Button.Group>
        <Button variant={ButtonVariant.OUTLINED}>Outlined</Button>
        <Button variant={ButtonVariant.OUTLINED} preIcon="add">
          Outlined
        </Button>
        <Button variant={ButtonVariant.OUTLINED} postIcon="add">
          Outlined
        </Button>
        <Button variant={ButtonVariant.OUTLINED} preIcon="add" postIcon="add">
          Outlined
        </Button>
        <Button variant={ButtonVariant.OUTLINED} disabled>
          Outlined (Disabled)
        </Button>
      </Button.Group>
      Text
      <Button.Group>
        <Button variant={ButtonVariant.TEXT} preIcon="add">
          Outlined
        </Button>
        <Button variant={ButtonVariant.TEXT} postIcon="add">
          Outlined
        </Button>
        <Button variant={ButtonVariant.TEXT} preIcon="add" postIcon="add">
          Outlined
        </Button>
        <Button variant={ButtonVariant.TEXT} disabled>
          Outlined (Disabled)
        </Button>
      </Button.Group>
      <div>
        This is just a <Button variant={ButtonVariant.TEXT}>Outlined</Button> button inlined in text
      </div>
      Ghost
      <Button.Group>
        <Button variant={ButtonVariant.GHOST}>Outlined</Button>
        <Button variant={ButtonVariant.GHOST} preIcon="add">
          Outlined
        </Button>
        <Button variant={ButtonVariant.GHOST} postIcon="add">
          Outlined
        </Button>
        <Button variant={ButtonVariant.GHOST} preIcon="add" postIcon="add">
          Outlined
        </Button>
        <Button variant={ButtonVariant.GHOST} disabled>
          Outlined (Disabled)
        </Button>
      </Button.Group>
    </>
  );
};

export const Sentiment = () => {
  return (
    <>
      Neutral
      <Button.Group>
        <Button variant={ButtonVariant.FILLED}>Filled</Button>
        <Button variant={ButtonVariant.WEAK}>Weak</Button>
        <Button variant={ButtonVariant.OUTLINED} preIcon="add">
          Outlined
        </Button>
        <Button variant={ButtonVariant.GHOST} postIcon="add">
          Ghost
        </Button>
        <Button variant={ButtonVariant.TEXT} preIcon="add" postIcon="add">
          Text
        </Button>
        <Button variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button variant={ButtonVariant.OUTLINED} preIcon="add" disabled>
          Outlined
        </Button>
        <Button variant={ButtonVariant.GHOST} postIcon="add" disabled>
          Ghost
        </Button>
        <Button variant={ButtonVariant.TEXT} preIcon="add" postIcon="add" disabled>
          Text
        </Button>
      </Button.Group>
      <Button.Group>
        <Button.IconButton icon="home" variant={ButtonVariant.FILLED} />
        <Button.IconButton icon="home" variant={ButtonVariant.WEAK} />
        <Button.IconButton icon="home" variant={ButtonVariant.OUTLINED} />
        <Button.IconButton icon="home" variant={ButtonVariant.GHOST} />
        <Button.IconButton icon="home" variant={ButtonVariant.TEXT} />
        <Button.IconButton icon="home" variant={ButtonVariant.FILLED} disabled />
        <Button.IconButton icon="home" variant={ButtonVariant.WEAK} disabled />
        <Button.IconButton icon="home" variant={ButtonVariant.OUTLINED} disabled />
        <Button.IconButton icon="home" variant={ButtonVariant.GHOST} disabled />
        <Button.IconButton icon="home" variant={ButtonVariant.TEXT} disabled />
      </Button.Group>
      Brand
      <Button.Group>
        <Button sentiment={ButtonSentiment.BRAND} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.BRAND} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button sentiment={ButtonSentiment.BRAND} variant={ButtonVariant.OUTLINED} preIcon="add">
          Outlined
        </Button>
        <Button sentiment={ButtonSentiment.BRAND} variant={ButtonVariant.GHOST} postIcon="add">
          Ghost
        </Button>
        <Button sentiment={ButtonSentiment.BRAND} variant={ButtonVariant.TEXT} preIcon="add" postIcon="add">
          Text
        </Button>
        <Button sentiment={ButtonSentiment.BRAND} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.BRAND} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button sentiment={ButtonSentiment.BRAND} variant={ButtonVariant.OUTLINED} preIcon="add" disabled>
          Outlined
        </Button>
        <Button sentiment={ButtonSentiment.BRAND} variant={ButtonVariant.GHOST} postIcon="add" disabled>
          Ghost
        </Button>
        <Button sentiment={ButtonSentiment.BRAND} variant={ButtonVariant.TEXT} preIcon="add" postIcon="add" disabled>
          Text
        </Button>
      </Button.Group>
      <Button.Group>
        <Button.IconButton sentiment={ButtonSentiment.BRAND} icon="home" variant={ButtonVariant.FILLED} />
        <Button.IconButton sentiment={ButtonSentiment.BRAND} icon="home" variant={ButtonVariant.WEAK} />
        <Button.IconButton sentiment={ButtonSentiment.BRAND} icon="home" variant={ButtonVariant.OUTLINED} />
        <Button.IconButton sentiment={ButtonSentiment.BRAND} icon="home" variant={ButtonVariant.GHOST} />
        <Button.IconButton sentiment={ButtonSentiment.BRAND} icon="home" variant={ButtonVariant.TEXT} />
        <Button.IconButton sentiment={ButtonSentiment.BRAND} icon="home" variant={ButtonVariant.FILLED} disabled />
        <Button.IconButton sentiment={ButtonSentiment.BRAND} icon="home" variant={ButtonVariant.WEAK} disabled />
        <Button.IconButton sentiment={ButtonSentiment.BRAND} icon="home" variant={ButtonVariant.OUTLINED} disabled />
        <Button.IconButton sentiment={ButtonSentiment.BRAND} icon="home" variant={ButtonVariant.GHOST} disabled />
        <Button.IconButton sentiment={ButtonSentiment.BRAND} icon="home" variant={ButtonVariant.TEXT} disabled />
      </Button.Group>
      Success
      <Button.Group>
        <Button sentiment={ButtonSentiment.SUCCESS} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.SUCCESS} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button sentiment={ButtonSentiment.SUCCESS} variant={ButtonVariant.OUTLINED} preIcon="add">
          Outlined
        </Button>
        <Button sentiment={ButtonSentiment.SUCCESS} variant={ButtonVariant.GHOST} postIcon="add">
          Ghost
        </Button>
        <Button sentiment={ButtonSentiment.SUCCESS} variant={ButtonVariant.TEXT} preIcon="add" postIcon="add">
          Text
        </Button>
        <Button sentiment={ButtonSentiment.SUCCESS} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.SUCCESS} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button sentiment={ButtonSentiment.SUCCESS} variant={ButtonVariant.OUTLINED} preIcon="add" disabled>
          Outlined
        </Button>
        <Button sentiment={ButtonSentiment.SUCCESS} variant={ButtonVariant.GHOST} postIcon="add" disabled>
          Ghost
        </Button>
        <Button sentiment={ButtonSentiment.SUCCESS} variant={ButtonVariant.TEXT} preIcon="add" postIcon="add" disabled>
          Text
        </Button>
      </Button.Group>
      <Button.Group>
        <Button.IconButton sentiment={ButtonSentiment.SUCCESS} icon="home" variant={ButtonVariant.FILLED} />
        <Button.IconButton sentiment={ButtonSentiment.SUCCESS} icon="home" variant={ButtonVariant.WEAK} />
        <Button.IconButton sentiment={ButtonSentiment.SUCCESS} icon="home" variant={ButtonVariant.OUTLINED} />
        <Button.IconButton sentiment={ButtonSentiment.SUCCESS} icon="home" variant={ButtonVariant.GHOST} />
        <Button.IconButton sentiment={ButtonSentiment.SUCCESS} icon="home" variant={ButtonVariant.TEXT} />
        <Button.IconButton sentiment={ButtonSentiment.SUCCESS} icon="home" variant={ButtonVariant.FILLED} disabled />
        <Button.IconButton sentiment={ButtonSentiment.SUCCESS} icon="home" variant={ButtonVariant.WEAK} disabled />
        <Button.IconButton sentiment={ButtonSentiment.SUCCESS} icon="home" variant={ButtonVariant.OUTLINED} disabled />
        <Button.IconButton sentiment={ButtonSentiment.SUCCESS} icon="home" variant={ButtonVariant.GHOST} disabled />
        <Button.IconButton sentiment={ButtonSentiment.SUCCESS} icon="home" variant={ButtonVariant.TEXT} disabled />
      </Button.Group>
      Info
      <Button.Group>
        <Button sentiment={ButtonSentiment.INFO} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.INFO} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button sentiment={ButtonSentiment.INFO} variant={ButtonVariant.OUTLINED} preIcon="add">
          Outlined
        </Button>
        <Button sentiment={ButtonSentiment.INFO} variant={ButtonVariant.GHOST} postIcon="add">
          Ghost
        </Button>
        <Button sentiment={ButtonSentiment.INFO} variant={ButtonVariant.TEXT} preIcon="add" postIcon="add">
          Text
        </Button>
        <Button sentiment={ButtonSentiment.INFO} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.INFO} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button sentiment={ButtonSentiment.INFO} variant={ButtonVariant.OUTLINED} preIcon="add" disabled>
          Outlined
        </Button>
        <Button sentiment={ButtonSentiment.INFO} variant={ButtonVariant.GHOST} postIcon="add" disabled>
          Ghost
        </Button>
        <Button sentiment={ButtonSentiment.INFO} variant={ButtonVariant.TEXT} preIcon="add" postIcon="add" disabled>
          Text
        </Button>
      </Button.Group>
      <Button.Group>
        <Button.IconButton sentiment={ButtonSentiment.INFO} icon="home" variant={ButtonVariant.FILLED} />
        <Button.IconButton sentiment={ButtonSentiment.INFO} icon="home" variant={ButtonVariant.WEAK} />
        <Button.IconButton sentiment={ButtonSentiment.INFO} icon="home" variant={ButtonVariant.OUTLINED} />
        <Button.IconButton sentiment={ButtonSentiment.INFO} icon="home" variant={ButtonVariant.GHOST} />
        <Button.IconButton sentiment={ButtonSentiment.INFO} icon="home" variant={ButtonVariant.TEXT} />
        <Button.IconButton sentiment={ButtonSentiment.INFO} icon="home" variant={ButtonVariant.FILLED} disabled />
        <Button.IconButton sentiment={ButtonSentiment.INFO} icon="home" variant={ButtonVariant.WEAK} disabled />
        <Button.IconButton sentiment={ButtonSentiment.INFO} icon="home" variant={ButtonVariant.OUTLINED} disabled />
        <Button.IconButton sentiment={ButtonSentiment.INFO} icon="home" variant={ButtonVariant.GHOST} disabled />
        <Button.IconButton sentiment={ButtonSentiment.INFO} icon="home" variant={ButtonVariant.TEXT} disabled />
      </Button.Group>
      Warning
      <Button.Group>
        <Button sentiment={ButtonSentiment.WARNING} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.WARNING} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button sentiment={ButtonSentiment.WARNING} variant={ButtonVariant.OUTLINED} preIcon="add">
          Outlined
        </Button>
        <Button sentiment={ButtonSentiment.WARNING} variant={ButtonVariant.GHOST} postIcon="add">
          Ghost
        </Button>
        <Button sentiment={ButtonSentiment.WARNING} variant={ButtonVariant.TEXT} preIcon="add" postIcon="add">
          Text
        </Button>
        <Button sentiment={ButtonSentiment.WARNING} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.WARNING} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button sentiment={ButtonSentiment.WARNING} variant={ButtonVariant.OUTLINED} preIcon="add" disabled>
          Outlined
        </Button>
        <Button sentiment={ButtonSentiment.WARNING} variant={ButtonVariant.GHOST} postIcon="add" disabled>
          Ghost
        </Button>
        <Button sentiment={ButtonSentiment.WARNING} variant={ButtonVariant.TEXT} preIcon="add" postIcon="add" disabled>
          Text
        </Button>
      </Button.Group>
      <Button.Group>
        <Button.IconButton sentiment={ButtonSentiment.WARNING} icon="home" variant={ButtonVariant.FILLED} />
        <Button.IconButton sentiment={ButtonSentiment.WARNING} icon="home" variant={ButtonVariant.WEAK} />
        <Button.IconButton sentiment={ButtonSentiment.WARNING} icon="home" variant={ButtonVariant.OUTLINED} />
        <Button.IconButton sentiment={ButtonSentiment.WARNING} icon="home" variant={ButtonVariant.GHOST} />
        <Button.IconButton sentiment={ButtonSentiment.WARNING} icon="home" variant={ButtonVariant.TEXT} />
        <Button.IconButton sentiment={ButtonSentiment.WARNING} icon="home" variant={ButtonVariant.FILLED} disabled />
        <Button.IconButton sentiment={ButtonSentiment.WARNING} icon="home" variant={ButtonVariant.WEAK} disabled />
        <Button.IconButton sentiment={ButtonSentiment.WARNING} icon="home" variant={ButtonVariant.OUTLINED} disabled />
        <Button.IconButton sentiment={ButtonSentiment.WARNING} icon="home" variant={ButtonVariant.GHOST} disabled />
        <Button.IconButton sentiment={ButtonSentiment.WARNING} icon="home" variant={ButtonVariant.TEXT} disabled />
      </Button.Group>
      Danger
      <Button.Group>
        <Button sentiment={ButtonSentiment.DANGER} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.DANGER} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button sentiment={ButtonSentiment.DANGER} variant={ButtonVariant.OUTLINED} preIcon="add">
          Outlined
        </Button>
        <Button sentiment={ButtonSentiment.DANGER} variant={ButtonVariant.GHOST} postIcon="add">
          Ghost
        </Button>
        <Button sentiment={ButtonSentiment.DANGER} variant={ButtonVariant.TEXT} preIcon="add" postIcon="add">
          Text
        </Button>
        <Button sentiment={ButtonSentiment.DANGER} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.DANGER} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button sentiment={ButtonSentiment.DANGER} variant={ButtonVariant.OUTLINED} preIcon="add" disabled>
          Outlined
        </Button>
        <Button sentiment={ButtonSentiment.DANGER} variant={ButtonVariant.GHOST} postIcon="add" disabled>
          Ghost
        </Button>
        <Button sentiment={ButtonSentiment.DANGER} variant={ButtonVariant.TEXT} preIcon="add" postIcon="add" disabled>
          Text
        </Button>
      </Button.Group>
      <Button.Group>
        <Button.IconButton sentiment={ButtonSentiment.DANGER} icon="home" variant={ButtonVariant.FILLED} />
        <Button.IconButton sentiment={ButtonSentiment.DANGER} icon="home" variant={ButtonVariant.WEAK} />
        <Button.IconButton sentiment={ButtonSentiment.DANGER} icon="home" variant={ButtonVariant.OUTLINED} />
        <Button.IconButton sentiment={ButtonSentiment.DANGER} icon="home" variant={ButtonVariant.GHOST} />
        <Button.IconButton sentiment={ButtonSentiment.DANGER} icon="home" variant={ButtonVariant.TEXT} />
        <Button.IconButton sentiment={ButtonSentiment.DANGER} icon="home" variant={ButtonVariant.FILLED} disabled />
        <Button.IconButton sentiment={ButtonSentiment.DANGER} icon="home" variant={ButtonVariant.WEAK} disabled />
        <Button.IconButton sentiment={ButtonSentiment.DANGER} icon="home" variant={ButtonVariant.OUTLINED} disabled />
        <Button.IconButton sentiment={ButtonSentiment.DANGER} icon="home" variant={ButtonVariant.GHOST} disabled />
        <Button.IconButton sentiment={ButtonSentiment.DANGER} icon="home" variant={ButtonVariant.TEXT} disabled />
      </Button.Group>
    </>
  );
};

export const IconButton = () => {
  return (
    <>
      Filled
      <Button.Group>
        <Button.IconButton icon="home" variant={ButtonVariant.FILLED} />
        <Button.IconButton icon="home" variant={ButtonVariant.FILLED} disabled />
      </Button.Group>
      Outlined
      <Button.Group>
        <Button.IconButton icon="home" variant={ButtonVariant.OUTLINED} />
        <Button.IconButton icon="home" variant={ButtonVariant.OUTLINED} disabled />
      </Button.Group>
      Text
      <Button.Group>
        <Button.IconButton icon="home" variant={ButtonVariant.TEXT} />
        <Button.IconButton icon="home" variant={ButtonVariant.TEXT} disabled />
      </Button.Group>
      Ghost
      <Button.Group>
        <Button.IconButton icon="home" variant={ButtonVariant.GHOST} />
        <Button.IconButton icon="home" variant={ButtonVariant.GHOST} disabled />
      </Button.Group>
    </>
  );
};

export const Loading = () => {
  return (
    <>
      <Button.Group>
        <Button.IconButton icon="home" variant={ButtonVariant.FILLED} isLoading />
        <Button sentiment={ButtonSentiment.WARNING} variant={ButtonVariant.FILLED} isLoading preIcon="add">
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.WARNING} variant={ButtonVariant.OUTLINED} isLoading postIcon="add">
          Outline
        </Button>
        <Button
          sentiment={ButtonSentiment.WARNING}
          variant={ButtonVariant.GHOST}
          isLoading
          preIcon="add"
          postIcon="add"
        >
          Ghost
        </Button>
      </Button.Group>
    </>
  );
};

export const DropDown = () => {
  const tooltipStore = tooltipUtils.createStore();

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Button.DropDown label="Drop Down" tooltipStore={tooltipStore}>
        This is the button drop down content
      </Button.DropDown>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};
