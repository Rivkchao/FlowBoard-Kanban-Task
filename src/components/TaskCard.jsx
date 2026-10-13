import React, { useState, useRef, useEffect, memo } from 'react';
import { 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Check, 
  X, 
  Tag as TagIcon,
  HelpCircle
} from 'lucide-react';
import { PRIORITY_CONFIG } from '../data/initialData';
import { DropIndicator } from './DropIndicator';

const PriorityIcon = ({ priority }) => {
  switch (priority) {
    case 'Urgent':
      return <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 animate-pulse" />;
    case 'High':
      return <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
    case 'Medium':
      return <Clock className="w-3.5 h-3.5 text-sky-500 shrink-0" />;
    case 'Low':
    default:
      return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />;
  }
};

export const TaskCard = memo(function TaskCard({
  task,
  onUpdateTask,
  onRequestDeleteTask,
  onDragStart,
  onOpenStoryPointsInfo,
  isDragging
}) {
  // Inline editing states
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(task.title);

  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [descValue, setDescValue] = useState(task.description || '');

  const [showPriorityMenu, setShowPriorityMenu] = useState(false);

  const titleInputRef = useRef(null);
  const descInputRef = useRef(null);

  useEffect(() => {
    setTitleValue(task.title);
  }, [task.title]);

  useEffect(() => {
    setDescValue(task.description || '');
  }, [task.description]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  useEffect(() => {
    if (isEditingDesc && descInputRef.current) {
      descInputRef.current.focus();
      descInputRef.current.select();
    }
  }, [isEditingDesc]);

  const handleSaveTitle = () => {
    const trimmed = titleValue.trim();
    if (trimmed && trimmed !== task.title) {
      onUpdateTask(task.id, { title: trimmed });
    } else {
      setTitleValue(task.title);
    }
    setIsEditingTitle(false);
  };

  const handleCancelTitle = () => {
    setTitleValue(task.title);
    setIsEditingTitle(false);
  };

  const handleSaveDesc = () => {
    const trimmed = descValue.trim();
    if (trimmed !== task.description) {
      onUpdateTask(task.id, { description: trimmed });
    }
    setIsEditingDesc(false);
  };

  const handleCancelDesc = () => {
    setDescValue(task.description || '');
    setIsEditingDesc(false);
  };

  const priorityMeta = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.Medium;

  return (
    <>
      {/* Drop indicator before this card */}
      <DropIndicator beforeId={task.id} columnId={task.columnId} />

      <div
        id={`card-${task.id}`}
        draggable={!isEditingTitle && !isEditingDesc}
        onDragStart={(e) => onDragStart(e, task)}
        className={`group relative flex flex-col gap-2.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/80 p-4 shadow-sm dark:shadow-md transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-md dark:hover:shadow-indigo-500/5 ${
          isDragging ? 'opacity-40 scale-[0.98] border-dashed border-indigo-500 ring-2 ring-indigo-500/30' : 'opacity-100 cursor-grab active:cursor-grabbing'
        }`}
      >
        {/* Top Header: Priority badge & action controls */}
        <div className="flex items-center justify-between gap-2">
          {/* Priority Badge with quick cycle click */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowPriorityMenu(!showPriorityMenu);
              }}
              title="Klik untuk mengubah prioritas"
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide transition-colors ${priorityMeta.badgeClass} hover:brightness-105`}
            >
              <PriorityIcon priority={task.priority} />
              <span>{task.priority}</span>
            </button>

            {/* Quick Priority Dropdown */}
            {showPriorityMenu && (
              <div 
                className="absolute left-0 top-full mt-1.5 z-30 w-32 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-1 shadow-xl shadow-slate-900/10 dark:shadow-black/50"
                onClick={(e) => e.stopPropagation()}
              >
                {Object.keys(PRIORITY_CONFIG).map((pKey) => (
                  <button
                    key={pKey}
                    type="button"
                    onClick={() => {
                      onUpdateTask(task.id, { priority: pKey });
                      setShowPriorityMenu(false);
                    }}
                    className={`flex items-center gap-2 w-full px-3 py-1.5 text-xs text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 ${
                      task.priority === pKey ? 'bg-slate-100 dark:bg-slate-700/70 font-semibold text-indigo-600 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <PriorityIcon priority={pKey} />
                    <span>{pKey}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons: Story Points & Delete */}
          <div className="flex items-center gap-1.5 text-slate-400">
            {task.storyPoints !== undefined && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenStoryPointsInfo?.();
                }}
                title={`${task.storyPoints} Story Points (Klik untuk info kegunaan pts)`}
                className="px-1.5 py-0.5 text-[11px] font-mono rounded bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600/40 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
              >
                {task.storyPoints} pts
              </button>
            )}
            
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRequestDeleteTask(task);
              }}
              title="Hapus tugas"
              className="p-1 rounded opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Task Title with Inline Text Replacement */}
        <div>
          {isEditingTitle ? (
            <div className="relative mt-0.5" onClick={(e) => e.stopPropagation()}>
              <input
                ref={titleInputRef}
                type="text"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveTitle();
                  if (e.key === 'Escape') handleCancelTitle();
                }}
                onBlur={handleSaveTitle}
                className="w-full rounded-md border border-indigo-500 bg-white dark:bg-slate-900 px-2 py-1 text-sm font-semibold text-slate-900 dark:text-slate-100 outline-none ring-2 ring-indigo-500/20"
                placeholder="Judul tugas..."
              />
              <div className="mt-1 flex items-center justify-end gap-1">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleSaveTitle}
                  className="p-1 rounded bg-indigo-600 text-white hover:bg-indigo-500"
                  title="Simpan (Enter)"
                >
                  <Check className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleCancelTitle}
                  className="p-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                  title="Batal (Esc)"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          ) : (
            <h4
              onClick={() => setIsEditingTitle(true)}
              title="Klik untuk quick edit judul tugas"
              className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-200 transition-colors leading-snug cursor-text select-none py-0.5"
            >
              {task.title}
            </h4>
          )}
        </div>

        {/* Task Description with Inline Text Replacement */}
        <div>
          {isEditingDesc ? (
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <textarea
                ref={descInputRef}
                value={descValue}
                onChange={(e) => setDescValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSaveDesc();
                  }
                  if (e.key === 'Escape') handleCancelDesc();
                }}
                onBlur={handleSaveDesc}
                rows={3}
                className="w-full rounded-md border border-indigo-500 bg-white dark:bg-slate-900 p-2 text-xs text-slate-800 dark:text-slate-200 outline-none ring-2 ring-indigo-500/20"
                placeholder="Tambahkan deskripsi tugas... (Shift+Enter untuk baris baru)"
              />
              <div className="mt-1 flex items-center justify-end gap-1">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleSaveDesc}
                  className="p-1 rounded bg-indigo-600 text-white hover:bg-indigo-500"
                  title="Simpan"
                >
                  <Check className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleCancelDesc}
                  className="p-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                  title="Batal"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          ) : (
            <p
              onClick={() => setIsEditingDesc(true)}
              title="Klik untuk quick edit deskripsi tugas"
              className={`text-xs leading-relaxed line-clamp-3 cursor-text select-none transition-colors ${
                task.description ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200' : 'text-slate-400 dark:text-slate-500 italic hover:text-slate-600 dark:hover:text-slate-400'
              }`}
            >
              {task.description || '+ Tambahkan deskripsi...'}
            </p>
          )}
        </div>

        {/* Tags / Labels */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {task.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700/50 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600/30"
              >
                <TagIcon className="w-2.5 h-2.5 opacity-60" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer: Due date & Assignee avatar */}
        <div className="mt-1 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-2.5 text-xs text-slate-500 dark:text-slate-400">
          {/* Due date */}
          <div className="flex items-center gap-1.5" title={`Tenggat waktu: ${task.dueDate || 'Belum diatur'}`}>
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px]">
              {task.dueDate ? new Date(task.dueDate).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }) : 'No date'}
            </span>
          </div>

          {/* Assigned Avatar */}
          {task.assignee ? (
            <div
              title={`Assigned to: ${task.assignee.name} (${task.assignee.role || 'Member'})`}
              className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr ${task.assignee.color || 'from-indigo-500 to-purple-600'} text-[11px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-800 transition-transform hover:scale-110`}
            >
              {task.assignee.avatar || task.assignee.name.slice(0, 2).toUpperCase()}
            </div>
          ) : (
            <span className="text-[11px] text-slate-400 dark:text-slate-500">Unassigned</span>
          )}
        </div>
      </div>
    </>
  );
});
