import Page, { type PageProps } from '$web/components/page/page';
import Header, { type PageHeaderProps } from '$web/components/page/page-header';

export type { PageProps, PageHeaderProps };

export default Object.assign(Page, { Header });
