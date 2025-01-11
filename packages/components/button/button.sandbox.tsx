import Button, { ButtonColor, ButtonShape, ButtonSize, ButtonVariant } from '$/components/button';
import { ButtonState } from '$/components/button/utils';
import Icon, { IconSize } from '$/components/icon';
import { tooltipUtils } from '$/components/tooltip';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/Button',
};

export const Variants = () => {
  return (
    <>
      Filled
      <Button.Group>
        <Button variant={ButtonVariant.FILLED}>Filled</Button>
        <Button variant={ButtonVariant.FILLED} preItem={<Icon icon="plus" />}>
          Filled
        </Button>
        <Button variant={ButtonVariant.FILLED} postItem={<Icon icon="plus" />}>
          Filled
        </Button>
        <Button variant={ButtonVariant.FILLED} preItem={<Icon icon="plus" />} postItem={<Icon icon="plus" />}>
          Filled
        </Button>
        <Button variant={ButtonVariant.FILLED} disabled>
          Filled (Disabled)
        </Button>
      </Button.Group>
      Weak
      <Button.Group>
        <Button variant={ButtonVariant.WEAK}>Filled</Button>
        <Button variant={ButtonVariant.WEAK} preItem={<Icon icon="plus" />}>
          Weak
        </Button>
        <Button variant={ButtonVariant.WEAK} postItem={<Icon icon="plus" />}>
          Weak
        </Button>
        <Button variant={ButtonVariant.WEAK} preItem={<Icon icon="plus" />} postItem={<Icon icon="plus" />}>
          Weak
        </Button>
        <Button variant={ButtonVariant.WEAK} disabled>
          Weak (Disabled)
        </Button>
      </Button.Group>
      Outlined
      <Button.Group>
        <Button variant={ButtonVariant.OUTLINED}>Outlined</Button>
        <Button variant={ButtonVariant.OUTLINED} preItem={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button variant={ButtonVariant.OUTLINED} postItem={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button variant={ButtonVariant.OUTLINED} preItem={<Icon icon="plus" />} postItem={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button variant={ButtonVariant.OUTLINED} disabled>
          Outlined (Disabled)
        </Button>
      </Button.Group>
      Text
      <Button.Group>
        <Button variant={ButtonVariant.TEXT} preItem={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button variant={ButtonVariant.TEXT} postItem={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button variant={ButtonVariant.TEXT} preItem={<Icon icon="plus" />} postItem={<Icon icon="plus" />}>
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
        <Button variant={ButtonVariant.GHOST} preItem={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button variant={ButtonVariant.GHOST} postItem={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button variant={ButtonVariant.GHOST} preItem={<Icon icon="plus" />} postItem={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button variant={ButtonVariant.GHOST} disabled>
          Outlined (Disabled)
        </Button>
      </Button.Group>
    </>
  );
};

export const Colors = () => {
  return (
    <>
      <Button.Group>
        <Button color={ButtonColor.BRAND} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button color={ButtonColor.BRAND} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button color={ButtonColor.BRAND} variant={ButtonVariant.OUTLINED} preItem={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button color={ButtonColor.BRAND} variant={ButtonVariant.GHOST} postItem={<Icon icon="plus" />}>
          Ghost
        </Button>
        <Button
          color={ButtonColor.BRAND}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="plus" />}
          postItem={<Icon icon="plus" />}
        >
          Text
        </Button>
        <Button color={ButtonColor.BRAND} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button color={ButtonColor.BRAND} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button color={ButtonColor.BRAND} variant={ButtonVariant.OUTLINED} preItem={<Icon icon="plus" />} disabled>
          Outlined
        </Button>
        <Button color={ButtonColor.BRAND} variant={ButtonVariant.GHOST} postItem={<Icon icon="plus" />} disabled>
          Ghost
        </Button>
        <Button
          color={ButtonColor.BRAND}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="plus" />}
          postItem={<Icon icon="plus" />}
          disabled
        >
          Text
        </Button>
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.BRAND} postItem={<Icon icon="question" />} variant={ButtonVariant.FILLED} />
        <Button color={ButtonColor.BRAND} postItem={<Icon icon="question" />} variant={ButtonVariant.WEAK} />
        <Button color={ButtonColor.BRAND} postItem={<Icon icon="question" />} variant={ButtonVariant.OUTLINED} />
        <Button color={ButtonColor.BRAND} postItem={<Icon icon="question" />} variant={ButtonVariant.GHOST} />
        <Button color={ButtonColor.BRAND} postItem={<Icon icon="question" />} variant={ButtonVariant.TEXT} />
        <Button color={ButtonColor.BRAND} postItem={<Icon icon="question" />} variant={ButtonVariant.FILLED} disabled />
        <Button color={ButtonColor.BRAND} postItem={<Icon icon="question" />} variant={ButtonVariant.WEAK} disabled />
        <Button
          color={ButtonColor.BRAND}
          postItem={<Icon icon="question" />}
          variant={ButtonVariant.OUTLINED}
          disabled
        />
        <Button color={ButtonColor.BRAND} postItem={<Icon icon="question" />} variant={ButtonVariant.GHOST} disabled />
        <Button color={ButtonColor.BRAND} postItem={<Icon icon="question" />} variant={ButtonVariant.TEXT} disabled />
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.NEUTRAL} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button color={ButtonColor.NEUTRAL} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button color={ButtonColor.NEUTRAL} variant={ButtonVariant.OUTLINED} preItem={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button color={ButtonColor.NEUTRAL} variant={ButtonVariant.GHOST} postItem={<Icon icon="plus" />}>
          Ghost
        </Button>
        <Button
          color={ButtonColor.NEUTRAL}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="plus" />}
          postItem={<Icon icon="plus" />}
        >
          Text
        </Button>
        <Button color={ButtonColor.NEUTRAL} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button color={ButtonColor.NEUTRAL} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button color={ButtonColor.NEUTRAL} variant={ButtonVariant.OUTLINED} preItem={<Icon icon="plus" />} disabled>
          Outlined
        </Button>
        <Button color={ButtonColor.NEUTRAL} variant={ButtonVariant.GHOST} postItem={<Icon icon="plus" />} disabled>
          Ghost
        </Button>
        <Button
          color={ButtonColor.NEUTRAL}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="plus" />}
          postItem={<Icon icon="plus" />}
          disabled
        >
          Text
        </Button>
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.NEUTRAL} postItem={<Icon icon="question" />} variant={ButtonVariant.FILLED} />
        <Button color={ButtonColor.NEUTRAL} postItem={<Icon icon="question" />} variant={ButtonVariant.WEAK} />
        <Button color={ButtonColor.NEUTRAL} postItem={<Icon icon="question" />} variant={ButtonVariant.OUTLINED} />
        <Button color={ButtonColor.NEUTRAL} postItem={<Icon icon="question" />} variant={ButtonVariant.GHOST} />
        <Button color={ButtonColor.NEUTRAL} postItem={<Icon icon="question" />} variant={ButtonVariant.TEXT} />
        <Button
          color={ButtonColor.NEUTRAL}
          postItem={<Icon icon="question" />}
          variant={ButtonVariant.FILLED}
          disabled
        />
        <Button color={ButtonColor.NEUTRAL} postItem={<Icon icon="question" />} variant={ButtonVariant.WEAK} disabled />
        <Button
          color={ButtonColor.NEUTRAL}
          postItem={<Icon icon="question" />}
          variant={ButtonVariant.OUTLINED}
          disabled
        />
        <Button
          color={ButtonColor.NEUTRAL}
          postItem={<Icon icon="question" />}
          variant={ButtonVariant.GHOST}
          disabled
        />
        <Button color={ButtonColor.NEUTRAL} postItem={<Icon icon="question" />} variant={ButtonVariant.TEXT} disabled />
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.SUCCESS} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button color={ButtonColor.SUCCESS} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button color={ButtonColor.SUCCESS} variant={ButtonVariant.OUTLINED} preItem={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button color={ButtonColor.SUCCESS} variant={ButtonVariant.GHOST} postItem={<Icon icon="plus" />}>
          Ghost
        </Button>
        <Button
          color={ButtonColor.SUCCESS}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="plus" />}
          postItem={<Icon icon="plus" />}
        >
          Text
        </Button>
        <Button color={ButtonColor.SUCCESS} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button color={ButtonColor.SUCCESS} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button color={ButtonColor.SUCCESS} variant={ButtonVariant.OUTLINED} preItem={<Icon icon="plus" />} disabled>
          Outlined
        </Button>
        <Button color={ButtonColor.SUCCESS} variant={ButtonVariant.GHOST} postItem={<Icon icon="plus" />} disabled>
          Ghost
        </Button>
        <Button
          color={ButtonColor.SUCCESS}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="plus" />}
          postItem={<Icon icon="plus" />}
          disabled
        >
          Text
        </Button>
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.SUCCESS} postItem={<Icon icon="question" />} variant={ButtonVariant.FILLED} />
        <Button color={ButtonColor.SUCCESS} postItem={<Icon icon="question" />} variant={ButtonVariant.WEAK} />
        <Button color={ButtonColor.SUCCESS} postItem={<Icon icon="question" />} variant={ButtonVariant.OUTLINED} />
        <Button color={ButtonColor.SUCCESS} postItem={<Icon icon="question" />} variant={ButtonVariant.GHOST} />
        <Button color={ButtonColor.SUCCESS} postItem={<Icon icon="question" />} variant={ButtonVariant.TEXT} />
        <Button
          color={ButtonColor.SUCCESS}
          postItem={<Icon icon="question" />}
          variant={ButtonVariant.FILLED}
          disabled
        />
        <Button color={ButtonColor.SUCCESS} postItem={<Icon icon="question" />} variant={ButtonVariant.WEAK} disabled />
        <Button
          color={ButtonColor.SUCCESS}
          postItem={<Icon icon="question" />}
          variant={ButtonVariant.OUTLINED}
          disabled
        />
        <Button
          color={ButtonColor.SUCCESS}
          postItem={<Icon icon="question" />}
          variant={ButtonVariant.GHOST}
          disabled
        />
        <Button color={ButtonColor.SUCCESS} postItem={<Icon icon="question" />} variant={ButtonVariant.TEXT} disabled />
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.INFO} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button color={ButtonColor.INFO} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button color={ButtonColor.INFO} variant={ButtonVariant.OUTLINED} preItem={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button color={ButtonColor.INFO} variant={ButtonVariant.GHOST} postItem={<Icon icon="plus" />}>
          Ghost
        </Button>
        <Button
          color={ButtonColor.INFO}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="plus" />}
          postItem={<Icon icon="plus" />}
        >
          Text
        </Button>
        <Button color={ButtonColor.INFO} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button color={ButtonColor.INFO} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button color={ButtonColor.INFO} variant={ButtonVariant.OUTLINED} preItem={<Icon icon="plus" />} disabled>
          Outlined
        </Button>
        <Button color={ButtonColor.INFO} variant={ButtonVariant.GHOST} postItem={<Icon icon="plus" />} disabled>
          Ghost
        </Button>
        <Button
          color={ButtonColor.INFO}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="plus" />}
          postItem={<Icon icon="plus" />}
          disabled
        >
          Text
        </Button>
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.INFO} postItem={<Icon icon="question" />} variant={ButtonVariant.FILLED} />
        <Button color={ButtonColor.INFO} postItem={<Icon icon="question" />} variant={ButtonVariant.WEAK} />
        <Button color={ButtonColor.INFO} postItem={<Icon icon="question" />} variant={ButtonVariant.OUTLINED} />
        <Button color={ButtonColor.INFO} postItem={<Icon icon="question" />} variant={ButtonVariant.GHOST} />
        <Button color={ButtonColor.INFO} postItem={<Icon icon="question" />} variant={ButtonVariant.TEXT} />
        <Button color={ButtonColor.INFO} postItem={<Icon icon="question" />} variant={ButtonVariant.FILLED} disabled />
        <Button color={ButtonColor.INFO} postItem={<Icon icon="question" />} variant={ButtonVariant.WEAK} disabled />
        <Button
          color={ButtonColor.INFO}
          postItem={<Icon icon="question" />}
          variant={ButtonVariant.OUTLINED}
          disabled
        />
        <Button color={ButtonColor.INFO} postItem={<Icon icon="question" />} variant={ButtonVariant.GHOST} disabled />
        <Button color={ButtonColor.INFO} postItem={<Icon icon="question" />} variant={ButtonVariant.TEXT} disabled />
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.WARNING} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button color={ButtonColor.WARNING} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button color={ButtonColor.WARNING} variant={ButtonVariant.OUTLINED} preItem={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button color={ButtonColor.WARNING} variant={ButtonVariant.GHOST} postItem={<Icon icon="plus" />}>
          Ghost
        </Button>
        <Button
          color={ButtonColor.WARNING}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="plus" />}
          postItem={<Icon icon="plus" />}
        >
          Text
        </Button>
        <Button color={ButtonColor.WARNING} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button color={ButtonColor.WARNING} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button color={ButtonColor.WARNING} variant={ButtonVariant.OUTLINED} preItem={<Icon icon="plus" />} disabled>
          Outlined
        </Button>
        <Button color={ButtonColor.WARNING} variant={ButtonVariant.GHOST} postItem={<Icon icon="plus" />} disabled>
          Ghost
        </Button>
        <Button
          color={ButtonColor.WARNING}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="plus" />}
          postItem={<Icon icon="plus" />}
          disabled
        >
          Text
        </Button>
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.WARNING} postItem={<Icon icon="question" />} variant={ButtonVariant.FILLED} />
        <Button color={ButtonColor.WARNING} postItem={<Icon icon="question" />} variant={ButtonVariant.WEAK} />
        <Button color={ButtonColor.WARNING} postItem={<Icon icon="question" />} variant={ButtonVariant.OUTLINED} />
        <Button color={ButtonColor.WARNING} postItem={<Icon icon="question" />} variant={ButtonVariant.GHOST} />
        <Button color={ButtonColor.WARNING} postItem={<Icon icon="question" />} variant={ButtonVariant.TEXT} />
        <Button
          color={ButtonColor.WARNING}
          postItem={<Icon icon="question" />}
          variant={ButtonVariant.FILLED}
          disabled
        />
        <Button color={ButtonColor.WARNING} postItem={<Icon icon="question" />} variant={ButtonVariant.WEAK} disabled />
        <Button
          color={ButtonColor.WARNING}
          postItem={<Icon icon="question" />}
          variant={ButtonVariant.OUTLINED}
          disabled
        />
        <Button
          color={ButtonColor.WARNING}
          postItem={<Icon icon="question" />}
          variant={ButtonVariant.GHOST}
          disabled
        />
        <Button color={ButtonColor.WARNING} postItem={<Icon icon="question" />} variant={ButtonVariant.TEXT} disabled />
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.DANGER} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button color={ButtonColor.DANGER} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button color={ButtonColor.DANGER} variant={ButtonVariant.OUTLINED} preItem={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button color={ButtonColor.DANGER} variant={ButtonVariant.GHOST} postItem={<Icon icon="plus" />}>
          Ghost
        </Button>
        <Button
          color={ButtonColor.DANGER}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="plus" />}
          postItem={<Icon icon="plus" />}
        >
          Text
        </Button>
        <Button color={ButtonColor.DANGER} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button color={ButtonColor.DANGER} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button color={ButtonColor.DANGER} variant={ButtonVariant.OUTLINED} preItem={<Icon icon="plus" />} disabled>
          Outlined
        </Button>
        <Button color={ButtonColor.DANGER} variant={ButtonVariant.GHOST} postItem={<Icon icon="plus" />} disabled>
          Ghost
        </Button>
        <Button
          color={ButtonColor.DANGER}
          variant={ButtonVariant.TEXT}
          preItem={<Icon icon="plus" />}
          postItem={<Icon icon="plus" />}
          disabled
        >
          Text
        </Button>
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.DANGER} postItem={<Icon icon="question" />} variant={ButtonVariant.FILLED} />
        <Button color={ButtonColor.DANGER} postItem={<Icon icon="question" />} variant={ButtonVariant.WEAK} />
        <Button color={ButtonColor.DANGER} postItem={<Icon icon="question" />} variant={ButtonVariant.OUTLINED} />
        <Button color={ButtonColor.DANGER} postItem={<Icon icon="question" />} variant={ButtonVariant.GHOST} />
        <Button color={ButtonColor.DANGER} postItem={<Icon icon="question" />} variant={ButtonVariant.TEXT} />
        <Button
          color={ButtonColor.DANGER}
          postItem={<Icon icon="question" />}
          variant={ButtonVariant.FILLED}
          disabled
        />
        <Button color={ButtonColor.DANGER} postItem={<Icon icon="question" />} variant={ButtonVariant.WEAK} disabled />
        <Button
          color={ButtonColor.DANGER}
          postItem={<Icon icon="question" />}
          variant={ButtonVariant.OUTLINED}
          disabled
        />
        <Button color={ButtonColor.DANGER} postItem={<Icon icon="question" />} variant={ButtonVariant.GHOST} disabled />
        <Button color={ButtonColor.DANGER} postItem={<Icon icon="question" />} variant={ButtonVariant.TEXT} disabled />
      </Button.Group>
    </>
  );
};

