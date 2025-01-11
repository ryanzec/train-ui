import { type JSX, splitProps, useContext } from 'solid-js';

import { TooltipContext } from '$/components/tooltip/tooltip';
import styles from '$/components/tooltip/tooltip.module.css';
import { loggerUtils } from '$/utils/logger';
import classnames from 'classnames';
import { Portal } from 'solid-js/web';

export type TooltipContentProps = JSX.HTMLAttributes<HTMLDivElement>;

const TooltipContent = (passedProps: TooltipContentProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class']);
  const context = useContext(TooltipContext);

  if (!context) {
    loggerUtils.error('tooltip content must be contained in a tooltip context');
    // @todo(log) log error to backend?

    return;
  }

  return (
    <Portal>
      <div
        data-id="tooltip-content"
        data-tooltip-content={context.id()}
        class={classnames(styles.content, props.class, {
          [styles.contentIsEnabled]: context.isEnabled(),
        })}
        {...restOfProps}
      />
    </Portal>
  );
};

export default TooltipContent;
