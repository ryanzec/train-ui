import type { ParentProps } from 'solid-js';

// this is mainly used for passing to Dynamic when you do want an extra element
const NoWrapper = (props: ParentProps) => props.children;

export default NoWrapper;
