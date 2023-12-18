import Button, { ButtonVariant, ButtonSentiment } from '$/components/button';
import { ButtonState } from '$/components/button/utils';
import Icon from '$/components/icon';
import { tooltipUtils } from '$/components/tooltip';

export default {
  title: 'Components/Button',
};

export const Variants = () => {
  return (
    <>
      Filled
      <Button.Group>
        <Button variant={ButtonVariant.FILLED}>Filled</Button>
        <Button variant={ButtonVariant.FILLED} preItem={<Icon icon="add" />}>
          Filled
        </Button>
        <Button variant={ButtonVariant.FILLED} postItem={<Icon icon="add" />}>
          Filled
        </Button>
        <Button variant={ButtonVariant.FILLED} preItem={<Icon icon="add" />} postItem={<Icon icon="add" />}>
          Filled
        </Button>
        <Button variant={ButtonVariant.FILLED} disabled>
          Filled (Disabled)
        </Button>
      </Button.Group>
      Weak
      <Button.Group>
        <Button variant={ButtonVariant.WEAK}>Filled</Button>
        <Button variant={ButtonVariant.WEAK} preItem={<Icon icon="add" />}>
          Weak
        </Button>
        <Button variant={ButtonVariant.WEAK} postItem={<Icon icon="add" />}>
          Weak
        </Button>
        <Button variant={ButtonVariant.WEAK} preItem={<Icon icon="add" />} postItem={<Icon icon="add" />}>
          Weak
        </Button>
        <Button variant={ButtonVariant.WEAK} disabled>
          Weak (Disabled)
        </Button>
      </Button.Group>
      Outlined
      <Button.Group>
        <Button variant={ButtonVariant.OUTLINED}>Outlined</Button>
        <Button variant={ButtonVariant.OUTLINED} preItem={<Icon icon="add" />}>
          Outlined
        </Button>
        <Button variant={ButtonVariant.OUTLINED} postItem={<Icon icon="add" />}>
          Outlined
        </Button>
        <Button variant={ButtonVariant.OUTLINED} preItem={<Icon icon="add" />} postItem={<Icon icon="add" />}>
          Outlined
        </Button>
        <Button variant={ButtonVariant.OUTLINED} disabled>
          Outlined (Disabled)
        </Button>
      </Button.Group>
      Text
      <Button.Group>
        <Button variant={ButtonVariant.TEXT} preItem={<Icon icon="add" />}>
          Outlined
        </Button>
        <Button variant={ButtonVariant.TEXT} postItem={<Icon icon="add" />}>
          Outlined
        </Button>
        <Button variant={ButtonVariant.TEXT} preItem={<Icon icon="add" />} postItem={<Icon icon="add" />}>
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
        <Button variant={ButtonVariant.GHOST} preItem={<Icon icon="add" />}>
          Outlined
        </Button>
        <Button variant={ButtonVariant.GHOST} postItem={<Icon icon="add" />}>
          Outlined
        </Button>
        <Button variant={ButtonVariant.GHOST} preItem={<Icon icon="add" />} postItem={<Icon icon="add" />}>
          Outlined
        </Button>
        <Button variant={ButtonVariant.GHOST} disabled>
          Outlined (Disabled)
        </Button>
      </Button.Group>
    </>
  );
};

