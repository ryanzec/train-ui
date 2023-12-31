import { Accessor, createSignal } from 'solid-js';

export enum TooltipTriggerEvent {
	CLICK = 'click',
	HOVER = 'hover',
	STRICT_HOVER = 'strict-hover',
}

interface CreateStoreParams {
	defaultIsEnabled?: boolean;
}

export interface TooltipStore {
	isEnabled: Accessor<boolean>;
	toggle: (overrideIsEnabled?: boolean) => void;
}

const createStore = (params: CreateStoreParams = {}): TooltipStore => {
	const [isEnabled, setIsEnabled] = createSignal(params.defaultIsEnabled ?? false);

	const toggle = (overrideIsEnabled?: boolean) => {
		if (overrideIsEnabled === true || overrideIsEnabled === false) {
			setIsEnabled(overrideIsEnabled);
			return;
		}

		setIsEnabled(!isEnabled());
	};

	return {
		isEnabled,
		toggle,
	};
};

export const tooltipUtils = {
	createStore,
};
