import React, { useState, memo } from 'react';
import { Plus, GripHorizontal } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { DropIndicator } from './DropIndicator';

export const Column = memo(function Column({
  column,
  columnIndex,
  tasks,
  onUpdateTask,
  onRequestDeleteTask,
  onAddTask,
  onDragStartTask,
  onDragStartColumn,
  onDropTask,
  onDropColumn,
  onOpenStoryPointsInfo,
  activeDraggingCardId,
  activeDraggingColumnId
}) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isOverColumn, setIsOverColumn] = useState(false);

  // HTML5 Drag & Drop handlers for cards within/into this column
  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
    setIsOverColumn(true);
  };

  const handleDragLeave = () => {
    clearHighlights();
    setIsOverColumn(false);
  };

  const clearHighlights = (elements) => {
    const indicators = elements || getIndicators();
    indicators.forEach((i) => {
      i.style.opacity = '0';
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    if (el) {
      el.element.style.opacity = '1';
    }
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;
    const res = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return res;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column.id}"]`));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    clearHighlights();
    setIsOverColumn(false);

    // Check if dragging column or card
    const cardData = e.dataTransfer.getData('application/flowboard-card');
    const columnData = e.dataTransfer.getData('application/flowboard-column');

    if (cardData) {
      const { cardId } = JSON.parse(cardData);
      const indicators = getIndicators();
      const { element } = getNearestIndicator(e, indicators);
      const beforeId = element.dataset.before;
      onDropTask(cardId, column.id, beforeId);
    } else if (columnData) {
      const { columnId: sourceColumnId } = JSON.parse(columnData);
      if (sourceColumnId !== column.id) {
        onDropColumn(sourceColumnId, column.id);
      }
    }
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    const trimmed = newCardTitle.trim();
    if (!trimmed) return;

    onAddTask(column.id, {
      title: trimmed,
      priority: 'Medium',
      description: '',
      tags: ['Sprint'],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      storyPoints: 3
    });

    setNewCardTitle('');
    setIsAddingCard(false);
  };

  const isDraggingThisColumn = activeDraggingColumnId === column.id;

  return (
    <div
      id={`column-${column.id}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex w-80 shrink-0 flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-200/50 dark:bg-slate-900/90 shadow-md dark:shadow-xl backdrop-blur-sm transition-all duration-200 ${
        column.colorAccent || 'border-t-indigo-500'
      } border-t-4 ${
        isOverColumn && !isDraggingThisColumn ? 'ring-2 ring-indigo-500/50 bg-slate-200/80 dark:bg-slate-900/95' : ''
      } ${isDraggingThisColumn ? 'opacity-40 scale-[0.99] border-dashed border-indigo-400' : ''}`}
    >
      {/* Column Header (Draggable for column reordering) */}
      <div 
        draggable
        onDragStart={(e) => onDragStartColumn(e, column.id)}
        className="flex items-center justify-between p-4 pb-3 cursor-grab active:cursor-grabbing border-b border-slate-200 dark:border-slate-800/80 group"
      >
        <div className="flex items-center gap-2.5">
          <GripHorizontal className="w-4 h-4 text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="font-bold text-sm tracking-wide text-slate-800 dark:text-slate-100">{column.title}</h3>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${column.badgeColor || 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
            {tasks.length}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsAddingCard(true)}
            title="Tambah kartu baru"
            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards List Container */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col min-h-[140px] max-h-[calc(100vh-280px)]">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdateTask={onUpdateTask}
            onRequestDeleteTask={onRequestDeleteTask}
            onDragStart={onDragStartTask}
            onOpenStoryPointsInfo={onOpenStoryPointsInfo}
            isDragging={activeDraggingCardId === task.id}
          />
        ))}

        {/* Indicator for dropping at the very end of the column */}
        <DropIndicator beforeId="-1" columnId={column.id} />

        {tasks.length === 0 && !isAddingCard && (
          <div className="my-auto py-8 text-center border-2 border-dashed border-slate-300 dark:border-slate-800/80 rounded-xl">
            <p className="text-xs text-slate-500 font-medium">Belum ada tugas</p>
            <button
              type="button"
              onClick={() => setIsAddingCard(true)}
              className="mt-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 inline-flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Tambah tugas
            </button>
          </div>
        )}
      </div>

      {/* Quick Add Card Form or Button */}
      <div className="p-3 pt-0">
        {isAddingCard ? (
          <form onSubmit={handleCreateTask} className="rounded-xl border border-indigo-500/50 bg-white dark:bg-slate-800/90 p-3 shadow-lg">
            <input
              type="text"
              autoFocus
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setIsAddingCard(false);
                  setNewCardTitle('');
                }
              }}
              placeholder="Tulis judul tugas..."
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-indigo-500"
            />
            <div className="mt-2.5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsAddingCard(false);
                  setNewCardTitle('');
                }}
                className="px-2.5 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={!newCardTitle.trim()}
                className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Tambah
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setIsAddingCard(true)}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-300/70 dark:border-slate-800/80 bg-white/70 dark:bg-slate-800/40 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:border-indigo-400 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800/80 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all duration-150"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Kartu</span>
          </button>
        )}
      </div>
    </div>
  );
});