export const Icons = () => {
  return (
    <SandboxExamplesContainer>
      <SandboxExamplesContainer asRow>
        <Button variant={ButtonVariant.FILLED} color={ButtonColor.BRAND}>
          <Icon icon="loader" />
        </Button>
        <Button variant={ButtonVariant.FILLED} color={ButtonColor.NEUTRAL}>
          <Icon icon="loader" />
        </Button>
        <Button variant={ButtonVariant.FILLED} color={ButtonColor.SUCCESS}>
          <Icon icon="loader" />
        </Button>
        <Button variant={ButtonVariant.FILLED} color={ButtonColor.INFO}>
          <Icon icon="loader" />
        </Button>
        <Button variant={ButtonVariant.FILLED} color={ButtonColor.WARNING}>
          <Icon icon="loader" />
        </Button>
        <Button variant={ButtonVariant.FILLED} color={ButtonColor.DANGER}>
          <Icon icon="loader" />
        </Button>
      </SandboxExamplesContainer>
      <SandboxExamplesContainer asRow>
        <Button variant={ButtonVariant.OUTLINED} color={ButtonColor.BRAND}>
          <Icon icon="loader" />
        </Button>
        <Button variant={ButtonVariant.OUTLINED} color={ButtonColor.NEUTRAL}>
          <Icon icon="loader" />
        </Button>
        <Button variant={ButtonVariant.OUTLINED} color={ButtonColor.SUCCESS}>
          <Icon icon="loader" />
        </Button>
        <Button variant={ButtonVariant.OUTLINED} color={ButtonColor.INFO}>
          <Icon icon="loader" />
        </Button>
        <Button variant={ButtonVariant.OUTLINED} color={ButtonColor.WARNING}>
          <Icon icon="loader" />
        </Button>
        <Button variant={ButtonVariant.OUTLINED} color={ButtonColor.DANGER}>
          <Icon icon="loader" />
        </Button>
      </SandboxExamplesContainer>
      <SandboxExamplesContainer asRow>
        <Button variant={ButtonVariant.WEAK} color={ButtonColor.BRAND}>
          <Icon icon="loader" />
        </Button>
        <Button variant={ButtonVariant.WEAK} color={ButtonColor.NEUTRAL}>
          <Icon icon="loader" />
        </Button>
        <Button variant={ButtonVariant.WEAK} color={ButtonColor.SUCCESS}>
          <Icon icon="loader" />
        </Button>
        <Button variant={ButtonVariant.WEAK} color={ButtonColor.INFO}>
          <Icon icon="loader" />
        </Button>
        <Button variant={ButtonVariant.WEAK} color={ButtonColor.WARNING}>
          <Icon icon="loader" />
        </Button>
        <Button variant={ButtonVariant.WEAK} color={ButtonColor.DANGER}>
          <Icon icon="loader" />
        </Button>
      </SandboxExamplesContainer>
    </SandboxExamplesContainer>
  );
};