export const Sentiments = () => {
  return (
    <>
      Neutral
      <Button.Group>
        <Button variant={ButtonVariant.FILLED}>Filled</Button>
        <Button variant={ButtonVariant.WEAK}>Weak</Button>
        <Button variant={ButtonVariant.OUTLINED} preItem={<Icon icon="add" />}>
          Outlined
        </Button>
        <Button variant={ButtonVariant.GHOST} postItem={<Icon icon="add" />}>
          Ghost
        </Button>
        <Button variant={ButtonVariant.TEXT} preItem={<Icon icon="add" />} postItem={<Icon icon="add" />}>
          Text
        </Button>
        <Button variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button variant={ButtonVariant.OUTLINED} preItem={<Icon icon="add" />} disabled>
          Outlined
        </Button>
        <Button variant={ButtonVariant.GHOST} postItem={<Icon icon="add" />} disabled>
          Ghost
        </Button>
        <Button variant={ButtonVariant.TEXT} preItem={<Icon icon="add" />} postItem={<Icon icon="add" />} disabled>
          Text
        </Button>
      </Button.Group>
      <Button.Group>
        <Button postItem={<Icon icon="home" />} variant={ButtonVariant.FILLED} />
        <Button postItem={<Icon icon="home" />} variant={ButtonVariant.WEAK} />
        <Button postItem={<Icon icon="home" />} variant={ButtonVariant.OUTLINED} />
        <Button postItem={<Icon icon="home" />} variant={ButtonVariant.GHOST} />
        <Button postItem={<Icon icon="home" />} variant={ButtonVariant.TEXT} />
        <Button postItem={<Icon icon="home" />} variant={ButtonVariant.FILLED} disabled />
        <Button postItem={<Icon icon="home" />} variant={ButtonVariant.WEAK} disabled />
        <Button postItem={<Icon icon="home" />} variant={ButtonVariant.OUTLINED} disabled />
        <Button postItem={<Icon icon="home" />} variant={ButtonVariant.GHOST} disabled />
        <Button postItem={<Icon icon="home" />} variant={ButtonVariant.TEXT} disabled />
      </Button.Group>
      Brand
      <Button.Group>
        <Button sentiment={ButtonSentiment.BRAND} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.BRAND} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button sentiment={ButtonSentiment.BRAND} variant={ButtonVariant.OUTLINED} preItem={<Icon icon="add" />}>
          Outlined
        </Button>
        <Button sentiment={ButtonSentiment.BRAND} variant={ButtonVariant.GHOST} postItem={<Icon icon="add" />}>
          Ghost
        </Button>
        <Button
          sentiment={ButtonSentiment.BRAND}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="add" />}
          postItem={<Icon icon="add" />}
        >
          Text
        </Button>
        <Button sentiment={ButtonSentiment.BRAND} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.BRAND} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button
          sentiment={ButtonSentiment.BRAND}
          variant={ButtonVariant.OUTLINED}
          preItem={<Icon icon="add" />}
          disabled
        >
          Outlined
        </Button>
        <Button sentiment={ButtonSentiment.BRAND} variant={ButtonVariant.GHOST} postItem={<Icon icon="add" />} disabled>
          Ghost
        </Button>
        <Button
          sentiment={ButtonSentiment.BRAND}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="add" />}
          postItem={<Icon icon="add" />}
          disabled
        >
          Text
        </Button>
      </Button.Group>
      <Button.Group>
        <Button sentiment={ButtonSentiment.BRAND} postItem={<Icon icon="home" />} variant={ButtonVariant.FILLED} />
        <Button sentiment={ButtonSentiment.BRAND} postItem={<Icon icon="home" />} variant={ButtonVariant.WEAK} />
        <Button sentiment={ButtonSentiment.BRAND} postItem={<Icon icon="home" />} variant={ButtonVariant.OUTLINED} />
        <Button sentiment={ButtonSentiment.BRAND} postItem={<Icon icon="home" />} variant={ButtonVariant.GHOST} />
        <Button sentiment={ButtonSentiment.BRAND} postItem={<Icon icon="home" />} variant={ButtonVariant.TEXT} />
        <Button
          sentiment={ButtonSentiment.BRAND}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.FILLED}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.BRAND}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.WEAK}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.BRAND}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.OUTLINED}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.BRAND}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.GHOST}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.BRAND}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.TEXT}
          disabled
        />
      </Button.Group>
      Success
      <Button.Group>
        <Button sentiment={ButtonSentiment.SUCCESS} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.SUCCESS} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button sentiment={ButtonSentiment.SUCCESS} variant={ButtonVariant.OUTLINED} preItem={<Icon icon="add" />}>
          Outlined
        </Button>
        <Button sentiment={ButtonSentiment.SUCCESS} variant={ButtonVariant.GHOST} postItem={<Icon icon="add" />}>
          Ghost
        </Button>
        <Button
          sentiment={ButtonSentiment.SUCCESS}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="add" />}
          postItem={<Icon icon="add" />}
        >
          Text
        </Button>
        <Button sentiment={ButtonSentiment.SUCCESS} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.SUCCESS} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button
          sentiment={ButtonSentiment.SUCCESS}
          variant={ButtonVariant.OUTLINED}
          preItem={<Icon icon="add" />}
          disabled
        >
          Outlined
        </Button>
        <Button
          sentiment={ButtonSentiment.SUCCESS}
          variant={ButtonVariant.GHOST}
          postItem={<Icon icon="add" />}
          disabled
        >
          Ghost
        </Button>
        <Button
          sentiment={ButtonSentiment.SUCCESS}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="add" />}
          postItem={<Icon icon="add" />}
          disabled
        >
          Text
        </Button>
      </Button.Group>
      <Button.Group>
        <Button sentiment={ButtonSentiment.SUCCESS} postItem={<Icon icon="home" />} variant={ButtonVariant.FILLED} />
        <Button sentiment={ButtonSentiment.SUCCESS} postItem={<Icon icon="home" />} variant={ButtonVariant.WEAK} />
        <Button sentiment={ButtonSentiment.SUCCESS} postItem={<Icon icon="home" />} variant={ButtonVariant.OUTLINED} />
        <Button sentiment={ButtonSentiment.SUCCESS} postItem={<Icon icon="home" />} variant={ButtonVariant.GHOST} />
        <Button sentiment={ButtonSentiment.SUCCESS} postItem={<Icon icon="home" />} variant={ButtonVariant.TEXT} />
        <Button
          sentiment={ButtonSentiment.SUCCESS}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.FILLED}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.SUCCESS}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.WEAK}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.SUCCESS}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.OUTLINED}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.SUCCESS}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.GHOST}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.SUCCESS}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.TEXT}
          disabled
        />
      </Button.Group>
      Info
      <Button.Group>
        <Button sentiment={ButtonSentiment.INFO} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.INFO} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button sentiment={ButtonSentiment.INFO} variant={ButtonVariant.OUTLINED} preItem={<Icon icon="add" />}>
          Outlined
        </Button>
        <Button sentiment={ButtonSentiment.INFO} variant={ButtonVariant.GHOST} postItem={<Icon icon="add" />}>
          Ghost
        </Button>
        <Button
          sentiment={ButtonSentiment.INFO}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="add" />}
          postItem={<Icon icon="add" />}
        >
          Text
        </Button>
        <Button sentiment={ButtonSentiment.INFO} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.INFO} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button
          sentiment={ButtonSentiment.INFO}
          variant={ButtonVariant.OUTLINED}
          preItem={<Icon icon="add" />}
          disabled
        >
          Outlined
        </Button>
        <Button sentiment={ButtonSentiment.INFO} variant={ButtonVariant.GHOST} postItem={<Icon icon="add" />} disabled>
          Ghost
        </Button>
        <Button
          sentiment={ButtonSentiment.INFO}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="add" />}
          postItem={<Icon icon="add" />}
          disabled
        >
          Text
        </Button>
      </Button.Group>
      <Button.Group>
        <Button sentiment={ButtonSentiment.INFO} postItem={<Icon icon="home" />} variant={ButtonVariant.FILLED} />
        <Button sentiment={ButtonSentiment.INFO} postItem={<Icon icon="home" />} variant={ButtonVariant.WEAK} />
        <Button sentiment={ButtonSentiment.INFO} postItem={<Icon icon="home" />} variant={ButtonVariant.OUTLINED} />
        <Button sentiment={ButtonSentiment.INFO} postItem={<Icon icon="home" />} variant={ButtonVariant.GHOST} />
        <Button sentiment={ButtonSentiment.INFO} postItem={<Icon icon="home" />} variant={ButtonVariant.TEXT} />
        <Button
          sentiment={ButtonSentiment.INFO}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.FILLED}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.INFO}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.WEAK}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.INFO}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.OUTLINED}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.INFO}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.GHOST}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.INFO}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.TEXT}
          disabled
        />
      </Button.Group>
      Warning
      <Button.Group>
        <Button sentiment={ButtonSentiment.WARNING} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.WARNING} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button sentiment={ButtonSentiment.WARNING} variant={ButtonVariant.OUTLINED} preItem={<Icon icon="add" />}>
          Outlined
        </Button>
        <Button sentiment={ButtonSentiment.WARNING} variant={ButtonVariant.GHOST} postItem={<Icon icon="add" />}>
          Ghost
        </Button>
        <Button
          sentiment={ButtonSentiment.WARNING}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="add" />}
          postItem={<Icon icon="add" />}
        >
          Text
        </Button>
        <Button sentiment={ButtonSentiment.WARNING} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.WARNING} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button
          sentiment={ButtonSentiment.WARNING}
          variant={ButtonVariant.OUTLINED}
          preItem={<Icon icon="add" />}
          disabled
        >
          Outlined
        </Button>
        <Button
          sentiment={ButtonSentiment.WARNING}
          variant={ButtonVariant.GHOST}
          postItem={<Icon icon="add" />}
          disabled
        >
          Ghost
        </Button>
        <Button
          sentiment={ButtonSentiment.WARNING}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="add" />}
          postItem={<Icon icon="add" />}
          disabled
        >
          Text
        </Button>
      </Button.Group>
      <Button.Group>
        <Button sentiment={ButtonSentiment.WARNING} postItem={<Icon icon="home" />} variant={ButtonVariant.FILLED} />
        <Button sentiment={ButtonSentiment.WARNING} postItem={<Icon icon="home" />} variant={ButtonVariant.WEAK} />
        <Button sentiment={ButtonSentiment.WARNING} postItem={<Icon icon="home" />} variant={ButtonVariant.OUTLINED} />
        <Button sentiment={ButtonSentiment.WARNING} postItem={<Icon icon="home" />} variant={ButtonVariant.GHOST} />
        <Button sentiment={ButtonSentiment.WARNING} postItem={<Icon icon="home" />} variant={ButtonVariant.TEXT} />
        <Button
          sentiment={ButtonSentiment.WARNING}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.FILLED}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.WARNING}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.WEAK}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.WARNING}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.OUTLINED}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.WARNING}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.GHOST}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.WARNING}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.TEXT}
          disabled
        />
      </Button.Group>
      Danger
      <Button.Group>
        <Button sentiment={ButtonSentiment.DANGER} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.DANGER} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button sentiment={ButtonSentiment.DANGER} variant={ButtonVariant.OUTLINED} preItem={<Icon icon="add" />}>
          Outlined
        </Button>
        <Button sentiment={ButtonSentiment.DANGER} variant={ButtonVariant.GHOST} postItem={<Icon icon="add" />}>
          Ghost
        </Button>
        <Button
          sentiment={ButtonSentiment.DANGER}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="add" />}
          postItem={<Icon icon="add" />}
        >
          Text
        </Button>
        <Button sentiment={ButtonSentiment.DANGER} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button sentiment={ButtonSentiment.DANGER} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button
          sentiment={ButtonSentiment.DANGER}
          variant={ButtonVariant.OUTLINED}
          preItem={<Icon icon="add" />}
          disabled
        >
          Outlined
        </Button>
        <Button
          sentiment={ButtonSentiment.DANGER}
          variant={ButtonVariant.GHOST}
          postItem={<Icon icon="add" />}
          disabled
        >
          Ghost
        </Button>
        <Button
          sentiment={ButtonSentiment.DANGER}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="add" />}
          postItem={<Icon icon="add" />}
          disabled
        >
          Text
        </Button>
      </Button.Group>
      <Button.Group>
        <Button sentiment={ButtonSentiment.DANGER} postItem={<Icon icon="home" />} variant={ButtonVariant.FILLED} />
        <Button sentiment={ButtonSentiment.DANGER} postItem={<Icon icon="home" />} variant={ButtonVariant.WEAK} />
        <Button sentiment={ButtonSentiment.DANGER} postItem={<Icon icon="home" />} variant={ButtonVariant.OUTLINED} />
        <Button sentiment={ButtonSentiment.DANGER} postItem={<Icon icon="home" />} variant={ButtonVariant.GHOST} />
        <Button sentiment={ButtonSentiment.DANGER} postItem={<Icon icon="home" />} variant={ButtonVariant.TEXT} />
        <Button
          sentiment={ButtonSentiment.DANGER}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.FILLED}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.DANGER}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.WEAK}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.DANGER}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.OUTLINED}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.DANGER}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.GHOST}
          disabled
        />
        <Button
          sentiment={ButtonSentiment.DANGER}
          postItem={<Icon icon="home" />}
          variant={ButtonVariant.TEXT}
          disabled
        />
      </Button.Group>
    </>
  );
};

