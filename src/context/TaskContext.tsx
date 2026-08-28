import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'Work' | 'Personal' | 'Health' | 'Design' | 'Marketing' | 'Finance' | 'Sales';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'active' | 'completed' | 'overdue';
  dueDate: string;
  dueTime?: string;
  score: number;
  completed: boolean;
  createdAt: number;
  completedAt?: string;
  avatars?: string[];
  attachments?: number;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: {
    title: string;
    description: string;
    category: string;
    priority: string;
    dueDate: string;
  }) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  rescheduleTask: (id: string, newDueDate: string) => void;
  rescheduleAllOverdue: () => void;
  clearOverdueTasks: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCount: number;
  overdueCount: number;
  completedCount: number;
  totalCount: number;
  completionRate: number;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TASKS_STORAGE_KEY = 'focus_app_tasks_v2';

const INITIAL_TASKS: Task[] = [
  {
    id: 't-1',
    title: 'Finalize Q3 Budget Report & Executive Proposal',
    description: 'Review departmental spending and consolidate final numbers for board presentation.',
    category: 'Finance',
    priority: 'Critical',
    status: 'overdue',
    dueDate: '2 days ago, 5:00 PM',
    score: 95,
    completed: false,
    createdAt: Date.now() - 86400000 * 3,
    avatars: ['JD', 'AK'],
    attachments: 3,
  },
  {
    id: 't-2',
    title: 'Push Mobile Checkout Hotfix to Production',
    description: 'Resolve the CSS viewport calculation and payment processing callback bug on iOS safari.',
    category: 'Design',
    priority: 'Critical',
    status: 'active',
    dueDate: 'Today, 2:00 PM',
    score: 92,
    completed: false,
    createdAt: Date.now() - 86400000 * 1,
    attachments: 1,
  },
  {
    id: 't-3',
    title: 'Update Component Library & Design Tokens',
    description: 'Include the new button variants, elevate typography scale, and document focus states.',
    category: 'Design',
    priority: 'High',
    status: 'overdue',
    dueDate: 'Yesterday, 6:00 PM',
    score: 84,
    completed: false,
    createdAt: Date.now() - 86400000 * 2,
    avatars: ['AS'],
  },
  {
    id: 't-4',
    title: 'Send Weekly Sprint Progress Report',
    description: 'Summarize team velocity, unblockers, and milestones for executive stakeholders.',
    category: 'Work',
    priority: 'High',
    status: 'active',
    dueDate: 'Today, 4:30 PM',
    score: 78,
    completed: false,
    createdAt: Date.now() - 3600000 * 5,
  },
  {
    id: 't-5',
    title: 'Call Health Insurance Provider',
    description: 'Update billing address, submit claims documentation, and confirm new policy coverage.',
    category: 'Health',
    priority: 'Medium',
    status: 'active',
    dueDate: 'Tomorrow, 10:00 AM',
    score: 62,
    completed: false,
    createdAt: Date.now() - 3600000 * 12,
  },
  {
    id: 't-6',
    title: 'Audit User Permissions and IAM Roles',
    description: 'Re-verify privileged staging keys and production credential rotations across AWS & GCP.',
    category: 'Work',
    priority: 'High',
    status: 'overdue',
    dueDate: '3 days ago',
    score: 88,
    completed: false,
    createdAt: Date.now() - 86400000 * 4,
    avatars: ['JD'],
  },
  {
    id: 't-7',
    title: 'Evening Run & Mobility Routine',
    description: '30-minute recovery jog around the park followed by 15-minute hip and hamstring stretches.',
    category: 'Health',
    priority: 'Medium',
    status: 'active',
    dueDate: 'Today, 6:00 PM',
    score: 55,
    completed: false,
    createdAt: Date.now() - 3600000 * 4,
  },
  {
    id: 't-8',
    title: 'Book Flights for Tokyo Conference',
    description: 'Compare non-stop flights on ANA and JAL. Confirm hotel reservations near Shibuya.',
    category: 'Personal',
    priority: 'Medium',
    status: 'active',
    dueDate: 'Oct 14, 3:00 PM',
    score: 48,
    completed: false,
    createdAt: Date.now() - 3600000 * 20,
  },
  {
    id: 't-9',
    title: 'Reply to Team Q3 Roadmap Feedback',
    description: 'Consolidate engineering team comments on sprint scope and milestone deliverable dates.',
    category: 'Work',
    priority: 'Medium',
    status: 'completed',
    dueDate: 'Today, 9:15 AM',
    score: 0,
    completed: true,
    createdAt: Date.now() - 3600000 * 6,
    completedAt: '9:15 AM',
  },
  {
    id: 't-10',
    title: 'Draft Product Launch Announcement Blog',
    description: 'Write draft copy highlighting major features, interactive demo links, and FAQ section.',
    category: 'Marketing',
    priority: 'Low',
    status: 'completed',
    dueDate: 'Yesterday, 4:00 PM',
    score: 0,
    completed: true,
    createdAt: Date.now() - 86400000 * 2,
    completedAt: 'Yesterday',
  },
];

