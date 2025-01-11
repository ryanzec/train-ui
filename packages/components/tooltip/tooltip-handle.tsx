import { type JSX, splitProps, useContext } from 'solid-js';

import { TooltipContext } from '$/components/tooltip/tooltip';
import styles from '$/components/tooltip/tooltip.module.css';
import { loggerUtils } from '$/utils/logger';
import classnames from 'classnames';

export type TooltipHandleProps = JSX.HTMLAttributes<HTMLSpanElement>;

const TooltipHandle = (passedProps: TooltipHandleProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class']);
  const context = useContext(TooltipContext);

  if (!context) {
    loggerUtils.error('tooltip content must be contained in a tooltip context');
    // @todo(log) log error to backend?

    return;
  }

  return (
    <span
      data-id="tooltip-handle"
      data-tooltip-handle={context.id()}
      class={classnames(styles.handle, props.class)}
      {...restOfProps}
    />
  );
};

export default TooltipHandle;
