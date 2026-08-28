import React, { useState } from 'react';
import { ScreenType, TransitionType } from '../types';
import { useTasks, Task } from '../context/TaskContext';
import { EditTaskModal } from './EditTaskModal';

interface OverdueTasksScreenProps {
  onNavigate: (screen: ScreenType, transition?: TransitionType) => void;
}

export const OverdueTasksScreen: React.FC<OverdueTasksScreenProps> = ({ onNavigate }) => {
  const {
    tasks,
    toggleComplete,
    rescheduleTask,
    rescheduleAllOverdue,
    clearOverdueTasks,
    deleteTask,
    updateTask,
  } = useTasks();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Find overdue tasks
  const overdueTasks = tasks.filter(
    (t) =>
      !t.completed &&
      (t.status === 'overdue' ||
        t.dueDate.toLowerCase().includes('ago') ||
        t.dueDate.toLowerCase().includes('yesterday'))
  );

  const handleToggleComplete = (id: string) => {
    toggleComplete(id);
    showToast('Task updated successfully');
  };

  const handleClearOverdue = () => {
    clearOverdueTasks();
    showToast('All overdue tasks cleared');
  };

  const handleRescheduleAll = () => {
    rescheduleAllOverdue();
    showToast('All overdue tasks rescheduled for tomorrow');
  };

  return (
    <div className="flex flex-col w-full">
      {toastMessage && (
        <div className="fixed top-20 right-6 bg-surface-container-highest text-on-surface border border-outline-variant px-lg py-sm rounded-xl shadow-xl z-50 animate-bounce text-sm font-medium">
          {toastMessage}
        </div>
      )}

      {/* Header Section */}
      <div className="px-lg lg:px-2xl py-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div>
          <h1 className="text-headline-xl font-headline-xl text-error flex items-center gap-sm">
            <span className="material-symbols-outlined text-[40px]">warning</span>
            Overdue Tasks
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant mt-sm">
            You have <span className="font-bold text-error">{overdueTasks.length}</span> task{overdueTasks.length === 1 ? '' : 's'} that require immediate attention.
          </p>
        </div>
        <div className="flex items-center gap-sm flex-wrap">
          {overdueTasks.length > 0 && (
            <>
              <button
                onClick={handleClearOverdue}
                className="px-lg py-md rounded-xl text-label-md font-label-md text-error hover:bg-error-container/50 transition-colors cursor-pointer border border-error/20"
              >
                Clear Overdue
              </button>
              <button
                onClick={handleRescheduleAll}
                className="px-lg py-md rounded-xl bg-error text-on-error text-label-md font-label-md shadow-lg shadow-error/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">event_repeat</span>
                Reschedule All
              </button>
            </>
          )}
        </div>
      </div>

      {/* Task List Section */}
      <div className="px-lg lg:px-2xl pb-2xl flex flex-col gap-md max-w-5xl">
        {overdueTasks.length === 0 ? (
          <div className="bg-surface-container rounded-3xl p-3xl text-center flex flex-col items-center justify-center border border-outline-variant/20">
            <span className="material-symbols-outlined text-primary text-[64px] mb-md">task_alt</span>
            <h3 className="font-headline-md text-on-surface mb-xs font-semibold">No overdue tasks!</h3>
            <p className="font-body-md text-on-surface-variant mb-lg text-sm">
              You are completely caught up on your deadlines.
            </p>
            <button
              onClick={() => onNavigate('dashboard', 'push_back')}
              className="bg-primary text-on-primary px-lg py-sm rounded-xl font-label-md cursor-pointer hover:bg-primary/90 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        ) : (
          overdueTasks.map((task, idx) => (
            <div
              key={task.id}
              className={`relative group rounded-2xl p-lg flex flex-col sm:flex-row gap-lg items-start sm:items-center shadow-sm hover:shadow-md transition-all overflow-hidden border border-error/20 ${
                idx === 0
                  ? 'bg-error-container/30'
                  : idx === 1
                  ? 'bg-error-container/20'
                  : 'bg-error-container/10'
              }`}
            >
              {/* Accent strip */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-error rounded-l-2xl"></div>

              <button
                onClick={() => handleToggleComplete(task.id)}
                className="w-6 h-6 rounded-md bg-surface border-2 border-outline-variant text-transparent hover:border-error flex items-center justify-center transition-colors mt-1 sm:mt-0 flex-shrink-0 cursor-pointer"
                title="Mark Completed"
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-sm mb-xs">
                  <span className="px-sm py-0.5 rounded-full bg-error/10 text-error text-[10px] font-label-sm uppercase tracking-wider font-semibold">
                    {task.dueDate}
                  </span>
                  <span className="text-label-sm font-label-sm text-outline">{task.category}</span>
                  <span className="text-xs text-error font-medium">Priority Score: {task.score}</span>
                </div>
                <h3 className="text-body-lg font-body-lg text-on-surface font-semibold truncate">
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-body-md text-on-surface-variant line-clamp-1 mt-xs text-xs">
                    {task.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-md sm:ml-auto w-full sm:w-auto mt-md sm:mt-0 pt-md sm:pt-0">
                {task.avatars && (
                  <div className="flex -space-x-2">
                    {task.avatars.map((av, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full bg-error text-on-error flex items-center justify-center text-[10px] font-bold ring-2 ring-surface shadow-sm"
                      >
                        {av}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => {
                    rescheduleTask(task.id, 'Tomorrow, 5:00 PM');
                    showToast('Task rescheduled to Tomorrow 5:00 PM');
                  }}
                  className="px-md py-sm rounded-xl bg-surface-container-high text-on-surface-variant text-label-sm font-label-sm hover:bg-surface-container-highest transition-colors cursor-pointer text-xs font-semibold whitespace-nowrap"
                >
                  Reschedule
                </button>

                <button
                  onClick={() => setEditingTask(task)}
                  className="p-sm rounded-lg text-outline hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                  title="Edit task"
                >
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-sm rounded-lg text-outline hover:text-error hover:bg-error-container/50 transition-colors cursor-pointer"
                  title="Delete task"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
          ))
        )}
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
