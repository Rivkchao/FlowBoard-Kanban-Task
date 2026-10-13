import React from 'react';
import { Search, X, Filter } from 'lucide-react';
import { PRIORITY_CONFIG } from '../data/initialData';

export const FilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedPriority,
  setSelectedPriority,
  selectedTag,
  setSelectedTag,
  allTags,
  filteredCount,
  totalCount
}) => {
  const isFiltered = searchQuery.trim() !== '' || selectedPriority !== 'All' || selectedTag !== 'All';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedPriority('All');
    setSelectedTag('All');
  };

  return (
    <div className="mx-6 mt-4 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white/70 dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-200">
      {/* Left: Instant Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari tugas berdasarkan judul, deskripsi, atau label..."
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/80 pl-9 pr-8 py-2 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Right: Filters for Priority & Tags */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Priority Filter Buttons */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 border border-slate-200 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => setSelectedPriority('All')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedPriority === 'All'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Semua
          </button>
          {Object.keys(PRIORITY_CONFIG).map((pKey) => (
            <button
              key={pKey}
              type="button"
              onClick={() => setSelectedPriority(selectedPriority === pKey ? 'All' : pKey)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedPriority === pKey
                  ? `${PRIORITY_CONFIG[pKey].badgeClass} font-bold ring-1 ring-slate-400/40 dark:ring-white/20`
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/40'
              }`}
            >
              {pKey}
            </button>
          ))}
        </div>

        {/* Tag Dropdown */}
        {allTags.length > 0 && (
          <div className="flex items-center gap-1.5">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 outline-none hover:border-slate-300 dark:hover:border-slate-600 focus:border-indigo-500 cursor-pointer"
            >
              <option value="All">Semua Label ({allTags.length})</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  🏷️ {tag}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Clear Filters Button */}
        {isFiltered && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="flex items-center gap-1 rounded-xl border border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 px-2.5 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Filter ({filteredCount}/{totalCount})</span>
          </button>
        )}
      </div>
    </div>
  );
};
