import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useGame } from "../contexts/GameContext";
import ItemBlock from "./ItemBlock";
const ItemList = () => {
  const { items } = useGame();

  return (
    <DragDropContext>
      <Droppable droppableId="items">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable
                key={index}
                draggableId={index.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ItemBlock index={index} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ItemList;
