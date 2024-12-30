import Icon, { IconSentiment, IconSize } from '$/components/icon';

export default {
  title: 'Components/Icon',
};

export const Sentiment = () => {
  return (
    <>
      <div>
        <Icon icon="refresh" sentiment={IconSentiment.NEUTRAL} />
      </div>
      <div>
        <Icon icon="refresh" sentiment={IconSentiment.BRAND} />
      </div>
      <div>
        <Icon icon="refresh" sentiment={IconSentiment.SUCCESS} />
      </div>
      <div>
        <Icon icon="refresh" sentiment={IconSentiment.INFO} />
      </div>
      <div>
        <Icon icon="refresh" sentiment={IconSentiment.WARNING} />
      </div>
      <div>
        <Icon icon="refresh" sentiment={IconSentiment.DANGER} />
      </div>
    </>
  );
};

export const Sizes = () => {
  return (
    <>
      <div>
        <Icon icon="refresh" sentiment={IconSentiment.NEUTRAL} size={IconSize.EXTRA_SMALL} />
      </div>
      <div>
        <Icon icon="refresh" sentiment={IconSentiment.BRAND} size={IconSize.SMALL} />
      </div>
      <div>
        <Icon icon="refresh" sentiment={IconSentiment.SUCCESS} size={IconSize.BASE} />
      </div>
      <div>
        <Icon icon="refresh" sentiment={IconSentiment.INFO} size={IconSize.LARGE} />
      </div>
      <div>
        <Icon icon="refresh" sentiment={IconSentiment.WARNING} size={IconSize.EXTRA_LARGE} />
      </div>
      <div>
        <Icon icon="refresh" sentiment={IconSentiment.DANGER} size={IconSize.EXTRA_LARGE2} />
      </div>
    </>
  );
};
