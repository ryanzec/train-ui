import DragDrop, { dragDropComponentUtils, type DragDropItem } from '$/components/drag-drop';
import styles from '$/components/drag-drop/drag-drop.sandbox.module.css';
import Icon, { IconSize } from '$/components/icon';
import { loggerUtils } from '$/utils/logger';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { For, batch, createSignal, onCleanup, onMount } from 'solid-js';

export default {
  title: 'Components/DragDrop',
};

type DragDropListItem = DragDropItem<{
  display: string;
}>;

export const Kanban = () => {
  const [list1, setList1] = createSignal<DragDropListItem[]>([
    { id: '1', item: { display: '1' } },
    { id: '2', item: { display: '2' } },
    { id: '3', item: { display: '3' } },
    { id: '4', item: { display: '4' } },
    { id: '5', item: { display: '5' } },
    { id: '6', item: { display: '6' } },
  ]);
  const [list2, setList2] = createSignal<DragDropListItem[]>([]);
  const [list3, setList3] = createSignal<DragDropListItem[]>([]);

  const accessors = { '1': list1, '2': list2, '3': list3 };
  const setters = { '1': setList1, '2': setList2, '3': setList3 };
  type setterAccessorKeys = keyof typeof setters;

  onMount(() => {
    const monitorCleanup = monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];

        if (!destination) {
          loggerUtils.warn('no destination target found for drag and drop');

          return;
        }

        const destinationElement = destination.element as HTMLElement;
        const destinationIsDraggable = dragDropComponentUtils.isDraggable(destinationElement);
        const destinationDraggableId = destination.data.draggableId;
        const destinationDroppableId = destination.data.droppableId;
        const destinationListAccessor = accessors[destinationDroppableId as setterAccessorKeys];
        const destinationListSetter = setters[destinationDroppableId as setterAccessorKeys];
        const destinationIndex = destinationListAccessor().findIndex((item) => item.id === destinationDraggableId);

        const sourceElement = source.element as HTMLElement;
        const sourceDraggableId = source.data.draggableId;
        const sourceDroppableId = source.data.droppableId;
        const sourceListAccessor = accessors[sourceDroppableId as setterAccessorKeys];
        const sourceListSetter = setters[sourceDroppableId as setterAccessorKeys];
        const sourceIndex = sourceListAccessor().findIndex((item) => item.id === sourceDraggableId);

        const isDroppingOnDraggable = dragDropComponentUtils.isDroppingOnDraggable(sourceElement, destinationElement);
        const destinationAndSourceAreTheSame = destinationDroppableId === sourceDroppableId;

        if (!sourceDraggableId) {
          loggerUtils.warn('source draggable id not found');

          return;
        }

        batch(() => {
          // since we are in the same list and dropping on a draggable, we need to swap the items
          if (destinationAndSourceAreTheSame && isDroppingOnDraggable) {
            dragDropComponentUtils.shiftItems(sourceListAccessor, sourceListSetter, sourceIndex, destinationIndex);

            return;
          }

          dragDropComponentUtils.moveItem(destinationListSetter, sourceListSetter, sourceListAccessor()[sourceIndex]);

          // this make sure that when drag and item from one list to another, this item is move to the location it
          // was dragged on
          if (destinationIsDraggable) {
            dragDropComponentUtils.shiftItems(
              destinationListAccessor,
              destinationListSetter,
              destinationListAccessor().length - 1,
              destinationIndex,
            );
          }
        });
      },
    });

    onCleanup(() => {
      monitorCleanup();
    });
  });

  return (
    <div class={styles.listsContainer}>
      <DragDrop.Droppable id="1" class={styles.list}>
        <For each={list1()}>
          {(item) => (
            <DragDrop.Draggable class={styles.listItem} draggableId={item.id} droppableId="1" isDroppable>
              {item.item.display}
            </DragDrop.Draggable>
          )}
        </For>
      </DragDrop.Droppable>
      <DragDrop.Droppable id="2" class={styles.list}>
        <For each={list2()}>
          {(item) => (
            <DragDrop.Draggable class={styles.listItem} draggableId={item.id} droppableId="2" isDroppable>
              {item.item.display}
            </DragDrop.Draggable>
          )}
        </For>
      </DragDrop.Droppable>
      <DragDrop.Droppable id="3" class={styles.list}>
        <For each={list3()}>
          {(item) => (
            <DragDrop.Draggable class={styles.listItem} draggableId={item.id} droppableId="3" isDroppable>
              {item.item.display}
            </DragDrop.Draggable>
          )}
        </For>
      </DragDrop.Droppable>
    </div>
  );
};

