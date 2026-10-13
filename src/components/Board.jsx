import React from 'react';
import { Column } from './Column';

export const Board = ({
  columns,
  tasksByColumn,
  onUpdateTask,
  onRequestDeleteTask,
  onAddTask,
  onDeleteColumn,
  onDragStartTask,
  onDragStartColumn,
  onDropTask,
  onDropColumn,
  onOpenStoryPointsInfo,
  activeDraggingCardId,
  activeDraggingColumnId,
}) => {
  return (
    <div className="flex-1 overflow-x-auto p-6 pt-4">
      <div className="inline-flex gap-5 items-start min-h-[calc(100vh-250px)] pb-6">
        {columns.map((column, index) => (
          <Column
            key={column.id}
            column={column}
            columnIndex={index}
            tasks={tasksByColumn[column.id] || []}
            onUpdateTask={onUpdateTask}
            onRequestDeleteTask={onRequestDeleteTask}
            onAddTask={onAddTask}
            onDeleteColumn={onDeleteColumn}
            onDragStartTask={onDragStartTask}
            onDragStartColumn={onDragStartColumn}
            onDropTask={onDropTask}
            onDropColumn={onDropColumn}
            onOpenStoryPointsInfo={onOpenStoryPointsInfo}
            activeDraggingCardId={activeDraggingCardId}
            activeDraggingColumnId={activeDraggingColumnId}
          />
        ))}
      </div>
    </div>
  );
};
