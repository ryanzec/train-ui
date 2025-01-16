import Tooltip, { type TooltipProps } from '$/components/tooltip/tooltip';
import Content, { type TooltipContentProps } from '$/components/tooltip/tooltip-content';
import Handle, { type TooltipHandleProps } from '$/components/tooltip/tooltip-handle';

export { TooltipTriggerEvent, tooltipComponentUtils } from '$/components/tooltip/utils';
export type { TooltipStore } from '$/components/tooltip/utils';

export type { TooltipProps, TooltipHandleProps, TooltipContentProps };

export default Object.assign(Tooltip, { Handle, Content });
