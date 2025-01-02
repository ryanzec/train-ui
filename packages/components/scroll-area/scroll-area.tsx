import 'overlayscrollbars/overlayscrollbars.css';

import type { PartialOptions } from 'overlayscrollbars';

import { OverlayScrollbarsComponent, type OverlayScrollbarsComponentProps } from 'overlayscrollbars-solid';
import { splitProps } from 'solid-js';

import styles from '$/components/scroll-area/scroll-area.module.css';

const defaultScrollbarOptions: PartialOptions = {
  scrollbars: {
    autoHideDelay: 100,
  },
};

const ScrollArea = (passedProps: OverlayScrollbarsComponentProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['options']);
  const options = props.options || {};

  return (
    <OverlayScrollbarsComponent
      defer
      {...restOfProps}
      class={styles.scrollArea}
      options={{
        ...props.options,
        scrollbars: {
          ...options.scrollbars,
          ...defaultScrollbarOptions.scrollbars,
        },
      }}
    />
  );
};

export default ScrollArea;
