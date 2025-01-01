import { type Placement, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { type JSX, type ParentProps, createEffect, createSignal, mergeProps, onCleanup, splitProps } from 'solid-js';

import { type TooltipStore, TooltipTriggerEvent } from '$/components/tooltip/utils';
import { clickOutside } from '$/stores/click-outside';

// this is needed to avoid this code being stripped in compilation because of the way directive work in SolidJS
clickOutside;

export type TooltipProps = JSX.HTMLAttributes<HTMLDivElement> & {
  placement?: Placement;
  store: TooltipStore;
  triggerEvent?: TooltipTriggerEvent;
};

const Tooltip = (passedProps: ParentProps<TooltipProps>) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        placement: 'bottom-end',
        triggerEvent: TooltipTriggerEvent.HOVER,
      } as Required<TooltipProps>,
      passedProps,
    ),
    ['placement', 'triggerEvent', 'store', 'children'],
  );

  const [containerElement, setContainerElement] = createSignal<HTMLDivElement>();

  const enabledTooltip = () => {
    props.store.toggle(true);
  };

  const disableToolTip = () => {
    props.store.toggle(false);
  };

  const toggleTooltip = () => {
    props.store.toggle();
  };

  // make sure that event handler are properly attached based of the trigger event
  createEffect(() => {
    const currentContainerElement = containerElement();

    if (!currentContainerElement) {
      return;
    }

    // we need to use :scope so that the selector only look at direct children
    const handleElement = currentContainerElement.querySelector(':scope > :nth-child(1)');
    const contentElement = currentContainerElement.querySelector(':scope > :nth-child(2)') as HTMLElement;

    if (!handleElement || !contentElement) {
      if (import.meta.env.MODE !== 'production') {
        console.error('tooltip component must have 2 children to function properly');
      } else {
        // @todo(logging) add logging once we have a solution for that for frontend code
      }

      return;
    }

    // since the trigger event can change, we want to remove any existing event handlers to account for that
    handleElement.removeEventListener('mouseover', enabledTooltip);
    handleElement.removeEventListener('mouseout', disableToolTip);
    handleElement.removeEventListener('mouseenter', enabledTooltip);
    handleElement.removeEventListener('mouseexit', disableToolTip);
    handleElement.removeEventListener('click', toggleTooltip);

    switch (props.triggerEvent) {
      case TooltipTriggerEvent.HOVER:
        handleElement.addEventListener('mouseover', enabledTooltip);
        handleElement.addEventListener('mouseout', disableToolTip);

        break;

      case TooltipTriggerEvent.STRICT_HOVER:
        // mouse enter / exit event only triggers on the specific element and not any children
        handleElement.addEventListener('mouseenter', enabledTooltip);
        handleElement.addEventListener('mouseexit', disableToolTip);

        break;

      default:
        handleElement.addEventListener('click', toggleTooltip);

        break;
    }

    const updatePosition = () => {
      computePosition(handleElement, contentElement, {
        placement: props.placement,
        // @todo(feature) should this be configurable?
        middleware: [flip(), shift(), offset(5)],
      }).then(({ x, y }) => {
        contentElement.style.top = `${y}px`;
        contentElement.style.left = `${x}px`;
      });
    };

    const cleanup = autoUpdate(handleElement, contentElement, updatePosition);

    onCleanup(() => {
      cleanup();
    });
  });

  const containerRef = (element: HTMLDivElement) => {
    setContainerElement(element);
  };

  return (
    <div
      {...restOfProps}
      use:clickOutside={props.triggerEvent === TooltipTriggerEvent.CLICK ? disableToolTip : undefined}
      ref={containerRef}
    >
      {props.children}
    </div>
  );
};

export default Tooltip;
