/*import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

export default function TaskBoard({
  tasks,
  setTasks,
}) {

  const handleDragEnd = (result) => {

    if (!result.destination)
      return;

    const items =
      Array.from(tasks);

    const [reordered] =
      items.splice(
        result.source.index,
        1
      );

    items.splice(
      result.destination.index,
      0,
      reordered
    );

    setTasks(items);
  };

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
    >

      <Droppable droppableId="tasks">

        {(provided) => (

          <div
            {...provided.droppableProps}

            ref={provided.innerRef}

            className="space-y-4"
          >

            {
              tasks.map(
                (task, index) => (

                  <Draggable
                    key={task.id}

                    draggableId={
                      String(task.id)
                    }

                    index={index}
                  >

                    {(provided) => (

                      <div
                        ref={
                          provided.innerRef
                        }

                        {
                          ...provided.draggableProps
                        }

                        {
                          ...provided.dragHandleProps
                        }

                        className="bg-black/20 border border-white/10 rounded-3xl p-5 backdrop-blur-xl cursor-grab active:cursor-grabbing transition hover:border-blue-400/30"
                      >

                        <div className="flex items-center justify-between">

                          <div>

                            <h3 className="text-lg font-medium">
                              {task.title}
                            </h3>

                            <div className="flex gap-3 mt-3 text-sm text-gray-400 flex-wrap">

                              <span>
                                ⚡ {task.energy}
                              </span>

                              <span>
                                ⏱ {task.time}
                              </span>

                              <span>
                                📅 {
                                  task.deadline ||
                                  "No deadline"
                                }
                              </span>

                            </div>

                          </div>

                          <div className="text-2xl text-gray-500">
                            ⋮⋮
                          </div>

                        </div>

                      </div>
                    )}

                  </Draggable>
                )
              )
            }

            {
              provided.placeholder
            }

          </div>
        )}

      </Droppable>

    </DragDropContext>
  );
}*/
/*import { useState } from "react";

export default function TaskBoard({ tasks, setTasks }) {
  const [columns, setColumns] = useState({
    todo: tasks,
    doing: [],
    done: [],
  });

  const moveTask = (task, from, to) => {
    setColumns((prev) => {
      const newFrom = prev[from].filter((t) => t.id !== task.id);
      const newTo = [...prev[to], task];

      const updated = {
        ...prev,
        [from]: newFrom,
        [to]: newTo,
      };

      return updated;
    });
  };

  const renderColumn = (title, key) => (
    <div className="bg-black/20 rounded-2xl p-4 w-full">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>

      <div className="space-y-3">
        {columns[key].map((task) => (
          <div
            key={task.id}
            className="bg-white/5 p-4 rounded-xl border border-white/10"
          >
            <p className="font-medium">{task.title}</p>

            <div className="flex gap-2 mt-2 text-xs text-gray-400">
              <span>{task.energy}</span>
              <span>{task.time}</span>
            </div>

            <div className="flex gap-2 mt-3">
              {key !== "doing" && (
                <button
                  onClick={() => moveTask(task, key, "doing")}
                  className="text-xs px-2 py-1 bg-blue-500/20 rounded"
                >
                  Start
                </button>
              )}

              {key !== "done" && (
                <button
                  onClick={() => moveTask(task, key, "done")}
                  className="text-xs px-2 py-1 bg-green-500/20 rounded"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-3 gap-4">
      {renderColumn("To Do", "todo")}
      {renderColumn("In Progress", "doing")}
      {renderColumn("Done", "done")}
    </div>
  );
}*/
import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

/* ---------- Task Card ---------- */
function TaskCard({ task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white/5 border border-white/10 p-4 rounded-xl cursor-grab active:cursor-grabbing"
    >
      <p className="font-medium">{task.title}</p>

      <div className="text-xs text-gray-400 mt-2 flex gap-2">
        <span>{task.energy}</span>
        <span>{task.time}</span>
      </div>
    </div>
  );
}

/* ---------- Column ---------- */
function Column({ title, tasks }) {
  return (
    <div className="bg-black/20 rounded-2xl p-4 w-full min-h-[300px]">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

/* ---------- MAIN BOARD ---------- */
export default function TaskBoard({ tasks, setTasks }) {
  const [columns, setColumns] = useState({
    todo: [],
    doing: [],
    done: [],
  });

  /* Load tasks into todo */
  useEffect(() => {
    setColumns({
      todo: tasks,
      doing: [],
      done: [],
    });
  }, [tasks]);

  /* Drag Handler */
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    let sourceCol, destCol;

    for (let col in columns) {
      if (columns[col].find((t) => t.id === activeId))
        sourceCol = col;

      if (columns[col].find((t) => t.id === overId))
        destCol = col;
    }

    if (!sourceCol || !destCol) return;

    const activeTask = columns[sourceCol].find(
      (t) => t.id === activeId
    );

    const newSource = columns[sourceCol].filter(
      (t) => t.id !== activeId
    );

    const newDest = [
      ...columns[destCol],
      activeTask,
    ];

    const updated = {
      ...columns,
      [sourceCol]: newSource,
      [destCol]: newDest,
    };

    setColumns(updated);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-3 gap-4">
        <Column title="To Do" tasks={columns.todo} />
        <Column title="In Progress" tasks={columns.doing} />
        <Column title="Done" tasks={columns.done} />
      </div>
    </DndContext>
  );
}