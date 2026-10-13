import React from 'react';
import { Target, Flame, HelpCircle } from 'lucide-react';

export const SprintSummary = ({ sprint, sprintMetrics, onOpenStoryPointsInfo }) => {
  return (
    <div className="mx-6 mt-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4 shadow-sm dark:shadow-md backdrop-blur-sm transition-colors duration-200">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Sprint Goal */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">{sprint.name}</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
            {sprint.goal}
          </p>
        </div>

        {/* Right: Metrics Badges & Progress Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6">
          {/* Metrics summary cards */}
          <div className="grid grid-cols-4 gap-2">
            <div className="rounded-xl bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 text-center border border-slate-200 dark:border-slate-700/50">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Total</span>
              <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">{sprintMetrics.total}</p>
            </div>
            <div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 text-center border border-indigo-200 dark:border-indigo-500/20">
              <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400">Active</span>
              <p className="text-sm font-extrabold text-indigo-700 dark:text-indigo-300">{sprintMetrics.inProgressTasks}</p>
            </div>
            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 text-center border border-amber-200 dark:border-amber-500/20">
              <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">Review</span>
              <p className="text-sm font-extrabold text-amber-700 dark:text-amber-300">{sprintMetrics.reviewTasks}</p>
            </div>
            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 text-center border border-emerald-200 dark:border-emerald-500/20">
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Done</span>
              <p className="text-sm font-extrabold text-emerald-700 dark:text-emerald-300">{sprintMetrics.doneTasks}</p>
            </div>
          </div>

          {/* Progress bar with Story Points Info click */}
          <div className="flex flex-col gap-1.5 min-w-[210px]">
            <div className="flex justify-between items-center text-xs font-semibold">
              <button
                type="button"
                onClick={onOpenStoryPointsInfo}
                title="Klik untuk melihat penjelasan Story Points (pts)"
                className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
              >
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Velocity (pts)</span>
                <HelpCircle className="w-3 h-3 text-slate-400" />
              </button>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                {sprintMetrics.completedPoints} / {sprintMetrics.totalPoints} pts ({sprintMetrics.progressPercentage}%)
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700/50">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-emerald-400 transition-all duration-500 ease-out"
                style={{ width: `${sprintMetrics.progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
