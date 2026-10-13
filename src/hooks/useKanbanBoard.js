import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  INITIAL_TASKS, 
  INITIAL_COLUMNS, 
  INITIAL_SPRINT 
} from '../data/initialData';
import { 
  loadStoredData, 
  saveStoredData, 
  clearStoredData 
} from '../utils/storage';

export function useKanbanBoard() {
  // Initialize state from LocalStorage or default initialData
  const [data, setData] = useState(() => {
    return loadStoredData(INITIAL_TASKS, INITIAL_COLUMNS, INITIAL_SPRINT);
  });

  const [activeDraggingCardId, setActiveDraggingCardId] = useState(null);
  const [activeDraggingColumnId, setActiveDraggingColumnId] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedMember, setSelectedMember] = useState('All');

  // Sync to LocalStorage whenever tasks, columns, or sprint change
  useEffect(() => {
    saveStoredData(data.tasks, data.columns, data.sprint);
  }, [data]);

  // Extract all unique tags across tasks
  const allTags = useMemo(() => {
    const tagsSet = new Set();
    data.tasks.forEach((task) => {
      if (task.tags && Array.isArray(task.tags)) {
        task.tags.forEach((tag) => tagsSet.add(tag));
      }
    });
    return Array.from(tagsSet);
  }, [data.tasks]);

  // Filter tasks with high-performance filter logic
  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return data.tasks.filter((task) => {
      // 1. Search Query filter (matches title or description)
      if (query) {
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = (task.description || '').toLowerCase().includes(query);
        const matchesTag = task.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesTag) return false;
      }

      // 2. Priority filter
      if (selectedPriority !== 'All' && task.priority !== selectedPriority) {
        return false;
      }

      // 3. Tag filter
      if (selectedTag !== 'All' && (!task.tags || !task.tags.includes(selectedTag))) {
        return false;
      }

      // 4. Member filter
      if (selectedMember !== 'All' && task.assignee?.id !== selectedMember) {
        return false;
      }

      return true;
    });
  }, [data.tasks, searchQuery, selectedPriority, selectedTag, selectedMember]);

  // Memoized tasks grouped by columnId for shallow diffing in columns
  const tasksByColumn = useMemo(() => {
    const map = {};
    data.columns.forEach((col) => {
      map[col.id] = [];
    });

    filteredTasks.forEach((task) => {
      if (map[task.columnId]) {
        map[task.columnId].push(task);
      } else {
        // Fallback if column was deleted or mismatched
        if (!map['col-backlog']) map['col-backlog'] = [];
        map['col-backlog'].push(task);
      }
    });

    return map;
  }, [data.columns, filteredTasks]);

  // Optimistic Card Reorder and Move
  const handleDropTask = useCallback((cardId, targetColumnId, beforeId) => {
    setData((prev) => {
      const taskToMove = prev.tasks.find((t) => t.id === cardId);
      if (!taskToMove) return prev;

      // Create a shallow copy without the moved task
      let updatedTasks = prev.tasks.filter((t) => t.id !== cardId);

      const updatedMovedTask = {
        ...taskToMove,
        columnId: targetColumnId,
      };

      if (beforeId === '-1' || !beforeId) {
        // Append to the end of the target column
        updatedTasks.push(updatedMovedTask);
      } else {
        // Find index of the task with beforeId
        const targetIndex = updatedTasks.findIndex((t) => t.id === beforeId);
        if (targetIndex !== -1) {
          updatedTasks.splice(targetIndex, 0, updatedMovedTask);
        } else {
          updatedTasks.push(updatedMovedTask);
        }
      }

      return {
        ...prev,
        tasks: updatedTasks,
      };
    });

    setActiveDraggingCardId(null);
  }, []);

  // Column Reorder
  const handleDropColumn = useCallback((sourceColumnId, targetColumnId) => {
    setData((prev) => {
      const sourceIndex = prev.columns.findIndex((c) => c.id === sourceColumnId);
      const targetIndex = prev.columns.findIndex((c) => c.id === targetColumnId);

      if (sourceIndex === -1 || targetIndex === -1 || sourceIndex === targetIndex) {
        return prev;
      }

      const newColumns = [...prev.columns];
      const [movedColumn] = newColumns.splice(sourceIndex, 1);
      newColumns.splice(targetIndex, 0, movedColumn);

      return {
        ...prev,
        columns: newColumns,
      };
    });

    setActiveDraggingColumnId(null);
  }, []);

  // Update Task fields (Quick inline editing)
  const handleUpdateTask = useCallback((taskId, updates) => {
    setData((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      ),
    }));
  }, []);

  // Add Task
  const handleAddTask = useCallback((columnId, taskData) => {
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      columnId,
      title: taskData.title || 'Tugas Baru',
      description: taskData.description || '',
      priority: taskData.priority || 'Medium',
      tags: taskData.tags || [],
      assignee: taskData.assignee || null,
      createdAt: new Date().toISOString().split('T')[0],
      dueDate: taskData.dueDate || '',
      storyPoints: taskData.storyPoints || 1,
    };

    setData((prev) => ({
      ...prev,
      tasks: [newTask, ...prev.tasks],
    }));
  }, []);

  // Delete Task
  const handleDeleteTask = useCallback((taskId) => {
    setData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== taskId),
    }));
  }, []);

  // Drag start triggers
  const handleDragStartTask = useCallback((e, task) => {
    setActiveDraggingCardId(task.id);
    e.dataTransfer.setData('application/flowboard-card', JSON.stringify({ cardId: task.id }));
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragStartColumn = useCallback((e, columnId) => {
    setActiveDraggingColumnId(columnId);
    e.dataTransfer.setData('application/flowboard-column', JSON.stringify({ columnId }));
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  // Reset to initial demo board
  const handleResetBoard = useCallback(() => {
    clearStoredData();
    setData({
      tasks: INITIAL_TASKS,
      columns: INITIAL_COLUMNS,
      sprint: INITIAL_SPRINT,
    });
    setSearchQuery('');
    setSelectedPriority('All');
    setSelectedTag('All');
    setSelectedMember('All');
  }, []);

  // Sprint metrics
  const sprintMetrics = useMemo(() => {
    const total = data.tasks.length;
    const doneTasks = data.tasks.filter((t) => t.columnId === 'col-done').length;
    const inProgressTasks = data.tasks.filter((t) => t.columnId === 'col-in-progress').length;
    const reviewTasks = data.tasks.filter((t) => t.columnId === 'col-review').length;
    const backlogTasks = data.tasks.filter((t) => t.columnId === 'col-backlog').length;

    const totalPoints = data.tasks.reduce((sum, t) => sum + (t.storyPoints || 0), 0);
    const completedPoints = data.tasks
      .filter((t) => t.columnId === 'col-done')
      .reduce((sum, t) => sum + (t.storyPoints || 0), 0);

    const progressPercentage = total > 0 ? Math.round((doneTasks / total) * 100) : 0;
    const pointsPercentage = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;

    return {
      total,
      doneTasks,
      inProgressTasks,
      reviewTasks,
      backlogTasks,
      totalPoints,
      completedPoints,
      progressPercentage,
      pointsPercentage,
    };
  }, [data.tasks]);

  return {
    columns: data.columns,
    tasks: data.tasks,
    tasksByColumn,
    sprint: data.sprint,
    sprintMetrics,
    allTags,
    // Filter controls
    searchQuery,
    setSearchQuery,
    selectedPriority,
    setSelectedPriority,
    selectedTag,
    setSelectedTag,
    selectedMember,
    setSelectedMember,
    // Drag state
    activeDraggingCardId,
    activeDraggingColumnId,
    // Actions
    handleDropTask,
    handleDropColumn,
    handleUpdateTask,
    handleAddTask,
    handleDeleteTask,
    handleDragStartTask,
    handleDragStartColumn,
    handleResetBoard,
  };
}
