import Peek, { type PeekProps } from '$/components/peek/peek';
import CloseButton from '$/components/peek/peek-close-button';
import Content, { type PeekContentProps } from '$/components/peek/peek-content';
import Footer, { type PeekFooterProps } from '$/components/peek/peek-footer';
import Header, { type PeekHeaderProps } from '$/components/peek/peek-header';

export { peekComponentUtils, type PeekStore } from '$/components/peek/utils';
export type { PeekProps, PeekHeaderProps, PeekContentProps, PeekFooterProps };

export default Object.assign(Peek, { Header, Content, Footer, CloseButton });
