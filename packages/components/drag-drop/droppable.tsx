import { type JSX, onCleanup } from 'solid-js';

import type { DragDropId } from '$/components/drag-drop/utils';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import classnames from 'classnames';

export type DroppableProps = JSX.HTMLAttributes<HTMLDivElement> & {
  id: DragDropId;
};

const Droppable = (props: DroppableProps) => {
  const setupDroppable = (element: HTMLElement) => {
    const droppableCleanup = dropTargetForElements({
      element,
      getData: () => ({
        droppableId: props.id,
      }),
      getDropEffect: () => 'move',
      onDragEnter: ({ self }) => {
        (self.element as HTMLElement).dataset.isDropping = 'true';
      },
      onDragLeave: ({ self }) => {
        (self.element as HTMLElement).removeAttribute('data-is-dropping');
      },
      onDrop: ({ self }) => {
        (self.element as HTMLElement).removeAttribute('data-is-dropping');
      },
    });

    onCleanup(() => {
      droppableCleanup();
    });
  };

  return (
    <div ref={setupDroppable} class={props.class}>
      {props.children}
    </div>
  );
};

export default Droppable;
