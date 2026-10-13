import React, { useState } from 'react';
import { X, Plus, Calendar, Tag, User, HelpCircle } from 'lucide-react';
import { INITIAL_MEMBERS, PRIORITY_CONFIG } from '../data/initialData';

export const NewTaskModal = ({
  isOpen,
  onClose,
  columns,
  onAddTask,
  onOpenStoryPointsInfo,
  defaultColumnId = 'col-backlog'
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [columnId, setColumnId] = useState(defaultColumnId);
  const [priority, setPriority] = useState('Medium');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(['Sprint']);
  const [assigneeId, setAssigneeId] = useState(INITIAL_MEMBERS[0].id);
  const [storyPoints, setStoryPoints] = useState(3);
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  if (!isOpen) return null;

  const handleAddTag = (e) => {
    e.preventDefault();
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const assignee = INITIAL_MEMBERS.find((m) => m.id === assigneeId) || null;

    onAddTask(columnId, {
      title: title.trim(),
      description: description.trim(),
      priority,
      tags,
      assignee,
      storyPoints: Number(storyPoints) || 1,
      dueDate
    });

    // Reset & close
    setTitle('');
    setDescription('');
    setTags(['Sprint']);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Buat Tugas Baru</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Tambahkan kartu tugas ke sprint planner</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Judul Tugas <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Implementasi UI Filter Bar..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Column & Priority Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Kolom Target</label>
              <select
                value={columnId}
                onChange={(e) => setColumnId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-indigo-500"
              >
                {columns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Prioritas</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-indigo-500"
              >
                {Object.keys(PRIORITY_CONFIG).map((pKey) => (
                  <option key={pKey} value={pKey}>
                    {pKey}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Deskripsi</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Rincian deskripsi atau acceptance criteria..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Assignee & Story Points & Due Date */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Assignee</label>
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-indigo-500"
              >
                {INITIAL_MEMBERS.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Story Points</label>
                <button
                  type="button"
                  onClick={onOpenStoryPointsInfo}
                  title="Apa itu Story Points?"
                  className="text-slate-400 hover:text-indigo-500"
                >
                  <HelpCircle className="w-3 h-3" />
                </button>
              </div>
              <input
                type="number"
                min="1"
                max="21"
                value={storyPoints}
                onChange={(e) => setStoryPoints(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tenggat Waktu</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tags / Label</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag(e);
                  }
                }}
                placeholder="Ketik label lalu tekan Enter..."
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="rounded-xl bg-slate-200 dark:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600"
              >
                Tambah
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/20 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30"
                >
                  #{t}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(t)}
                    className="text-indigo-600 dark:text-indigo-300 hover:text-rose-500 ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Buat Tugas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
