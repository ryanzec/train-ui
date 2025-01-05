import { type Accessor, onCleanup } from 'solid-js';

export default function clickOutsideDirective(element: HTMLElement, callbackAccessor?: Accessor<() => void>) {
  if (!callbackAccessor) {
    return;
  }

  const callback = callbackAccessor();

  if (!callback) {
    return;
  }

  const handleClick = (event: MouseEvent) => {
    if (element.contains(event.target as Node)) {
      return;
    }

    callback();
  };

  document.body.addEventListener('click', handleClick);

  onCleanup(() => document.body.removeEventListener('click', handleClick));
}
