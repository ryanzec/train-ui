import classnames from 'classnames';
import { type JSX, Show, mergeProps, onCleanup, splitProps } from 'solid-js';

import Overlay from '$/components/overlay';
import styles from '$/components/peek/peek.module.css';
import type { PeekStore } from '$/components/peek/utils';
import type { CommonDataAttributes } from '$/types/generic';
import { Portal } from 'solid-js/web';

export type PeekProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    peekStore: PeekStore;
    hasOverlay?: boolean;
    closeOnClickOverlay?: boolean;
    closeOnEscape?: boolean;
    closeEnabled?: boolean;
    isResizable?: boolean;
  };

const Peek = (passedProps: PeekProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      { hasOverlay: true, closeOnClickOverlay: false, closeOnEscape: true, isResizable: false, closeEnabled: true },
      passedProps,
    ),
    [
      'children',
      'class',
      'hasOverlay',
      'closeOnClickOverlay',
      'peekStore',
      'isResizable',
      'closeOnEscape',
      'closeEnabled',
    ],
  );

  let peekElement: HTMLElement | undefined;
  let xResizeLeft = 0;
  let isDragging = false;
  let dragXStart = 0;
  let dragWidthStart = 0;

  const handleClickOverlay = () => {
    if (props.closeEnabled === false || props.closeOnClickOverlay === false) {
      return;
    }

    props.peekStore.setIsOpened(false);
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (props.closeEnabled === false || props.closeOnEscape === false || event.key !== 'Escape') {
      return;
    }

    props.peekStore.setIsOpened(false);
  };

  const handleWindowMouseMove = (event: MouseEvent) => {
    if (!peekElement) {
      return;
    }

    const moveDiff = event.pageX - dragXStart;

    peekElement.style.width = `${dragWidthStart + moveDiff * -1}px`;
  };

  const handleWindowMouseUp = () => {
    isDragging = false;
    document.body.style.userSelect = 'initial';
    document.body.style.cursor = 'auto';

    window.removeEventListener('mouseup', handleWindowMouseUp);
    window.removeEventListener('mousemove', handleWindowMouseMove);
  };

  const handlePeekMouseDown = (event: MouseEvent) => {
    if (!peekElement) {
      return;
    }

    const peekBoundingRect = peekElement.getBoundingClientRect();

    xResizeLeft = peekBoundingRect.x;
    isDragging = event.pageX >= xResizeLeft && event.pageX <= xResizeLeft + 5;

    if (!isDragging) {
      return;
    }

    dragXStart = event.pageX;
    dragWidthStart = peekBoundingRect.width;

    document.body.style.userSelect = 'none';

    window.addEventListener('mouseup', handleWindowMouseUp);
    window.addEventListener('mousemove', handleWindowMouseMove);
  };

  const handlePeekMouseMove = (event: MouseEvent) => {
    if (!peekElement) {
      return;
    }

    xResizeLeft = peekElement.getBoundingClientRect().x;

    const isDraggingArea = event.pageX >= xResizeLeft && event.pageX <= xResizeLeft + 5;

    if (!isDraggingArea) {
      document.body.style.cursor = 'auto';

      return;
    }

    document.body.style.cursor = 'ew-resize';
  };

  const handlePeekClosers = () => {
    if (props.closeEnabled === false) {
      return;
    }

    props.peekStore.setIsOpened(false);
  };

  const setupCloseEvents = (element: HTMLElement) => {
    const closeElements = element.querySelectorAll('[data-peek-close="true"]');

    for (const closeElement of closeElements) {
      closeElement.addEventListener('click', handlePeekClosers);
    }
  };

  const setupResizeEvents = (element: HTMLElement) => {
    if (props.isResizable === false) {
      return;
    }

    element.addEventListener('mousemove', handlePeekMouseMove);
    element.addEventListener('mousedown', handlePeekMouseDown);
  };

  const peekRef = (element: HTMLDivElement) => {
    peekElement = element;

    document.addEventListener('keydown', handleKeyUp);

    queueMicrotask(() => {
      setupCloseEvents(element);
      setupResizeEvents(element);
    });

    onCleanup(() => {
      document.removeEventListener('keydown', handleKeyUp);
    });
  };

  return (
    <Show when={props.peekStore.isOpened()}>
      <Portal>
        <div data-id="peek">
          <div ref={peekRef} {...restOfProps} class={classnames(styles.peek, props.class)}>
            {props.children}
          </div>
          <Show when={props.hasOverlay}>
            <Overlay onClick={handleClickOverlay} />
          </Show>
        </div>
      </Portal>
    </Show>
  );
};

export default Peek;
