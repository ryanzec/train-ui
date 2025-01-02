import Icon, { IconColor, IconSize } from '$/components/icon';

export default {
  title: 'Components/Icon',
};

export const Colors = () => {
  return (
    <>
      <div>
        <Icon icon="refresh" color={IconColor.NEUTRAL} />
      </div>
      <div>
        <Icon icon="refresh" color={IconColor.BRAND} />
      </div>
      <div>
        <Icon icon="refresh" color={IconColor.SUCCESS} />
      </div>
      <div>
        <Icon icon="refresh" color={IconColor.INFO} />
      </div>
      <div>
        <Icon icon="refresh" color={IconColor.WARNING} />
      </div>
      <div>
        <Icon icon="refresh" color={IconColor.DANGER} />
      </div>
    </>
  );
};

export const Sizes = () => {
  return (
    <>
      <div>
        <Icon icon="refresh" color={IconColor.NEUTRAL} size={IconSize.EXTRA_SMALL} />
      </div>
      <div>
        <Icon icon="refresh" color={IconColor.BRAND} size={IconSize.SMALL} />
      </div>
      <div>
        <Icon icon="refresh" color={IconColor.SUCCESS} size={IconSize.BASE} />
      </div>
      <div>
        <Icon icon="refresh" color={IconColor.INFO} size={IconSize.LARGE} />
      </div>
      <div>
        <Icon icon="refresh" color={IconColor.WARNING} size={IconSize.EXTRA_LARGE} />
      </div>
      <div>
        <Icon icon="refresh" color={IconColor.DANGER} size={IconSize.EXTRA_LARGE2} />
      </div>
    </>
  );
};