export const SwapItems = () => {
  const [list1, setList1] = createSignal<DragDropListItem[]>([
    { id: '1', item: { display: '1' } },
    { id: '2', item: { display: '2' } },
    { id: '3', item: { display: '3' } },
    { id: '4', item: { display: '4' } },
    { id: '5', item: { display: '5' } },
    { id: '6', item: { display: '6' } },
  ]);

  const accessors = { '1': list1 };
  const setters = { '1': setList1 };
  type setterAccessorKeys = keyof typeof setters;

  onMount(() => {
    const monitorCleanup = monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];

        if (!destination) {
          loggerUtils.warn('no destination target found for drag and drop');

          return;
        }

        const destinationElement = destination.element as HTMLElement;
        const destinationDraggableId = destination.data.draggableId;
        const destinationDroppableId = destination.data.droppableId;
        const destinationListAccessor = accessors[destinationDroppableId as setterAccessorKeys];
        const destinationIndex = destinationListAccessor().findIndex((item) => item.id === destinationDraggableId);

        const sourceElement = source.element as HTMLElement;
        const sourceDraggableId = source.data.draggableId;
        const sourceDroppableId = source.data.droppableId;
        const sourceListAccessor = accessors[sourceDroppableId as setterAccessorKeys];
        const sourceListSetter = setters[sourceDroppableId as setterAccessorKeys];
        const sourceIndex = sourceListAccessor().findIndex((item) => item.id === sourceDraggableId);

        const isDroppingOnDraggable = dragDropComponentUtils.isDroppingOnDraggable(sourceElement, destinationElement);
        const destinationAndSourceAreTheSame = destinationDroppableId === sourceDroppableId;

        if (!sourceDraggableId) {
          loggerUtils.warn('source draggable id not found');

          return;
        }

        // since we are in the same list and dropping on a draggable, we need to swap the items
        if (destinationAndSourceAreTheSame === false || isDroppingOnDraggable === false) {
          return;
        }

        dragDropComponentUtils.swapItems(sourceListAccessor, sourceListSetter, sourceIndex, destinationIndex);
      },
    });

    onCleanup(() => {
      monitorCleanup();
    });
  });

  return (
    <div class={styles.listsContainer}>
      <DragDrop.Droppable id="1" class={styles.list}>
        <For each={list1()}>
          {(item) => (
            <DragDrop.Draggable class={styles.listItem} draggableId={item.id} droppableId="1" isDroppable>
              {item.item.display}
            </DragDrop.Draggable>
          )}
        </For>
      </DragDrop.Droppable>
    </div>
  );
};

