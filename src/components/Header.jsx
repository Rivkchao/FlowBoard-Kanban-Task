import React from 'react';
import { 
  Kanban, 
  Plus, 
  RotateCcw, 
  Sun, 
  Moon, 
  Calendar, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const Header = ({
  sprint,
  sprintMetrics,
  onOpenNewTaskModal,
  onRequestResetBoard,
  onOpenStoryPointsInfo,
  theme,
  toggleTheme
}) => {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md sticky top-0 z-40 px-6 py-4 transition-colors duration-200">
      <div className="mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Brand logo and App Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
            <Kanban className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Flow<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400">Board</span>
              </h1>
              <span className="rounded-full bg-indigo-50 dark:bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                Agile 2.0
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Agile Kanban & Sprint Planner • High Performance Drag & Drop
            </p>
          </div>
        </div>

        {/* Center: Sprint Info Badge */}
        <div className="hidden lg:flex items-center gap-3 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 px-4 py-2 rounded-xl">
          <div className="flex items-center gap-2 text-xs">
            <Calendar className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">{sprint?.name || 'Sprint Aktif'}</span>
          </div>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
            <span>Progress:</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">{sprintMetrics.progressPercentage}%</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          {/* Story Points Guide button */}
          <button
            type="button"
            onClick={onOpenStoryPointsInfo}
            title="Pelajari apa itu Story Points (pts)"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm"
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden sm:inline">Info pts</span>
          </button>

          {/* Theme Toggle Button (Light/Dark) */}
          <button
            type="button"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Ganti ke Tema Terang (Light Mode)' : 'Ganti ke Tema Gelap (Dark Mode)'}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-amber-500 dark:hover:text-amber-400 transition-all shadow-sm"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-600" />
            )}
          </button>

          {/* Reset Board */}
          <button
            type="button"
            onClick={onRequestResetBoard}
            title="Reset board ke sampel data awal"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* New Task Button */}
          <button
            type="button"
            onClick={onOpenNewTaskModal}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/25 hover:from-indigo-500 hover:to-indigo-400 active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tugas Baru</span>
          </button>
        </div>
      </div>
    </header>
  );
};
