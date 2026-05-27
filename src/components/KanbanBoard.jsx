import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

const columns = [
  { id: "todo", title: "To Do" },
  { id: "progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export default function KanbanBoard({ tasks, setTasks }) {

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updated = [...tasks];

    const index = updated.findIndex(
      (t) => t.id.toString() === result.draggableId
    );

    if (index === -1) return;

    updated[index].status = result.destination.droppableId;

    setTasks(updated);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {columns.map((col) => {

          const filtered = tasks.filter(
            (t) => t.status === col.id
          );

          return (
            <Droppable key={col.id} droppableId={col.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white/5 border border-white/10 rounded-3xl p-5 min-h-[500px]"
                >

                  {/* HEADER */}
                  <div className="flex justify-between mb-5">
                    <h2 className="font-semibold text-lg">
                      {col.title}
                    </h2>

                    <span className="text-sm bg-white/10 px-3 py-1 rounded-full">
                      {filtered.length}
                    </span>
                  </div>

                  {/* TASKS */}
                  <div className="space-y-4">
                    {filtered.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-black/30 border border-white/10 p-4 rounded-2xl hover:bg-black/40 transition"
                          >

                            <h3 className="font-medium">
                              {task.title}
                            </h3>

                            <div className="text-xs text-gray-400 mt-2 flex gap-3">
                              <span>⚡ {task.energy}</span>
                              <span>⏱ {task.time}</span>
                            </div>

                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>

                </div>
              )}
            </Droppable>
          );
        })}

      </div>
    </DragDropContext>
  );
}