export const ShiftItems = () => {
  const [list1, setList1] = createSignal<DragDropListItem[]>([
    { id: '1', item: { display: '1' } },
    { id: '2', item: { display: '2' } },
    { id: '3', item: { display: '3' } },
    { id: '4', item: { display: '4' } },
    { id: '5', item: { display: '5' } },
    { id: '6', item: { display: '6' } },
  ]);

  const accessors = { '1': list1 };
  const setters = { '1': setList1 };
  type setterAccessorKeys = keyof typeof setters;

  onMount(() => {
    const monitorCleanup = monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];

        if (!destination) {
          loggerUtils.warn('no destination target found for drag and drop');

          return;
        }

        const destinationElement = destination.element as HTMLElement;
        const destinationDraggableId = destination.data.draggableId;
        const destinationDroppableId = destination.data.droppableId;
        const destinationListAccessor = accessors[destinationDroppableId as setterAccessorKeys];
        const destinationIndex = destinationListAccessor().findIndex((item) => item.id === destinationDraggableId);

        const sourceElement = source.element as HTMLElement;
        const sourceDraggableId = source.data.draggableId;
        const sourceDroppableId = source.data.droppableId;
        const sourceListAccessor = accessors[sourceDroppableId as setterAccessorKeys];
        const sourceListSetter = setters[sourceDroppableId as setterAccessorKeys];
        const sourceIndex = sourceListAccessor().findIndex((item) => item.id === sourceDraggableId);

        const isDroppingOnDraggable = dragDropComponentUtils.isDroppingOnDraggable(sourceElement, destinationElement);
        const destinationAndSourceAreTheSame = destinationDroppableId === sourceDroppableId;

        if (!sourceDraggableId) {
          loggerUtils.warn('source draggable id not found');

          return;
        }

        // since we are in the same list and dropping on a draggable, we need to swap the items
        if (destinationAndSourceAreTheSame === false || isDroppingOnDraggable === false) {
          return;
        }

        dragDropComponentUtils.shiftItems(sourceListAccessor, sourceListSetter, sourceIndex, destinationIndex);
      },
    });

    onCleanup(() => {
      monitorCleanup();
    });
  });

  return (
    <div class={styles.listsContainer}>
      <DragDrop.Droppable id="1" class={styles.list}>
        <For each={list1()}>
          {(item) => (
            <DragDrop.Draggable class={styles.listItem} draggableId={item.id} droppableId="1" isDroppable>
              {item.item.display}
            </DragDrop.Draggable>
          )}
        </For>
      </DragDrop.Droppable>
    </div>
  );
};

export const DraggableHandle = () => {
  const [list1, setList1] = createSignal<DragDropListItem[]>([
    { id: '1', item: { display: '1' } },
    { id: '2', item: { display: '2' } },
    { id: '3', item: { display: '3' } },
    { id: '4', item: { display: '4' } },
    { id: '5', item: { display: '5' } },
    { id: '6', item: { display: '6' } },
  ]);

  const accessors = { '1': list1 };
  const setters = { '1': setList1 };
  type setterAccessorKeys = keyof typeof setters;

  onMount(() => {
    const monitorCleanup = monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];

        if (!destination) {
          loggerUtils.warn('no destination target found for drag and drop');

          return;
        }

        const destinationElement = destination.element as HTMLElement;
        const destinationDraggableId = destination.data.draggableId;
        const destinationDroppableId = destination.data.droppableId;
        const destinationListAccessor = accessors[destinationDroppableId as setterAccessorKeys];
        const destinationIndex = destinationListAccessor().findIndex((item) => item.id === destinationDraggableId);

        const sourceElement = source.element as HTMLElement;
        const sourceDraggableId = source.data.draggableId;
        const sourceDroppableId = source.data.droppableId;
        const sourceListAccessor = accessors[sourceDroppableId as setterAccessorKeys];
        const sourceListSetter = setters[sourceDroppableId as setterAccessorKeys];
        const sourceIndex = sourceListAccessor().findIndex((item) => item.id === sourceDraggableId);

        const isDroppingOnDraggable = dragDropComponentUtils.isDroppingOnDraggable(sourceElement, destinationElement);
        const destinationAndSourceAreTheSame = destinationDroppableId === sourceDroppableId;

        if (!sourceDraggableId) {
          loggerUtils.warn('source draggable id not found');

          return;
        }

        // since we are in the same list and dropping on a draggable, we need to swap the items
        if (destinationAndSourceAreTheSame === false || isDroppingOnDraggable === false) {
          return;
        }

        dragDropComponentUtils.shiftItems(sourceListAccessor, sourceListSetter, sourceIndex, destinationIndex);
      },
    });

    onCleanup(() => {
      monitorCleanup();
    });
  });

  return (
    <div class={styles.listsContainer}>
      <DragDrop.Droppable id="1" class={styles.list}>
        <For each={list1()}>
          {(item) => (
            <DragDrop.Draggable class={styles.listItem} draggableId={item.id} droppableId="1" isDroppable>
              <Icon
                class={styles.listItemDragHandle}
                data-drag-handle="true"
                icon="grip-vertical"
                size={IconSize.BASE}
              />
              {item.item.display}
            </DragDrop.Draggable>
          )}
        </For>
      </DragDrop.Droppable>
    </div>
  );
};
