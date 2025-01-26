import type { CommonDataAttributes } from '$/types/generic';
import styles from '$web/components/page/page.module.css';
import classnames from 'classnames';
import { type JSX, mergeProps, splitProps } from 'solid-js';

export const PageLayout = {
  DEFAULT: 'default',
  CENTERED: 'centered',
};

export type PageLayout = (typeof PageLayout)[keyof typeof PageLayout];

export type PageProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    layout?: PageLayout;
  };

const Page = (passedProps: PageProps) => {
  const [props, resetOfProps] = splitProps(mergeProps({ layout: PageLayout.DEFAULT }, passedProps), [
    'class',
    'layout',
  ]);

  return (
    <div
      data-id="page"
      class={classnames(styles.page, props.class, {
        [styles.centered]: props.layout === PageLayout.CENTERED,
      })}
      {...resetOfProps}
    />
  );
};

export default Page;