export const Shapes = () => {
  return (
    <>
      <Button shape={ButtonShape.CIRCLE} variant={ButtonVariant.FILLED}>
        <Icon icon="question" />
      </Button>
      <Button shape={ButtonShape.ROUNDED} variant={ButtonVariant.FILLED}>
        Rounded
      </Button>
    </>
  );
};

export const PrePostItems = () => {
  return (
    <>
      <div>Pre Item</div>
      <Button preItem={<Icon icon="question" />} variant={ButtonVariant.FILLED}>
        Button
      </Button>
      <div>Pre Item</div>
      <Button postItem={<Icon icon="question" />} variant={ButtonVariant.FILLED}>
        Button
      </Button>
      <div>Pre and Post Item</div>
      <Button preItem={<Icon icon="question" />} postItem={<Icon icon="question" />} variant={ButtonVariant.FILLED}>
        Button
      </Button>
    </>
  );
};

export const Toggle = () => {
  return (
    <>
      <Button.Group isAttached>
        <Button.Toggle postItem={<Icon icon="question" />} />
        <Button.Toggle>Weak</Button.Toggle>
        <Button.Toggle isSelected preItem={<Icon icon="plus" />}>
          Outlined
        </Button.Toggle>
        <Button.Toggle postItem={<Icon icon="plus" />} />
        <Button.Toggle preItem={<Icon icon="plus" />} postItem={<Icon icon="plus" />}>
          Text
        </Button.Toggle>
        <Button.Toggle disabled>Filled</Button.Toggle>
        <Button.Toggle disabled>Weak</Button.Toggle>
        <Button.Toggle preItem={<Icon icon="plus" />} disabled>
          Outlined
        </Button.Toggle>
        <Button.Toggle postItem={<Icon icon="plus" />} disabled>
          Ghost
        </Button.Toggle>
        <Button.Toggle preItem={<Icon icon="plus" />} postItem={<Icon icon="plus" />} disabled>
          Text
        </Button.Toggle>
      </Button.Group>
    </>
  );
};

