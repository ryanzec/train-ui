import { onCleanup, Accessor } from 'solid-js';

export default function clickOutside(element: HTMLElement, callback?: Accessor<() => void>) {
	if (!callback) {
		return;
	}

	const onClick = (event: MouseEvent) => {
		if (element.contains(event.target as Node)) {
			return;
		}

		callback()?.();
	};

	document.body.addEventListener('click', onClick);

	onCleanup(() => document.body.removeEventListener('click', onClick));
}
