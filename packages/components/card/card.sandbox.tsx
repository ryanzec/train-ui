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
      <Card class={styles.card} headerText="Header" headerPreItem={<Icon icon="home" size={IconSize.LARGE2} />}>
        content
      </Card>
      <Card
        class={styles.card}
        headerText="Header"
        headerPreItem={<Icon icon="home" size={IconSize.LARGE2} />}
        headerPostItem={
          <Button.IconButton
            variant={ButtonVariant.TEXT}
            class={styles.closeHeaderTrigger}
            onclick={() => console.log('post item clicked')}
            icon="close"
          />
        }
      >
        content
      </Card>
      <Card
        class={styles.card}
        headerText="Header"
        headerPreItem={<Icon icon="home" size={IconSize.LARGE2} />}
        headerPostItem={
          <Button.IconButton
            variant={ButtonVariant.TEXT}
            class={styles.closeHeaderTrigger}
            onclick={() => console.log('post item clicked')}
            icon="close"
          />
        }
        footerElement={
          <>
            <Button sentiment={ButtonSentiment.BRAND}>Action 1</Button>
            <Button sentiment={ButtonSentiment.NEUTRAL} variant={ButtonVariant.WEAK}>
              Action 2
            </Button>
          </>
        }
      >
        content
      </Card>
      <Card
        class={styles.card}
        headerText="Header"
        headerPreItem={<Icon icon="home" size={IconSize.LARGE2} />}
        headerPostItem={
          <Button.IconButton
            variant={ButtonVariant.TEXT}
            class={styles.closeHeaderTrigger}
            onclick={() => console.log('post item clicked')}
            icon="close"
          />
        }
        footerAlignment={CardFooterAlignment.LEFT}
        footerElement={
          <>
            <Button sentiment={ButtonSentiment.BRAND}>Action 1</Button>
            <Button sentiment={ButtonSentiment.NEUTRAL} variant={ButtonVariant.WEAK}>
              Action 2
            </Button>
          </>
        }
      >
        content
      </Card>
      <Card
        class={styles.card}
        headerText="No content"
        headerPreItem={<Icon icon="home" size={IconSize.LARGE2} />}
        headerPostItem={
          <Button.IconButton
            variant={ButtonVariant.TEXT}
            class={styles.closeHeaderTrigger}
            onclick={() => console.log('post item clicked')}
            icon="close"
          />
        }
      />
    </div>
  );
};