export const Icons = () => {
  return (
    <>
      Filled
      <Button.Group>
        <Button preItem={<Icon icon="home" />} variant={ButtonVariant.FILLED} />
        <Button preItem={<Icon icon="home" />} variant={ButtonVariant.FILLED} disabled />
      </Button.Group>
      Outlined
      <Button.Group>
        <Button postItem={<Icon icon="home" />} variant={ButtonVariant.OUTLINED} />
        <Button postItem={<Icon icon="home" />} variant={ButtonVariant.OUTLINED} disabled />
      </Button.Group>
      Text
      <Button.Group>
        <Button preItem={<Icon icon="home" />} variant={ButtonVariant.TEXT} />
        <Button preItem={<Icon icon="home" />} variant={ButtonVariant.TEXT} disabled />
      </Button.Group>
      Ghost
      <Button.Group>
        <Button postItem={<Icon icon="home" />} variant={ButtonVariant.GHOST} />
        <Button postItem={<Icon icon="home" />} variant={ButtonVariant.GHOST} disabled />
      </Button.Group>
    </>
  );
};

export const ToggleButton = () => {
  return (
    <>
      <Button.Group isAttached>
        <Button.ToggleButton postItem={<Icon icon="home" />}></Button.ToggleButton>
        <Button.ToggleButton>Weak</Button.ToggleButton>
        <Button.ToggleButton isSelected preItem={<Icon icon="add" />}>
          Outlined
        </Button.ToggleButton>
        <Button.ToggleButton postItem={<Icon icon="add" />} />
        <Button.ToggleButton preItem={<Icon icon="add" />} postItem={<Icon icon="add" />}>
          Text
        </Button.ToggleButton>
        <Button.ToggleButton disabled>Filled</Button.ToggleButton>
        <Button.ToggleButton disabled>Weak</Button.ToggleButton>
        <Button.ToggleButton preItem={<Icon icon="add" />} disabled>
          Outlined
        </Button.ToggleButton>
        <Button.ToggleButton postItem={<Icon icon="add" />} disabled>
          Ghost
        </Button.ToggleButton>
        <Button.ToggleButton preItem={<Icon icon="add" />} postItem={<Icon icon="add" />} disabled>
          Text
        </Button.ToggleButton>
      </Button.Group>
    </>
  );
};

export const Loading = () => {
  return (
    <>
      <Button.Group>
        <Button postItem={<Icon icon="home" />} variant={ButtonVariant.FILLED} state={ButtonState.IS_LOADING} />
        <Button
          sentiment={ButtonSentiment.WARNING}
          variant={ButtonVariant.FILLED}
          state={ButtonState.IS_LOADING}
          preItem={<Icon icon="add" />}
        >
          Filled
        </Button>
        <Button
          sentiment={ButtonSentiment.WARNING}
          variant={ButtonVariant.OUTLINED}
          state={ButtonState.IS_LOADING}
          postItem={<Icon icon="add" />}
        >
          Outline
        </Button>
        <Button
          sentiment={ButtonSentiment.WARNING}
          variant={ButtonVariant.GHOST}
          state={ButtonState.IS_LOADING}
          preItem={<Icon icon="add" />}
          postItem={<Icon icon="add" />}
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
