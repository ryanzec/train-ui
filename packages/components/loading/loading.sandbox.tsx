import Loading from '$/components/loading';
import styles from '$/components/loading/loading.sandbox.module.css';

export default {
  title: 'Components/Loading',
};

export const General = () => {
  return (
    <div>
      <Loading />
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
