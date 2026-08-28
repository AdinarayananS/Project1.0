import React, { useState } from 'react';
import { ScreenType, TransitionType } from '../types';
import { useTasks, Task } from '../context/TaskContext';
import { EditTaskModal } from './EditTaskModal';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenType, transition?: TransitionType) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  const {
    tasks,
    activeCount,
    overdueCount,
    completedCount,
    completionRate,
    toggleComplete,
    deleteTask,
    updateTask,
  } = useTasks();

  const [completingId, setCompletingId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const handleCompleteTask = (id: string) => {
    setCompletingId(id);
    setTimeout(() => {
      toggleComplete(id);
      setCompletingId(null);
    }, 350);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return { bg: 'bg-error/10 text-error', border: 'bg-error' };
      case 'High':
        return { bg: 'bg-tertiary/10 text-tertiary', border: 'bg-tertiary' };
      case 'Medium':
        return { bg: 'bg-secondary/10 text-secondary', border: 'bg-secondary' };
      case 'Low':
      default:
        return { bg: 'bg-primary/10 text-primary', border: 'bg-primary' };
    }
  };

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (completionRate / 100) * circumference;

  return (
    <div className="flex flex-col w-full gap-2xl pb-3xl px-lg lg:px-2xl pt-md">
      {/* Dashboard Summary - Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
        {/* Progress Card */}
        <div
          onClick={() => onNavigate('active-tasks', 'push')}
          className="bg-surface-container rounded-[32px] p-xl flex flex-col justify-between relative overflow-hidden shadow-sm group cursor-pointer hover:shadow-md transition-all hover:bg-surface-container-high"
        >
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-700"></div>
          <h3 className="font-label-md text-label-md text-outline uppercase tracking-widest mb-md">
            Daily Flow
          </h3>
          <div className="flex items-end gap-md z-10">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  className="stroke-surface-variant fill-none"
                  cx="50"
                  cy="50"
                  r="40"
                  strokeWidth="8"
                />
                <circle
                  className="stroke-primary fill-none transition-all duration-1000 ease-out"
                  cx="50"
                  cy="50"
                  r="40"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  strokeWidth="8"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-headline-md text-headline-md text-primary">
                  {completionRate}
                  <span className="text-label-sm">%</span>
                </span>
              </div>
            </div>
            <div className="mb-sm">
              <p className="font-headline-md text-headline-md text-on-surface">
                {completionRate >= 70 ? 'Excellent' : completionRate >= 40 ? 'On Track' : 'Starting'}
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                {completedCount} of {tasks.length} done
              </p>
            </div>
          </div>
        </div>

        {/* Today's Tasks */}
        <div
          onClick={() => onNavigate('active-tasks', 'push')}
          className="bg-surface-container rounded-[32px] p-xl flex flex-col justify-between shadow-sm relative overflow-hidden group cursor-pointer hover:shadow-md transition-all hover:bg-surface-container-high"
        >
          <div className="absolute -right-8 -bottom-8 text-primary opacity-5 group-hover:opacity-10 transition-opacity duration-500 group-hover:scale-110">
            <span className="material-symbols-outlined text-[120px]">today</span>
          </div>
          <h3 className="font-label-md text-label-md text-outline uppercase tracking-widest mb-md">
            Active Tasks
          </h3>
          <div>
            <span className="font-headline-xl text-headline-xl text-on-surface">{activeCount}</span>
            <p className="font-body-md text-body-md text-on-surface-variant">Pending completion</p>
          </div>
        </div>

        {/* Overdue Card */}
        <div
          onClick={() => onNavigate('overdue-tasks', 'push')}
          className="bg-error-container rounded-[32px] p-xl flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-all cursor-pointer hover:scale-[1.01]"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-error/20 to-transparent mix-blend-multiply opacity-50"></div>
          <h3 className="font-label-md text-label-md text-on-error-container uppercase tracking-widest mb-md opacity-80">
            Overdue
          </h3>
          <div className="z-10">
            <span className="font-headline-xl text-headline-xl text-on-error-container font-bold">
              {overdueCount}
            </span>
            <p className="font-body-md text-body-md text-on-error-container opacity-90">
              {overdueCount === 0 ? 'All caught up' : 'Needs attention'}
            </p>
          </div>
        </div>

        {/* Completed */}
        <div
          onClick={() => onNavigate('all-tasks', 'push')}
          className="bg-surface-container rounded-[32px] p-xl flex flex-col justify-between shadow-sm relative overflow-hidden group cursor-pointer hover:shadow-md transition-all hover:bg-surface-container-high"
        >
          <div className="absolute right-4 bottom-4 w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-secondary text-[32px]">task_alt</span>
          </div>
          <h3 className="font-label-md text-label-md text-outline uppercase tracking-widest mb-md">
            Completed
          </h3>
          <div className="z-10">
            <span className="font-headline-xl text-headline-xl text-on-surface">{completedCount}</span>
            <p className="font-body-md text-body-md text-on-surface-variant">Tasks completed</p>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2xl">
        {/* Tasks Column (Left) */}
        <div className="lg:col-span-8 flex flex-col gap-2xl">
          {/* Section: Today */}
          <section>
            <div className="flex items-center justify-between gap-md mb-xl">
              <div className="flex items-center gap-md">
                <h2 className="font-headline-lg text-headline-lg text-on-surface">Focus Today</h2>
                <span className="px-sm py-xs bg-primary-container text-on-primary-container rounded-full font-label-sm text-label-sm">
                  {activeTasks.length} Tasks
                </span>
              </div>
              <button
                onClick={() => onNavigate('all-tasks', 'push')}
                className="text-primary hover:underline font-label-md text-sm cursor-pointer flex items-center gap-1"
              >
                View all <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            <div className="flex flex-col gap-sm" id="today-tasks">
              {activeTasks.length === 0 ? (
                <div className="bg-surface-container-low rounded-2xl p-xl text-center flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[48px]">celebration</span>
                  <p className="font-headline-md text-on-surface font-semibold">You're all done for today!</p>
                  <p className="font-body-md text-on-surface-variant text-sm">
                    No active tasks pending. Enjoy your focus time or create a new task.
                  </p>
                </div>
              ) : (
                activeTasks.slice(0, 5).map((task) => {
                  const isCompleting = completingId === task.id;
                  const { bg, border } = getPriorityBadge(task.priority);
                  const isOverdue =
                    task.status === 'overdue' ||
                    task.dueDate.toLowerCase().includes('ago') ||
                    task.dueDate.toLowerCase().includes('yesterday');

                  return (
                    <div
                      key={task.id}
                      className={`task-card relative bg-surface-container-low rounded-2xl p-md shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-[2px] transition-all flex items-start gap-lg group overflow-hidden border border-outline-variant/10 ${
                        isCompleting ? 'opacity-40 scale-95 transition-all duration-300' : ''
                      }`}
                    >
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isOverdue ? 'bg-error' : border}`}></div>

                      <button
                        aria-label="Mark completed"
                        onClick={() => handleCompleteTask(task.id)}
                        className={`task-checkbox w-7 h-7 rounded-[6px] flex-shrink-0 flex items-center justify-center transition-all cursor-pointer mt-1 ${
                          isCompleting
                            ? 'bg-primary text-on-primary'
                            : isOverdue
                            ? 'bg-error/10 hover:bg-error/20'
                            : 'bg-surface-container-highest hover:bg-primary-container'
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-[20px] transition-all ${
                            isCompleting
                              ? 'opacity-100 text-on-primary scale-100'
                              : 'opacity-0 scale-50 group-hover:opacity-60 text-primary'
                          }`}
                        >
                          check
                        </span>
                      </button>

                      <div className="flex-1 min-w-0 flex flex-col gap-xs">
                        <div className="flex items-center gap-sm flex-wrap">
                          <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm ${bg}`}>
                            {task.priority}
                          </span>
                          <span className="px-2 py-0.5 bg-surface-variant text-on-surface-variant rounded-full font-label-sm text-label-sm">
                            {task.category}
                          </span>
                          <span
                            className={`font-label-sm text-label-sm flex items-center gap-xs ${
                              isOverdue ? 'text-error font-medium' : 'text-outline'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[14px]">
                              {isOverdue ? 'warning' : 'schedule'}
                            </span>
                            {task.dueDate}
                          </span>
                        </div>

                        <h4
                          className={`font-headline-md text-headline-md text-on-surface truncate ${
                            isCompleting ? 'line-through text-outline' : ''
                          }`}
                        >
                          {task.title}
                        </h4>
                        {task.description && (
                          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 text-sm">
                            {task.description}
                          </p>
                        )}
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 flex gap-xs transition-opacity mt-1">
                        <button
                          onClick={() => setEditingTask(task)}
                          className="p-2 rounded-full text-outline hover:bg-surface-variant hover:text-primary transition-colors cursor-pointer"
                          title="Edit task"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-2 rounded-full text-outline hover:bg-error-container hover:text-error transition-colors cursor-pointer"
                          title="Delete task"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* Section: Active Sprints & Upcoming */}
          <section className="mt-lg">
            <div className="flex items-center justify-between mb-lg">
              <h2 className="font-headline-md text-headline-md text-on-surface">Upcoming Deadlines</h2>
              <button
                onClick={() => onNavigate('active-tasks', 'push')}
                className="text-primary text-xs font-label-md hover:underline cursor-pointer"
              >
                Sprint View
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              {activeTasks.slice(2, 6).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigate('all-tasks', 'push')}
                  className="task-card relative bg-surface-container rounded-2xl p-md flex items-start gap-md group overflow-hidden cursor-pointer hover:bg-surface-container-high transition-colors border border-outline-variant/20"
                >
                  <div className="flex-1 min-w-0 flex flex-col gap-xs">
                    <div className="flex items-center gap-sm flex-wrap">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full font-label-sm text-xs font-medium">
                        {item.priority}
                      </span>
                      <span className="px-2 py-0.5 bg-surface-variant text-on-surface-variant rounded-full font-label-sm text-xs">
                        {item.category}
                      </span>
                      <span className="font-label-sm text-xs text-outline flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">schedule</span>
                        {item.dueDate}
                      </span>
                    </div>
                    <h4 className="font-body-md text-on-surface font-semibold truncate mt-1">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Column (Right) */}
        <div className="lg:col-span-4 flex flex-col gap-2xl">
          {/* Visual Element: Inspiration/Mood */}
          <div className="relative w-full h-48 rounded-[32px] overflow-hidden shadow-sm group">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXxuMTJeedLS9odkOQL4eTsxjx3TIJTWQMxF4pFz2xPAgNtEt-vlLraxuGFY50HRvWPEUbbmIqHLC889f3SUbB5ljN2p_sGYTu7k5XYpzio4ZuV1rlzxPILGzhiF57a8mO986NoklZkpVln14V7IF-JtetnddFF3MWa5iEUp-WZB7dWeJiPyDmoD7Q809hC6PmKbRoTgqnW93OIogrpKiQh1MLQcCaT0FEHzdRD-F2h8wFP7g1s3aK')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-lg left-lg right-lg">
              <p className="font-label-sm text-label-sm text-inverse-on-surface uppercase tracking-widest opacity-80 mb-1">
                Daily Quote
              </p>
              <p className="font-body-lg text-body-lg text-inverse-on-surface italic">
                "Focus on being productive instead of busy."
              </p>
            </div>
          </div>

          {/* Recently Completed */}
          <section className="bg-surface-container-low rounded-[32px] p-xl shadow-sm flex flex-col gap-lg border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-sm text-base font-semibold">
                <span className="material-symbols-outlined text-primary text-[20px]">done_all</span> Recently Completed
              </h2>
              <span className="text-xs font-label-md text-outline font-medium">{completedTasks.length} Done</span>
            </div>

            <div className="flex flex-col gap-md" id="completed-tasks">
              {completedTasks.length === 0 ? (
                <p className="text-xs text-outline italic">No completed tasks yet today.</p>
              ) : (
                completedTasks.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-md opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <button
                      onClick={() => toggleComplete(item.id)}
                      className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 hover:bg-error/20 hover:text-error transition-colors cursor-pointer"
                      title="Click to uncomplete"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        check
                      </span>
                    </button>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-body-md text-body-md text-on-surface line-through truncate text-sm">
                        {item.title}
                      </h4>
                      <p className="font-label-sm text-label-sm text-outline mt-0.5 text-[11px]">
                        {item.completedAt ? `Completed at ${item.completedAt}` : 'Completed'}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Edit Task Modal */}
      <EditTaskModal
        isOpen={Boolean(editingTask)}
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={(id, updates) => updateTask(id, updates)}
      />
    </div>
  );
};
