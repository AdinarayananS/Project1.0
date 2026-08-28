import React, { useState } from 'react';
import { ScreenType, TransitionType } from '../types';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenType, transition?: TransitionType) => void;
}

interface CompletedItem {
  id: string;
  title: string;
  timeStr: string;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  const [completedList, setCompletedList] = useState<CompletedItem[]>([
    { id: 'c1', title: 'Reply to team emails', timeStr: 'Completed at 9:14 AM' },
    { id: 'c2', title: 'Draft blog outline', timeStr: 'Completed Yesterday' },
  ]);

  const [activeTasks, setActiveTasks] = useState([
    {
      id: 't1',
      title: 'Finalize Q3 Budget Report',
      description: 'Review departmental spending and consolidate the final numbers for the board meeting presentation.',
      tag: 'Critical',
      tagType: 'critical',
      category: 'Work',
      due: 'Overdue by 2 days',
      accentColor: 'bg-error',
      isOverdue: true,
    },
    {
      id: 't2',
      title: 'Push Hotfix to Production',
      description: 'Resolve the checkout styling bug affecting mobile users.',
      tag: 'Critical',
      tagType: 'critical',
      category: 'Design',
      due: 'Due in 1h',
      accentColor: 'bg-error',
      isOverdue: false,
    },
    {
      id: 't3',
      title: 'Call Insurance Provider',
      description: 'Update billing address and confirm new policy details.',
      tag: 'High',
      tagType: 'high',
      category: 'Personal',
      due: 'Due in 4h',
      accentColor: 'bg-tertiary',
      isOverdue: false,
    },
    {
      id: 't4',
      title: 'Evening Run & Stretch',
      description: '30-minute recovery run and 15-minute mobility routine.',
      tag: 'Medium',
      tagType: 'medium',
      category: 'Fitness',
      due: 'Due Today 5:00 PM',
      accentColor: 'bg-secondary',
      isOverdue: false,
    },
  ]);

  const [completingId, setCompletingId] = useState<string | null>(null);

  const handleCompleteTask = (id: string, title: string) => {
    setCompletingId(id);
    setTimeout(() => {
      setActiveTasks((prev) => prev.filter((t) => t.id !== id));
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCompletedList((prev) => [
        { id: `c-${Date.now()}`, title, timeStr: `Completed at ${timeString}` },
        ...prev,
      ]);
      setCompletingId(null);
    }, 450);
  };

