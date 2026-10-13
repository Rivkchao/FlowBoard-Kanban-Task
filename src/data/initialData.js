export const INITIAL_MEMBERS = [
  { id: 'u1', name: 'Alex Rivera', role: 'Frontend Lead', avatar: 'AR', color: 'from-blue-500 to-indigo-600' },
  { id: 'u2', name: 'Sarah Chen', role: 'Backend Eng', avatar: 'SC', color: 'from-emerald-500 to-teal-600' },
  { id: 'u3', name: 'Marco Rossi', role: 'UI/UX Designer', avatar: 'MR', color: 'from-amber-500 to-orange-600' },
  { id: 'u4', name: 'Ayu Lestari', role: 'Fullstack Dev', avatar: 'AL', color: 'from-purple-500 to-pink-600' },
];

export const PRIORITY_CONFIG = {
  Urgent: {
    label: 'Urgent',
    badgeClass: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
    dotClass: 'bg-rose-500',
    iconColor: 'text-rose-400'
  },
  High: {
    label: 'High',
    badgeClass: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    dotClass: 'bg-amber-500',
    iconColor: 'text-amber-400'
  },
  Medium: {
    label: 'Medium',
    badgeClass: 'bg-sky-500/15 text-sky-400 border border-sky-500/30',
    dotClass: 'bg-sky-500',
    iconColor: 'text-sky-400'
  },
  Low: {
    label: 'Low',
    badgeClass: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    dotClass: 'bg-emerald-500',
    iconColor: 'text-emerald-400'
  }
};

export const INITIAL_COLUMNS = [
  {
    id: 'col-backlog',
    title: 'Backlog',
    description: 'Rencana fitur dan tugas sprint yang akan datang',
    colorAccent: 'border-t-slate-500',
    badgeColor: 'bg-slate-700/60 text-slate-300'
  },
  {
    id: 'col-in-progress',
    title: 'In Progress',
    description: 'Tugas yang sedang aktif dikerjakan oleh tim',
    colorAccent: 'border-t-indigo-500',
    badgeColor: 'bg-indigo-500/20 text-indigo-300'
  },
  {
    id: 'col-review',
    title: 'In Review',
    description: 'Tahap code review & quality assurance testing',
    colorAccent: 'border-t-amber-500',
    badgeColor: 'bg-amber-500/20 text-amber-300'
  },
  {
    id: 'col-done',
    title: 'Done',
    description: 'Fitur selesai dan terverifikasi siap deploy',
    colorAccent: 'border-t-emerald-500',
    badgeColor: 'bg-emerald-500/20 text-emerald-300'
  }
];

export const INITIAL_TASKS = [
  {
    id: 'task-101',
    columnId: 'col-backlog',
    title: 'Arsitektur WebSocket Realtime Sync',
    description: 'Implementasi event streaming untuk multi-user kanban collaborative editing',
    priority: 'High',
    tags: ['Backend', 'WebSocket', 'Architecture'],
    assignee: INITIAL_MEMBERS[1], // Sarah Chen
    createdAt: '2026-09-15',
    dueDate: '2026-09-22',
    storyPoints: 5
  },
  {
    id: 'task-102',
    columnId: 'col-backlog',
    title: 'Audit Aksesibilitas WCAG 2.1 AA',
    description: 'Memastikan keyboard navigation & contrast ratio memenuhi standar',
    priority: 'Low',
    tags: ['Accessibility', 'QA'],
    assignee: INITIAL_MEMBERS[2], // Marco Rossi
    createdAt: '2026-09-16',
    dueDate: '2026-09-28',
    storyPoints: 2
  },
  {
    id: 'task-103',
    columnId: 'col-in-progress',
    title: 'Optimistic UI Drag & Drop Flow',
    description: 'Penataan ulang kartu kanban dengan indikator drop visual dan shallow diffing',
    priority: 'Urgent',
    tags: ['Frontend', 'Performance', 'React'],
    assignee: INITIAL_MEMBERS[0], // Alex Rivera
    createdAt: '2026-09-14',
    dueDate: '2026-09-18',
    storyPoints: 8
  },
  {
    id: 'task-104',
    columnId: 'col-in-progress',
    title: 'Refaktor Dark Mode & Tailwind Layout',
    description: 'Penyesuaian palet warna slate modern & transisi fluid pada board container',
    priority: 'Medium',
    tags: ['UI/UX', 'Tailwind'],
    assignee: INITIAL_MEMBERS[3], // Ayu Lestari
    createdAt: '2026-09-15',
    dueDate: '2026-09-19',
    storyPoints: 3
  },
  {
    id: 'task-105',
    columnId: 'col-review',
    title: 'Integrasi LocalStorage Persistence',
    description: 'Auto-save state status kartu dan sorting kolom tanpa kehilangan data saat refresh',
    priority: 'High',
    tags: ['Storage', 'Core'],
    assignee: INITIAL_MEMBERS[0], // Alex Rivera
    createdAt: '2026-09-13',
    dueDate: '2026-09-17',
    storyPoints: 3
  },
  {
    id: 'task-106',
    columnId: 'col-done',
    title: 'Setup Vite & Tailwind Build Pipeline',
    description: 'Inisialisasi tooling React 18, PostCSS, konfigurasi font Inter & Lucide icons',
    priority: 'Medium',
    tags: ['DevOps', 'Tooling'],
    assignee: INITIAL_MEMBERS[3], // Ayu Lestari
    createdAt: '2026-09-12',
    dueDate: '2026-09-14',
    storyPoints: 2
  },
  {
    id: 'task-107',
    columnId: 'col-done',
    title: 'Sprint Planning & User Stories Mapping',
    description: 'Menentukan milestone MVP FlowBoard dan alokasi story points sprint 24',
    priority: 'Low',
    tags: ['Planning', 'Agile'],
    assignee: INITIAL_MEMBERS[2], // Marco Rossi
    createdAt: '2026-09-10',
    dueDate: '2026-09-12',
    storyPoints: 3
  }
];

export const INITIAL_SPRINT = {
  name: 'Sprint 24: Core Platform & Fluid UX',
  goal: 'Menghadirkan kanban board berkecepatan tinggi dengan gesture drag & drop responsif dan instant search',
  startDate: '2026-09-14',
  endDate: '2026-09-25',
};
