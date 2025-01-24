import classnames from 'classnames';
import { type JSX, Show, mergeProps, splitProps } from 'solid-js';

import styles from '$/components/skeleton/skeleton.module.css';

export type SkeletonProps = JSX.HTMLAttributes<HTMLDivElement> & {
  barCount?: number;

  // this used to give bars consistently repeating variable lengths for the bars
  variableLength?: boolean;
};

const variableLengthClasses = [
  styles.variableLength1,
  styles.variableLength2,
  styles.variableLength3,
  styles.variableLength4,
  styles.variableLength5,
];

const Skeleton = (passedProps: SkeletonProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ barCount: 5, variableLength: false }, passedProps), [
    'class',
    'barCount',
    'variableLength',
  ]);
  const bars: JSX.Element[] = [];

  for (let i = 0; i < props.barCount; i++) {
    const index = i % variableLengthClasses.length;

    bars.push(<div class={classnames(styles.bar, { [variableLengthClasses[index]]: props.variableLength })} />);
  }

  return (
    <div data-id="skeleton" {...restOfProps} class={classnames(styles.container, props.class)}>
      {bars}
    </div>
  );
};

export default Skeleton;
