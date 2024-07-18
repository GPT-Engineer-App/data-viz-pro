import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DataMappingDnD = ({ availableColumns, chartProperties }) => {
  const [columns, setColumns] = useState(availableColumns);
  const [mappings, setMappings] = useState(
    Object.fromEntries(chartProperties.map(prop => [prop, []]))
  );

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === 'columns' && destination.droppableId !== 'columns') {
      // Moving from columns to a chart property
      const newColumns = Array.from(columns);
      const [removed] = newColumns.splice(source.index, 1);
      const newMappings = { ...mappings };
      newMappings[destination.droppableId].splice(destination.index, 0, removed);

      setColumns(newColumns);
      setMappings(newMappings);
    } else if (source.droppableId !== 'columns' && destination.droppableId === 'columns') {
      // Moving from a chart property back to columns
      const newMappings = { ...mappings };
      const [removed] = newMappings[source.droppableId].splice(source.index, 1);
      const newColumns = Array.from(columns);
      newColumns.splice(destination.index, 0, removed);

      setColumns(newColumns);
      setMappings(newMappings);
    } else if (source.droppableId !== 'columns' && destination.droppableId !== 'columns') {
      // Moving between chart properties
      const newMappings = { ...mappings };
      const [removed] = newMappings[source.droppableId].splice(source.index, 1);
      newMappings[destination.droppableId].splice(destination.index, 0, removed);

      setMappings(newMappings);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-2 gap-4">
        <Droppable droppableId="columns">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="border rounded p-2"
            >
              <h3 className="font-medium mb-2">Available Columns</h3>
              {columns.map((column, index) => (
                <Draggable key={column} draggableId={column} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-muted p-2 rounded cursor-move mb-2"
                    >
                      {column}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="border rounded p-2">
          <h3 className="font-medium mb-2">Chart Properties</h3>
          {chartProperties.map((property) => (
            <Droppable key={property} droppableId={property}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-muted p-2 rounded mb-2"
                >
                  <h4 className="font-medium mb-1">{property}</h4>
                  {mappings[property].map((column, index) => (
                    <Draggable key={column} draggableId={`${property}-${column}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-background p-1 rounded cursor-move mb-1"
                        >
                          {column}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default DataMappingDnD;