  return (
    <div className="flex flex-col w-full gap-2xl pb-3xl">
      {/* Dashboard Summary - Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
        {/* Progress Card */}
        <div
          onClick={() => onNavigate('active-tasks', 'push')}
          className="bg-surface-container rounded-[32px] p-xl flex flex-col justify-between relative overflow-hidden shadow-sm group cursor-pointer hover:shadow-md transition-shadow"
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
                  strokeDasharray="251.2"
                  strokeDashoffset="80"
                  strokeLinecap="round"
                  strokeWidth="8"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-headline-md text-headline-md text-primary">
                  68<span className="text-label-sm">%</span>
                </span>
              </div>
            </div>
            <div className="mb-sm">
              <p className="font-headline-md text-headline-md text-on-surface">Great</p>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">On track</p>
            </div>
          </div>
        </div>

        {/* Today's Tasks */}
        <div
          onClick={() => onNavigate('active-tasks', 'push')}
          className="bg-surface-container rounded-[32px] p-xl flex flex-col justify-between shadow-sm relative overflow-hidden group cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="absolute -right-8 -bottom-8 text-primary opacity-5 group-hover:opacity-10 transition-opacity duration-500 group-hover:scale-110">
            <span className="material-symbols-outlined text-[120px]">today</span>
          </div>
          <h3 className="font-label-md text-label-md text-outline uppercase tracking-widest mb-md">
            Today
          </h3>
          <div>
            <span className="font-headline-xl text-headline-xl text-on-surface">{activeTasks.length + 1}</span>
            <p className="font-body-md text-body-md text-on-surface-variant">Active tasks left</p>
          </div>
        </div>

        {/* Overdue Card (Specific xpath match) */}
        <div
          onClick={() => onNavigate('overdue-tasks', 'push')}
          className="bg-error-container rounded-[32px] p-xl flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-error/20 to-transparent mix-blend-multiply opacity-50"></div>
          <h3 className="font-label-md text-label-md text-on-error-container uppercase tracking-widest mb-md opacity-80">
            Overdue
          </h3>
          <div className="z-10">
            <span className="font-headline-xl text-headline-xl text-on-error-container">1</span>
            <p className="font-body-md text-body-md text-on-error-container opacity-90">
              Needs attention
            </p>
          </div>
        </div>

        {/* Completed */}
        <div
          onClick={() => onNavigate('all-tasks', 'push')}
          className="bg-surface-container rounded-[32px] p-xl flex flex-col justify-between shadow-sm relative overflow-hidden group cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="absolute right-4 bottom-4 w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-secondary text-[32px]">task_alt</span>
          </div>
          <h3 className="font-label-md text-label-md text-outline uppercase tracking-widest mb-md">
            Completed
          </h3>
          <div className="z-10">
            <span className="font-headline-xl text-headline-xl text-on-surface">{completedList.length + 10}</span>
            <p className="font-body-md text-body-md text-on-surface-variant">Tasks done</p>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2xl">
        {/* Tasks Column (Left) */}
        <div className="lg:col-span-8 flex flex-col gap-2xl">
          {/* Section: Today */}
          <section>
            <div className="flex items-center gap-md mb-xl">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Focus Today</h2>
              <span className="px-sm py-xs bg-primary-container text-on-primary-container rounded-full font-label-sm text-label-sm">
                {activeTasks.length + 1} Tasks
              </span>
            </div>

            <div className="flex flex-col gap-sm" id="today-tasks">
              {activeTasks.map((task) => {
                const isCompleting = completingId === task.id;
                return (
                  <div
                    key={task.id}
                    className={`task-card relative bg-surface-container-low rounded-2xl p-md shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-[2px] transition-all flex items-start gap-lg group overflow-hidden ${
                      isCompleting ? 'opacity-40 scale-95 transition-all duration-300' : ''
                    }`}
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${task.accentColor}`}></div>
                    
                    <button
                      aria-label="Mark completed"
                      onClick={() => handleCompleteTask(task.id, task.title)}
                      className={`task-checkbox w-7 h-7 rounded-[6px] flex-shrink-0 flex items-center justify-center transition-all cursor-pointer mt-1 ${
                        isCompleting
                          ? 'bg-primary text-on-primary'
                          : task.isOverdue
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
                        {task.tagType === 'critical' && (
                          <span className="px-2 py-0.5 bg-error/10 text-error rounded-full font-label-sm text-label-sm">
                            {task.tag}
                          </span>
                        )}
                        {task.tagType === 'high' && (
                          <span className="px-2 py-0.5 bg-tertiary/10 text-tertiary rounded-full font-label-sm text-label-sm">
                            {task.tag}
                          </span>
                        )}
                        {task.tagType === 'medium' && (
                          <span className="px-2 py-0.5 bg-secondary/10 text-secondary rounded-full font-label-sm text-label-sm">
                            {task.tag}
                          </span>
                        )}
                        <span className="px-2 py-0.5 bg-surface-variant text-on-surface-variant rounded-full font-label-sm text-label-sm">
                          {task.category}
                        </span>
                        <span
                          className={`font-label-sm text-label-sm flex items-center gap-xs ${
                            task.isOverdue ? 'text-error' : 'text-outline'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {task.isOverdue ? 'timer' : 'schedule'}
                          </span>
                          {task.due}
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
                        <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                          {task.description}
                        </p>
                      )}
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 flex gap-xs transition-opacity mt-1">
                      <button
                        onClick={() => onNavigate('all-tasks', 'push')}
                        className="p-2 rounded-full text-outline hover:bg-surface-variant hover:text-primary transition-colors cursor-pointer"
                        title="Edit task"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button
                        onClick={() => setActiveTasks((prev) => prev.filter((t) => t.id !== task.id))}
                        className="p-2 rounded-full text-outline hover:bg-error-container hover:text-error transition-colors cursor-pointer"
                        title="Delete task"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section: Upcoming */}
          <section className="mt-lg">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-lg">Upcoming</h2>
            <div className="flex flex-col gap-sm">
              <div
                onClick={() => onNavigate('active-tasks', 'push')}
                className="task-card relative bg-surface rounded-2xl p-md flex items-start gap-lg group overflow-hidden cursor-pointer hover:bg-surface-container-low transition-colors"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <button className="task-checkbox w-7 h-7 rounded-[6px] bg-surface-container-highest hover:bg-primary-container flex-shrink-0 flex items-center justify-center transition-colors mt-1">
                  <span className="material-symbols-outlined text-on-primary-container opacity-0 scale-50 group-hover:opacity-50 transition-all text-[20px]">
                    check
                  </span>
                </button>
                <div className="flex-1 min-w-0 flex flex-col gap-xs">
                  <div className="flex items-center gap-sm flex-wrap">
                    <span className="px-2 py-0.5 bg-secondary/10 text-secondary rounded-full font-label-sm text-label-sm">
                      Medium
                    </span>
                    <span className="px-2 py-0.5 bg-surface-variant text-on-surface-variant rounded-full font-label-sm text-label-sm">
                      Work
                    </span>
                    <span className="font-label-sm text-label-sm text-outline flex items-center gap-xs">
                      Due Tomorrow
                    </span>
                  </div>
                  <h4 className="font-body-lg text-body-lg text-on-surface truncate">
                    Prepare Slide Deck
                  </h4>
                </div>
              </div>

              <div
                onClick={() => onNavigate('active-tasks', 'push')}
                className="task-card relative bg-surface rounded-2xl p-md flex items-start gap-lg group overflow-hidden cursor-pointer hover:bg-surface-container-low transition-colors"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <button className="task-checkbox w-7 h-7 rounded-[6px] bg-surface-container-highest hover:bg-primary-container flex-shrink-0 flex items-center justify-center transition-colors mt-1">
                  <span className="material-symbols-outlined text-on-primary-container opacity-0 scale-50 group-hover:opacity-50 transition-all text-[20px]">
                    check
                  </span>
                </button>
                <div className="flex-1 min-w-0 flex flex-col gap-xs">
                  <div className="flex items-center gap-sm flex-wrap">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full font-label-sm text-label-sm">
                      Low
                    </span>
                    <span className="px-2 py-0.5 bg-surface-variant text-on-surface-variant rounded-full font-label-sm text-label-sm">
                      Personal
                    </span>
                    <span className="font-label-sm text-label-sm text-outline flex items-center gap-xs">
                      Due in 3 days
                    </span>
                  </div>
                  <h4 className="font-body-lg text-body-lg text-on-surface truncate">
                    Grocery Shopping
                  </h4>
                </div>
              </div>
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
          <section className="bg-surface-container-low rounded-[32px] p-xl shadow-sm flex flex-col gap-lg">
            <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary">done_all</span> Recently Completed
            </h2>
            <div className="flex flex-col gap-md" id="completed-tasks">
              {completedList.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-md opacity-60 hover:opacity-100 transition-opacity"
                >
                  <div className="w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
                      check
                    </span>
                  </div>
                  <div>
                    <h4 className="font-body-md text-body-md text-on-surface line-through">
                      {item.title}
                    </h4>
                    <p className="font-label-sm text-label-sm text-outline mt-0.5">{item.timeStr}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
