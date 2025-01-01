import Draggable, { type DraggableProps } from '$/components/drag-drop/draggable';
import Droppable, { type DroppableProps } from '$/components/drag-drop/droppable';

export { type DragDropId, type DragDropItem, dragDropComponentUtils } from '$/components/drag-drop/utils';
export type { DraggableProps, DroppableProps };

export default Object.assign({}, { Draggable, Droppable });
