import React, { useState } from 'react';
import { ScreenType, TransitionType } from '../types';

interface OverdueTasksScreenProps {
  onNavigate: (screen: ScreenType, transition?: TransitionType) => void;
}

export const OverdueTasksScreen: React.FC<OverdueTasksScreenProps> = ({ onNavigate }) => {
  const [tasks, setTasks] = useState([
    {
      id: 'ov-1',
      title: 'Finalize Q3 Marketing Budget Proposal',
      description: 'Awaiting final numbers from the sales team before submission to the executive board.',
      overdueText: '3 days overdue',
      tag: 'Q3 Planning',
      hasAvatars: true,
      avatars: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC7pTJB7AWqceihF63ApYJgr5RLg7_ETyPMiYxDQU1q8YPlgMPDaqWpTqhEp2OUQz_ezFx6YcmpAuawwdP62piesmdwTbmrLkIVWV5sgSNFm5NWBKbCtfszxjNXdmO0NB5zTOpjf2DiwHkstD4MQWmnyC8frXP5kdEdc2oOZtlugvOPP0lQHQ-GRlG-Kw_dEpS02oJH-WEkKcxfBxEU0JVoVkef5RP11Hd2nPzJf5aeIC9Z_VCAzXBW',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBRDynD720utaKi4eom04s1gpo3dFrvpF7YFFwy2L41vtsqe-rBFvAVzQq6LBotz5QOWhThfO2ggG84T0CjfgeTZcS1NUbf3OVV09CNVjkVm1P8yJpfCIURXmn8fjr-KE5ZRE_lO08kWiJuIfSqGF3DPiYVDz0lq-zgir1wuTUm7FdOmw6L7rw8YtgARrPCeBsaAXycS4mm_DnNP2Fs3cqkGVZHL1jGWP70X_Ya4q1XTtl-_PVn5saQ',
      ],
      completed: false,
    },
    {
      id: 'ov-2',
      title: 'Update Component Library Documentation',
      description: 'Include new button variants and update the typography scale section.',
      overdueText: '2 days overdue',
      tag: 'Design System',
      hasInitials: true,
      initials: 'AS',
      completed: false,
    },
    {
      id: 'ov-3',
      title: 'Send Weekly Status Report',
      description: 'Summarize sprint velocity and blockers for executive leadership.',
      overdueText: 'Yesterday',
      tag: 'Client Alpha',
      hasRescheduleBtn: true,
      completed: false,
    },
    {
      id: 'ov-4',
      title: 'Audit User Permission Roles',
      description: 'Re-verify privileged access credentials across engineering staging environments.',
      overdueText: '4 days overdue',
      tag: 'Security',
      hasInitials: true,
      initials: 'JD',
      completed: false,
    },
    {
      id: 'ov-5',
      title: 'Sync Billing Subscriptions with Stripe',
      description: 'Reconcile failed webhooks and invoice notifications.',
      overdueText: '5 days overdue',
      tag: 'Finance',
      hasRescheduleBtn: true,
      completed: false,
    },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    showToast('Task updated successfully');
  };

  const handleClearOverdue = () => {
    setTasks([]);
    showToast('All overdue tasks cleared');
  };

  const handleRescheduleAll = () => {
    setTasks((prev) =>
      prev.map((t) => ({ ...t, overdueText: 'Rescheduled for Tomorrow' }))
    );
    showToast('All overdue tasks rescheduled for tomorrow');
  };

  const activeOverdueCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="flex flex-col w-full">
      {toastMessage && (
        <div className="fixed top-24 right-8 bg-surface-container-highest text-on-surface border border-outline-variant px-lg py-sm rounded-xl shadow-xl z-50 animate-bounce">
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
            You have <span className="font-bold text-error">{activeOverdueCount}</span> tasks that require immediate attention.
          </p>
        </div>
        <div className="flex items-center gap-sm">
          <button
            onClick={handleClearOverdue}
            className="px-lg py-md rounded-lg text-label-md font-label-md text-error hover:bg-error-container/50 transition-colors cursor-pointer"
          >
            Clear Overdue
          </button>
          <button
            onClick={handleRescheduleAll}
            className="px-lg py-md rounded-lg bg-error text-on-error text-label-md font-label-md shadow-lg shadow-error/20 hover:scale-105 active:scale-95 transition-transform flex items-center gap-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">event_repeat</span>
            Reschedule All
          </button>
        </div>
      </div>

      {/* Task List Section */}
      <div className="px-lg lg:px-2xl pb-2xl flex flex-col gap-md max-w-5xl">
        {tasks.length === 0 ? (
          <div className="bg-surface-container rounded-3xl p-3xl text-center flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[64px] mb-md">task_alt</span>
            <h3 className="font-headline-md text-on-surface mb-xs">No overdue tasks!</h3>
            <p className="font-body-md text-on-surface-variant mb-lg">
              You are completely caught up on your deadlines.
            </p>
            <button
              onClick={() => onNavigate('dashboard', 'push_back')}
              className="bg-primary text-on-primary px-lg py-sm rounded-xl font-label-md cursor-pointer"
            >
              Return to Dashboard
            </button>
          </div>
        ) : (
          tasks.map((task, idx) => (
            <div
              key={task.id}
              className={`relative group rounded-2xl p-lg flex flex-col sm:flex-row gap-lg items-start sm:items-center shadow-sm hover:shadow-md transition-shadow overflow-hidden ${
                idx === 0
                  ? 'bg-error-container/30'
                  : idx === 1
                  ? 'bg-error-container/20'
                  : 'bg-error-container/10'
              } ${task.completed ? 'opacity-50' : ''}`}
            >
              {/* Accent strip */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  idx === 0 ? 'bg-error' : idx === 1 ? 'bg-error/80' : 'bg-error/60'
                } rounded-l-2xl`}
              ></div>

              <button
                onClick={() => handleToggleComplete(task.id)}
                className={`w-6 h-6 rounded-md bg-surface border-2 flex items-center justify-center transition-colors mt-1 sm:mt-0 flex-shrink-0 cursor-pointer ${
                  task.completed ? 'bg-error border-error text-on-error' : 'border-outline-variant text-transparent hover:border-error'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-sm mb-xs">
                  <span className="px-sm py-0.5 rounded-full bg-error/10 text-error text-[10px] font-label-sm uppercase tracking-wider">
                    {task.overdueText}
                  </span>
                  <span className="text-label-sm font-label-sm text-outline">{task.tag}</span>
                </div>
                <h3
                  className={`text-body-lg font-body-lg text-on-surface font-semibold truncate ${
                    task.completed ? 'line-through text-outline' : ''
                  }`}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-body-md font-body-md text-on-surface-variant line-clamp-1 mt-xs">
                    {task.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-md sm:ml-auto w-full sm:w-auto mt-md sm:mt-0 pt-md sm:pt-0">
                {task.hasAvatars && task.avatars && (
                  <div className="flex -space-x-2">
                    <img
                      className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover"
                      alt="Team member"
                      src={task.avatars[0]}
                    />
                    <img
                      className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover"
                      alt="Team member"
                      src={task.avatars[1]}
                    />
                  </div>
                )}

                {task.hasInitials && (
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-primary-container text-on-primary-container flex items-center justify-center text-[12px] font-bold">
                      {task.initials}
                    </div>
                  </div>
                )}

                {task.hasRescheduleBtn && (
                  <button
                    onClick={() => {
                      setTasks((prev) =>
                        prev.map((t) =>
                          t.id === task.id ? { ...t, overdueText: 'Rescheduled for Friday' } : t
                        )
                      );
                      showToast('Task rescheduled to Friday');
                    }}
                    className="px-md py-sm rounded-lg bg-surface-container-high text-on-surface-variant text-label-sm font-label-sm hover:bg-surface-dim transition-colors cursor-pointer"
                  >
                    Reschedule
                  </button>
                )}

                <button className="p-sm rounded-lg text-outline hover:text-error hover:bg-error-container/50 transition-colors ml-auto sm:ml-0 cursor-pointer">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
