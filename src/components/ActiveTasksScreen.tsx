import React from 'react';
import { ScreenType, TransitionType } from '../types';
import { useTasks } from '../context/TaskContext';

interface ActiveTasksScreenProps {
  onNavigate: (screen: ScreenType, transition?: TransitionType) => void;
}

export const ActiveTasksScreen: React.FC<ActiveTasksScreenProps> = ({ onNavigate }) => {
  const { tasks, toggleComplete, activeCount, completionRate, completedCount } = useTasks();

  const activeTasks = tasks.filter((t) => !t.completed);
  const todayTasks = activeTasks.slice(0, 4);
  const upcomingTasks = activeTasks.slice(4);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
      case 'High':
        return {
          bar: 'bg-error',
          badge: 'bg-error-container/30 text-error',
        };
      case 'Medium':
        return {
          bar: 'bg-secondary',
          badge: 'bg-secondary-fixed/30 text-secondary',
        };
      case 'Low':
      default:
        return {
          bar: 'bg-primary',
          badge: 'bg-primary-container/30 text-primary',
        };
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="px-lg lg:px-2xl pb-2xl flex flex-col gap-2xl">
        {/* Hero / Header Section */}
        <section className="relative bg-surface-container rounded-[32px] overflow-hidden mt-lg shadow-sm">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-colors-primary),_transparent_50%)] pointer-events-none"></div>
          <div className="relative p-xl lg:p-2xl flex flex-col lg:flex-row justify-between items-start lg:items-end gap-xl">
            <div className="flex flex-col gap-md">
              <div className="inline-flex items-center gap-sm bg-primary-container/20 text-on-surface px-md py-sm rounded-full w-fit">
                <span className="material-symbols-outlined text-[16px] text-primary">play_circle</span>
                <span className="font-label-md text-label-md text-primary">Active Sprint</span>
              </div>
              <div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface mb-xs">In Progress</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                  Focus on what matters now. You have {activeCount} active tasks in your queue.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-xl bg-surface p-md rounded-2xl shadow-sm self-stretch lg:self-auto min-w-[280px]">
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container-highest"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-primary transition-all duration-700 ease-out"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={`${completionRate}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-label-md text-label-md text-on-surface font-bold">
                  {completionRate}%
                </div>
              </div>
              <div className="flex flex-col gap-xs">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">
                  Sprint Goal
                </span>
                <span className="font-body-md text-body-md text-on-surface font-medium">
                  {completedCount}/{tasks.length} Tasks Completed
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Tasks for Today */}
        <section className="flex flex-col gap-xl">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-sm">
              <span className="material-symbols-outlined text-tertiary">wb_sunny</span>
              Today's Focus
            </h2>
            <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container-high px-md py-sm rounded-lg">
              {todayTasks.length} Tasks
            </span>
          </div>

          {todayTasks.length === 0 ? (
            <div className="bg-surface rounded-2xl p-xl text-center flex flex-col items-center gap-2 border border-outline-variant/20">
              <span className="material-symbols-outlined text-primary text-[48px]">task_alt</span>
              <p className="font-headline-md text-on-surface font-medium">No tasks in today's focus queue</p>
              <p className="font-body-md text-on-surface-variant text-sm">All set! You can explore upcoming tasks or create new ones.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              {todayTasks.map((task) => {
                const { bar, badge } = getPriorityColor(task.priority);
                return (
                  <article
                    key={task.id}
                    className="group bg-surface hover:bg-surface-container-lowest rounded-[24px] p-lg shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[220px] border border-outline-variant/20"
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${bar}`}></div>
                    <div className="flex justify-between items-start mb-md">
                      <div className="flex items-center gap-sm">
                        <span className={`inline-flex items-center px-sm py-xs rounded-full font-label-sm text-xs font-semibold ${badge}`}>
                          {task.priority} Priority
                        </span>
                        <span className="font-label-sm text-xs text-outline">{task.category}</span>
                      </div>
                      <span className="text-xs font-label-md text-outline font-semibold">
                        Score: {task.score}
                      </span>
                    </div>

                    <div className="mb-xl flex-1">
                      <h3 className="font-headline-md text-lg font-semibold mb-sm text-on-surface group-hover:text-primary transition-colors">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="font-body-md text-sm text-on-surface-variant line-clamp-2">
                          {task.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-outline-variant/10">
                      <div className="flex items-center gap-md">
                        <button
                          onClick={() => toggleComplete(task.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface-variant"
                          title="Mark Complete"
                        >
                          <span className="material-symbols-outlined text-[20px]">check</span>
                        </button>
                        {task.avatars && (
                          <div className="flex -space-x-2">
                            {task.avatars.map((av, i) => (
                              <div
                                key={i}
                                className="w-7 h-7 rounded-full bg-primary text-on-primary font-bold text-[10px] flex items-center justify-center border-2 border-surface shadow-sm"
                              >
                                {av}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-sm text-on-surface-variant font-label-md text-xs">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Later this Week / Remaining Sprint Tasks */}
        <section className="flex flex-col gap-xl mt-xl">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-sm">
              <span className="material-symbols-outlined text-secondary">calendar_month</span>
              Later This Sprint
            </h2>
            <button
              onClick={() => onNavigate('all-tasks', 'push')}
              className="font-label-md text-label-md text-primary hover:text-primary-fixed-variant transition-colors flex items-center gap-xs cursor-pointer"
            >
              View All Tasks <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          <div className="flex flex-col gap-sm">
            {upcomingTasks.length === 0 ? (
              <p className="text-sm text-on-surface-variant italic p-4 bg-surface rounded-xl border border-outline-variant/20">
                No additional tasks scheduled for later this sprint.
              </p>
            ) : (
              upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-surface hover:bg-surface-container-lowest rounded-xl p-md shadow-sm hover:shadow-md transition-all flex items-center gap-md group border border-outline-variant/20"
                >
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className="w-6 h-6 rounded border-2 border-outline-variant group-hover:border-primary flex items-center justify-center transition-all cursor-pointer hover:bg-primary hover:text-on-primary text-transparent"
                    title="Mark Complete"
                  >
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </button>

                  <div className="w-1.5 h-10 rounded-full bg-secondary"></div>

                  <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center justify-between gap-md">
                    <div>
                      <h4 className="font-body-lg text-body-lg text-on-surface truncate font-medium">
                        {task.title}
                      </h4>
                      <p className="font-label-sm text-xs text-on-surface-variant">
                        {task.category} • {task.dueDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-lg">
                      <span className="text-xs font-label-md bg-surface-container px-2 py-1 rounded-md text-on-surface-variant">
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
