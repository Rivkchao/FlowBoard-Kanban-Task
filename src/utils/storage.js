const STORAGE_KEY_TASKS = 'flowboard_tasks_v1';
const STORAGE_KEY_COLUMNS = 'flowboard_columns_v1';
const STORAGE_KEY_SPRINT = 'flowboard_sprint_v1';

export const loadStoredData = (fallbackTasks, fallbackColumns, fallbackSprint) => {
  try {
    const rawTasks = localStorage.getItem(STORAGE_KEY_TASKS);
    const rawColumns = localStorage.getItem(STORAGE_KEY_COLUMNS);
    const rawSprint = localStorage.getItem(STORAGE_KEY_SPRINT);

    return {
      tasks: rawTasks ? JSON.parse(rawTasks) : fallbackTasks,
      columns: rawColumns ? JSON.parse(rawColumns) : fallbackColumns,
      sprint: rawSprint ? JSON.parse(rawSprint) : fallbackSprint,
    };
  } catch (error) {
    console.error('Gagal membaca data dari LocalStorage:', error);
    return {
      tasks: fallbackTasks,
      columns: fallbackColumns,
      sprint: fallbackSprint,
    };
  }
};

export const saveStoredData = (tasks, columns, sprint) => {
  try {
    if (tasks) localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
    if (columns) localStorage.setItem(STORAGE_KEY_COLUMNS, JSON.stringify(columns));
    if (sprint) localStorage.setItem(STORAGE_KEY_SPRINT, JSON.stringify(sprint));
  } catch (error) {
    console.error('Gagal menyimpan data ke LocalStorage:', error);
  }
};

export const clearStoredData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY_TASKS);
    localStorage.removeItem(STORAGE_KEY_COLUMNS);
    localStorage.removeItem(STORAGE_KEY_SPRINT);
  } catch (error) {
    console.error('Gagal membersihkan data LocalStorage:', error);
  }
};
