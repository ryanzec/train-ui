import Button, { ButtonSentiment, ButtonVariant } from '$/components/button';
import Card, { CardFooterAlignment } from '$/components/card';
import styles from '$/components/dialog/dialog.sandbox.module.css';
import Icon, { IconSize } from '$/components/icon';

export default {
  title: 'Components/Card',
};

export const Default = () => {
  return (
    <div>
      <Card class={styles.card}>content</Card>
      <Card class={styles.card} headerText="Header">
        content
      </Card>
      <Card class={styles.card} headerText="Header" headerPreItem={<Icon icon="home" size={IconSize.EXTRA_LARGE} />}>
        content
      </Card>
      <Card
        class={styles.card}
        headerText="Header"
        headerPreItem={<Icon icon="home" size={IconSize.EXTRA_LARGE} />}
        headerPostItem={
          <Button
            variant={ButtonVariant.TEXT}
            class={styles.closeHeaderTrigger}
            onclick={() => console.log('post item clicked')}
            preItem={<Icon icon="close" />}
          />
        }
      >
        content
      </Card>
      <Card
        class={styles.card}
        headerText="Header"
        headerPreItem={<Icon icon="home" size={IconSize.EXTRA_LARGE} />}
        headerPostItem={
          <Button
            variant={ButtonVariant.TEXT}
            class={styles.closeHeaderTrigger}
            onclick={() => console.log('post item clicked')}
            preItem={<Icon icon="close" />}
          />
        }
        footerElement={
          <Button.Group>
            <Button sentiment={ButtonSentiment.BRAND}>Action 1</Button>
            <Button sentiment={ButtonSentiment.NEUTRAL} variant={ButtonVariant.WEAK}>
              Action 2
            </Button>
          </Button.Group>
        }
      >
        content
      </Card>
      <Card
        class={styles.card}
        headerText="Header"
        headerPreItem={<Icon icon="home" size={IconSize.EXTRA_LARGE} />}
        headerPostItem={
          <Button
            variant={ButtonVariant.TEXT}
            class={styles.closeHeaderTrigger}
            onclick={() => console.log('post item clicked')}
            preItem={<Icon icon="close" />}
          />
        }
        footerAlignment={CardFooterAlignment.LEFT}
        footerElement={
          <Button.Group>
            <Button sentiment={ButtonSentiment.BRAND}>Action 1</Button>
            <Button sentiment={ButtonSentiment.NEUTRAL} variant={ButtonVariant.WEAK}>
              Action 2
            </Button>
          </Button.Group>
        }
      >
        content
      </Card>
      <Card
        class={styles.card}
        headerText="No content"
        headerPreItem={<Icon icon="home" size={IconSize.EXTRA_LARGE} />}
        headerPostItem={
          <Button
            variant={ButtonVariant.TEXT}
            class={styles.closeHeaderTrigger}
            onclick={() => console.log('post item clicked')}
            preItem={<Icon icon="close" />}
          />
        }
      />
    </div>
  );
};
