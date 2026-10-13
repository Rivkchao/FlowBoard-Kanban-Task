import React, { useState, useCallback } from 'react';
import { useKanbanBoard } from './hooks/useKanbanBoard';
import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header';
import { SprintSummary } from './components/SprintSummary';
import { FilterBar } from './components/FilterBar';
import { Board } from './components/Board';
import { NewTaskModal } from './components/NewTaskModal';
import { ConfirmModal } from './components/ConfirmModal';
import { StoryPointsInfoModal } from './components/StoryPointsInfoModal';

export function App() {
  const {
    columns,
    tasks,
    tasksByColumn,
    sprint,
    sprintMetrics,
    allTags,
    searchQuery,
    setSearchQuery,
    selectedPriority,
    setSelectedPriority,
    selectedTag,
    setSelectedTag,
    activeDraggingCardId,
    activeDraggingColumnId,
    handleDropTask,
    handleDropColumn,
    handleUpdateTask,
    handleAddTask,
    handleDeleteTask,
    handleDragStartTask,
    handleDragStartColumn,
    handleResetBoard
  } = useKanbanBoard();

  const { theme, toggleTheme } = useTheme();

  // Modals state
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isStoryPointsModalOpen, setIsStoryPointsModalOpen] = useState(false);

  // Custom Confirm Modal state (replaces native window.confirm)
  const [confirmConfig, setConfirmConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Lanjutkan',
    cancelText: 'Batal',
    type: 'danger',
    action: () => {}
  });

  const openConfirmModal = useCallback(({ title, message, confirmText, cancelText, type, onConfirm }) => {
    setConfirmConfig({
      isOpen: true,
      title,
      message,
      confirmText: confirmText || 'Ya, Lanjutkan',
      cancelText: cancelText || 'Batal',
      type: type || 'danger',
      action: onConfirm
    });
  }, []);

  const closeConfirmModal = useCallback(() => {
    setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // Sleek confirmation for deleting task
  const handleRequestDeleteTask = useCallback((task) => {
    openConfirmModal({
      title: 'Hapus Tugas',
      message: `Apakah Anda yakin ingin menghapus tugas "${task.title}"? Tindakan ini tidak dapat dibatalkan.`,
      confirmText: 'Hapus Tugas',
      type: 'danger',
      onConfirm: () => handleDeleteTask(task.id)
    });
  }, [openConfirmModal, handleDeleteTask]);

  // Sleek confirmation for resetting kanban board
  const handleRequestResetBoard = useCallback(() => {
    openConfirmModal({
      title: 'Reset Kanban Board',
      message: 'Apakah Anda yakin ingin mengembalikan seluruh kartu dan kolom ke sampel data awal bawaan sprint? Semua perubahan saat ini akan diganti.',
      confirmText: 'Reset Board',
      type: 'warning',
      onConfirm: handleResetBoard
    });
  }, [openConfirmModal, handleResetBoard]);

  // Count filtered vs total
  const filteredCount = Object.values(tasksByColumn).reduce(
    (sum, list) => sum + list.length,
    0
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      {/* App Header */}
      <Header
        sprint={sprint}
        sprintMetrics={sprintMetrics}
        onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
        onRequestResetBoard={handleRequestResetBoard}
        onOpenStoryPointsInfo={() => setIsStoryPointsModalOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Agile Dashboard Content */}
      <main className="flex flex-1 flex-col">
        {/* Sprint Goal & Metrics Progress */}
        <SprintSummary
          sprint={sprint}
          sprintMetrics={sprintMetrics}
          onOpenStoryPointsInfo={() => setIsStoryPointsModalOpen(true)}
        />

        {/* Realtime Search & Filter Toolbar */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          allTags={allTags}
          filteredCount={filteredCount}
          totalCount={tasks.length}
        />

        {/* Drag & Drop Kanban Columns */}
        <Board
          columns={columns}
          tasksByColumn={tasksByColumn}
          onUpdateTask={handleUpdateTask}
          onRequestDeleteTask={handleRequestDeleteTask}
          onAddTask={handleAddTask}
          onDragStartTask={handleDragStartTask}
          onDragStartColumn={handleDragStartColumn}
          onDropTask={handleDropTask}
          onDropColumn={handleDropColumn}
          onOpenStoryPointsInfo={() => setIsStoryPointsModalOpen(true)}
          activeDraggingCardId={activeDraggingCardId}
          activeDraggingColumnId={activeDraggingColumnId}
        />
      </main>

      {/* Comprehensive New Task Modal */}
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        columns={columns}
        onAddTask={handleAddTask}
        onOpenStoryPointsInfo={() => setIsStoryPointsModalOpen(true)}
      />

      {/* Custom Sleek Confirmation Modal (Replaces native window.confirm) */}
      <ConfirmModal
        isOpen={confirmConfig.isOpen}
        onClose={closeConfirmModal}
        onConfirm={confirmConfig.action}
        title={confirmConfig.title}
        message={confirmConfig.message}
        confirmText={confirmConfig.confirmText}
        cancelText={confirmConfig.cancelText}
        type={confirmConfig.type}
      />

      {/* Story Points Education Modal */}
      <StoryPointsInfoModal
        isOpen={isStoryPointsModalOpen}
        onClose={() => setIsStoryPointsModalOpen(false)}
      />
    </div>
  );
}

export default App;
