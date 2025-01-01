import type { DragDropId } from '$/components/drag-drop/utils';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { CleanupFn } from '@atlaskit/pragmatic-drag-and-drop/types';
import { type JSX, onCleanup, onMount } from 'solid-js';

export type DraggableProps = JSX.HTMLAttributes<HTMLDivElement> & {
  draggableId: DragDropId;
  droppableId?: DragDropId;
  isDroppable?: boolean;
};

const Draggable = (props: DraggableProps) => {
  let elementRef: HTMLDivElement | undefined;

  onMount(() => {
    if (!elementRef) {
      return;
    }

    const dragHandle = elementRef.querySelector('[data-drag-handle="true"]');

    const cleanupDraggable = draggable({
      element: elementRef,
      dragHandle: (dragHandle as Element) ?? null,
      getInitialData: () => ({
        draggableId: props.draggableId,
        droppableId: props.droppableId,
      }),
      onDragStart: ({ source }) => {
        source.element.dataset.isDragging = 'true';
      },
      onDrop: ({ source }) => {
        source.element.removeAttribute('data-is-dragging');
      },
    });

    let cleanupDroppable: CleanupFn | undefined = undefined;

    if (props.isDroppable) {
      cleanupDroppable = dropTargetForElements({
        element: elementRef,
        getData: () => ({
          draggableId: props.draggableId,
          droppableId: props.droppableId,
        }),
        getDropEffect: () => 'move',
        onDragEnter: ({ self }) => {
          // (self.element as HTMLElement).dataset.isDropping = 'true';
        },
        onDragLeave: ({ self }) => {
          // (self.element as HTMLElement).removeAttribute('data-is-dropping');
        },
        onDrop: (args) => {
          // (self.element as HTMLElement).removeAttribute('data-is-dropping');
          // props.onDropOn?.(args);
        },
      });
    }

    onCleanup(() => {
      cleanupDraggable();
      cleanupDroppable?.();
    });
  });

  return (
    <div
      ref={elementRef}
      class={props.class}
      data-is-draggable="true"
      data-is-droppable={props.isDroppable && props.droppableId ? 'true' : 'false'}
    >
      {props.children}
    </div>
  );
};

export default Draggable;