const calculateScore = (priority: string, isOverdue: boolean): number => {
  let base = 50;
  if (priority === 'Critical') base = 90;
  else if (priority === 'High') base = 75;
  else if (priority === 'Medium') base = 50;
  else if (priority === 'Low') base = 25;

  if (isOverdue) base = Math.min(99, base + 15);
  return base;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(TASKS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_TASKS;
  });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // ignore
    }
  }, [tasks]);

  const addTask = (newTaskData: {
    title: string;
    description: string;
    category: string;
    priority: string;
    dueDate: string;
  }) => {
    const isOverdue = newTaskData.dueDate.toLowerCase().includes('ago') || newTaskData.dueDate.toLowerCase().includes('yesterday');
    const score = calculateScore(newTaskData.priority, isOverdue);

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskData.title.trim(),
      description: newTaskData.description.trim() || 'No additional details provided.',
      category: (newTaskData.category as any) || 'Work',
      priority: (newTaskData.priority as any) || 'Medium',
      status: isOverdue ? 'overdue' : 'active',
      dueDate: newTaskData.dueDate || 'Today, 5:00 PM',
      score,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated = { ...t, ...updates };
          if (updates.priority || updates.dueDate) {
            const isOverdue = updated.dueDate.toLowerCase().includes('ago') || updated.dueDate.toLowerCase().includes('yesterday');
            updated.score = updated.completed ? 0 : calculateScore(updated.priority, isOverdue);
          }
          return updated;
        }
        return t;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return {
            ...t,
            completed: nextCompleted,
            status: nextCompleted ? 'completed' : t.dueDate.toLowerCase().includes('ago') ? 'overdue' : 'active',
            completedAt: nextCompleted ? timeString : undefined,
            score: nextCompleted ? 0 : calculateScore(t.priority, t.dueDate.toLowerCase().includes('ago')),
          };
        }
        return t;
      })
    );
  };

  const rescheduleTask = (id: string, newDueDate: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            dueDate: newDueDate,
            status: 'active',
            score: calculateScore(t.priority, false),
          };
        }
        return t;
      })
    );
  };

  const rescheduleAllOverdue = () => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.status === 'overdue' || (t.dueDate.toLowerCase().includes('ago') && !t.completed)) {
          return {
            ...t,
            dueDate: 'Tomorrow, 5:00 PM',
            status: 'active',
            score: calculateScore(t.priority, false),
          };
        }
        return t;
      })
    );
  };

  const clearOverdueTasks = () => {
    setTasks((prev) => prev.filter((t) => t.status !== 'overdue' && !t.dueDate.toLowerCase().includes('ago')));
  };

  const totalCount = tasks.length;
  const completedCount = useMemo(() => tasks.filter((t) => t.completed).length, [tasks]);
  const overdueCount = useMemo(
    () => tasks.filter((t) => !t.completed && (t.status === 'overdue' || t.dueDate.toLowerCase().includes('ago') || t.dueDate.toLowerCase().includes('yesterday'))).length,
    [tasks]
  );
  const activeCount = useMemo(() => tasks.filter((t) => !t.completed).length, [tasks]);
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleComplete,
        rescheduleTask,
        rescheduleAllOverdue,
        clearOverdueTasks,
        searchQuery,
        setSearchQuery,
        activeCount,
        overdueCount,
        completedCount,
        totalCount,
        completionRate,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
