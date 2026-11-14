"use client";

import { DndContext, closestCorners, type DragEndEvent } from "@dnd-kit/core";
import type { TaskBoardProps, TaskStatus } from "../../../types/tasks.types";
import { TaskColumn } from "./task-column";

export const TaskBoard = ({
  columns,
  onAddTask,
  onTaskClick,
  canEditTask = Boolean(onTaskClick),
  canDeleteTask = false,
  onTaskMove,
}: TaskBoardProps) => {
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || !onTaskMove) return;

    const taskId = String(active.id);
    const taskExists = columns.some((column) =>
      column.tasks.some((task) => task.id === taskId)
    );
    if (!taskExists) return;

    const targetData = over.data.current;
    const targetStatus = targetData?.status;
    if (!isTaskStatus(targetStatus)) return;

    const targetColumn = columns.find((column) => column.id === targetStatus);
    if (!targetColumn) return;

    const targetIndex =
      targetData?.type === "task" && typeof targetData.index === "number"
        ? targetData.index
        : targetColumn.tasks.length;

    onTaskMove(taskId, targetStatus, targetIndex);
  };

  const board = (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {columns.map((column) => (
        <TaskColumn
          key={column.id}
          column={column}
          onAddTask={onAddTask}
          onTaskClick={onTaskClick}
          canEditTask={canEditTask}
          canDeleteTask={canDeleteTask}
          enableDragAndDrop={Boolean(onTaskMove)}
        />
      ))}
    </div>
  );

  if (!onTaskMove) return board;

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      {board}
    </DndContext>
  );
};

function isTaskStatus(value: unknown): value is TaskStatus {
  return (
    value === "todo" ||
    value === "in-progress" ||
    value === "in-review" ||
    value === "completed"
  );
}