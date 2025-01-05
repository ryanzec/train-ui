import 'overlayscrollbars/overlayscrollbars.css';

import type { PartialOptions } from 'overlayscrollbars';

import { OverlayScrollbarsComponent, type OverlayScrollbarsComponentProps } from 'overlayscrollbars-solid';
import { children, splitProps } from 'solid-js';

import styles from '$/components/scroll-area/scroll-area.module.css';
import classnames from 'classnames';

const defaultScrollbarOptions: PartialOptions = {
  scrollbars: {
    autoHideDelay: 100,
  },
};

const ScrollArea = (passedProps: OverlayScrollbarsComponentProps) => {
  const [props] = splitProps(passedProps, ['options', 'class', 'children']);
  const options = props.options || {};

  // @todo(refactor) this is to work around a bug in OverlayScrollbars that cause a double render of content
  // @todo(refactor) depending if the top element wrapped uses a signal
  // @todo(refactor) reference: https://github.com/KingSora/OverlayScrollbars/issues/700
  const contentAsVariable = children(() => props.children);

  return (
    <OverlayScrollbarsComponent
      defer
      class={classnames(styles.scrollArea, props.class)}
      options={{
        ...props.options,
        scrollbars: {
          ...options.scrollbars,
          ...defaultScrollbarOptions.scrollbars,
        },
      }}
    >
      {contentAsVariable()}
    </OverlayScrollbarsComponent>
  );
};

export default ScrollArea;
