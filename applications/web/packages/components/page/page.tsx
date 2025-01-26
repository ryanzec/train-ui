import type { CommonDataAttributes } from '$/types/generic';
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

  return <div data-id="page" {...resetOfProps} />;
};

export default Page;
