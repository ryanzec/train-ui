import Button, { ButtonSentiment } from '$/components/button';
import Peek, { peekComponentUtils } from '$/components/peek';

export default {
  title: 'Components/Peek',
};

export const Default = () => {
  const peekStore = peekComponentUtils.createStore();

  return (
    <>
      <Button onClick={() => peekStore.setIsOpened(true)}>open peek</Button>
      <Peek peekStore={peekStore}>
        <Peek.Header title="Peek Header" />
        <Peek.Content>Content</Peek.Content>
        <Peek.Footer>
          <Button.Group>
            <Peek.CloseButton />
            <Button>Process</Button>
          </Button.Group>
        </Peek.Footer>
      </Peek>
    </>
  );
};

export const Resizeable = () => {
  const peekStore = peekComponentUtils.createStore();

  return (
    <>
      <Button onClick={() => peekStore.setIsOpened(true)}>open peek</Button>
      <Peek peekStore={peekStore} isResizable>
        <Peek.Header title="Peek Header" />
        <Peek.Content>Content</Peek.Content>
        <Peek.Footer>
          <Button.Group>
            <Peek.CloseButton />
            <Button>Process</Button>
          </Button.Group>
        </Peek.Footer>
      </Peek>
    </>
  );
};

export const Scrollable = () => {
  const peekStore = peekComponentUtils.createStore();

  return (
    <>
      <Button onClick={() => peekStore.setIsOpened(true)}>open peek</Button>
      <Peek peekStore={peekStore} isResizable>
        <Peek.Header title="Peek Header" />
        <Peek.Content>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
        </Peek.Content>
        <Peek.Footer>
          <Button.Group>
            <Peek.CloseButton />
            <Button>Process</Button>
          </Button.Group>
        </Peek.Footer>
      </Peek>
    </>
  );
};