export const Loading = () => {
  return (
    <>
      <Button.Group>
        <Button postItem={<Icon icon="question" />} variant={ButtonVariant.FILLED} state={ButtonState.IS_LOADING} />
        <Button
          color={ButtonColor.WARNING}
          variant={ButtonVariant.FILLED}
          state={ButtonState.IS_LOADING}
          preItem={<Icon icon="plus" />}
        >
          Filled
        </Button>
        <Button
          color={ButtonColor.WARNING}
          variant={ButtonVariant.OUTLINED}
          state={ButtonState.IS_LOADING}
          postItem={<Icon icon="plus" />}
        >
          Outline
        </Button>
        <Button
          color={ButtonColor.WARNING}
          variant={ButtonVariant.GHOST}
          state={ButtonState.IS_LOADING}
          preItem={<Icon icon="plus" />}
          postItem={<Icon icon="plus" />}
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
      test
    </>
  );
};

export const Sizes = () => {
  return (
    <SandboxExamplesContainer>
      <SandboxExamplesContainer>
        <div>Base</div>
        <Button.Group>
          <Button size={ButtonSize.BASE} variant={ButtonVariant.FILLED}>
            Base
          </Button>
          <Button size={ButtonSize.BASE} variant={ButtonVariant.FILLED} preItem={<Icon icon="plus" />}>
            Base
          </Button>
          <Button size={ButtonSize.BASE} variant={ButtonVariant.FILLED} postItem={<Icon icon="plus" />}>
            Base
          </Button>
          <Button size={ButtonSize.BASE} variant={ButtonVariant.FILLED} shape={ButtonShape.CIRCLE} icon="x" />
          <Button size={ButtonSize.BASE} variant={ButtonVariant.FILLED} shape={ButtonShape.CIRCLE} icon="plus" />
          <Button size={ButtonSize.BASE} variant={ButtonVariant.FILLED} disabled>
            Base (Disabled)
          </Button>
        </Button.Group>
      </SandboxExamplesContainer>
      <SandboxExamplesContainer>
        <div>Small</div>
        <Button.Group>
          <Button size={ButtonSize.SMALL} variant={ButtonVariant.FILLED}>
            Base
          </Button>
          <Button size={ButtonSize.SMALL} variant={ButtonVariant.FILLED} preItem={<Icon icon="plus" />}>
            Base
          </Button>
          <Button size={ButtonSize.SMALL} variant={ButtonVariant.FILLED} postItem={<Icon icon="plus" />}>
            Base
          </Button>
          <Button size={ButtonSize.SMALL} variant={ButtonVariant.FILLED} shape={ButtonShape.CIRCLE} icon="x" />
          <Button size={ButtonSize.SMALL} variant={ButtonVariant.FILLED} shape={ButtonShape.CIRCLE} icon="plus" />
          <Button size={ButtonSize.SMALL} variant={ButtonVariant.FILLED} disabled>
            Base (Disabled)
          </Button>
        </Button.Group>
      </SandboxExamplesContainer>
    </SandboxExamplesContainer>
  );
};
