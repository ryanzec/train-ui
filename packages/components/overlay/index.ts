import Overlay from '$/components/overlay/overlay';
import Content from '$/components/overlay/overlay-content';
import ContentLocal from '$/components/overlay/overlay-content-local';
import Local from '$/components/overlay/overlay-local';

export { OverlayStrength } from '$/components/overlay/utils';
export type { OverlayProps } from '$/components/overlay/utils';

export default Object.assign(Overlay, { Content, Local, ContentLocal });
