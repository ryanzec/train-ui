import { IconSize } from '$/components/icon';
import Loading from '$/components/loading';
import styles from '$/components/loading/loading.sandbox.module.css';

export default {
  title: 'Components/Loading',
};

export const General = () => {
  return (
    <div>
      <Loading iconSize={IconSize.SMALL1} />
      <Loading iconSize={IconSize.BASE} />
      <Loading iconSize={IconSize.LARGE1} />
      <Loading iconSize={IconSize.LARGE2} />
      <Loading iconSize={IconSize.LARGE3} />
    </div>
  );
};

export const Section = () => {
  return (
    <>
      <div class={styles.section}>
        Overlayed content
        <Loading.Section>Section overlay loading</Loading.Section>
      </div>
      <div>Non-Overlayed content</div>
    </>
  );
};
