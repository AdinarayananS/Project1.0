import React from 'react';
import { ScreenType, TransitionType } from '../types';
import { useTasks } from '../context/TaskContext';

interface SidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType, transition?: TransitionType) => void;
  onOpenNewTaskModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  onOpenNewTaskModal,
}) => {
  const { activeCount, overdueCount, completedCount } = useTasks();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: ScreenType) => {
    e.preventDefault();
    if (target === currentScreen) return;

    // Determine transition according to spec
    let transition: TransitionType = 'push';
    if (target === 'dashboard') {
      transition = 'push_back';
    }
    onNavigate(target, transition);
  };

  const handleAddNewTask = () => {
    if (onOpenNewTaskModal) {
      onOpenNewTaskModal();
    } else {
      onNavigate('all-tasks', 'slide_up');
    }
  };

  const getNavItemClass = (screen: ScreenType) => {
    const isActive = currentScreen === screen;
    if (isActive) {
      return 'flex items-center justify-between px-md py-sm rounded-xl transition-all bg-primary-container text-on-primary-container font-semibold shadow-sm';
    }
    return 'flex items-center justify-between px-md py-sm rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all';
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low hidden lg:flex flex-col z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)] border-r border-outline-variant/20">
      <div className="p-lg flex items-center gap-md mb-xl">
        <img
          alt="Focus App Logo"
          className="h-8 w-auto object-contain"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQqYpSOHPZIPx_cplyVzYp3GFxYpd9-cCetq_ubp0KmnVt4I1JmDRhXZnPnBefEWlUAmC5wUX0iY0SqkCBWzWV7vEB4BSxKlbRLi8jQ56i6L_EgiauuZFANXp1FCx4BNKu3ATyc6pF2ZAzVVldkv1e9CrU0iC0hlBgGNIr_lRObLPJ7sOaPdP_9OSffpb20psi7djaH_uXavK3tD3DkY3piV690BjVVQEn3iygPYznNXqUfn17j6uy"
        />
        <span className="text-headline-md font-headline-md text-primary font-bold">Focus</span>
      </div>

      <nav className="flex-1 px-md space-y-xs" data-active-classes="bg-primary-container text-on-primary-container font-medium">
        <a
          href="#dashboard"
          data-path="dashboard"
          aria-current={currentScreen === 'dashboard' ? 'page' : undefined}
          className={getNavItemClass('dashboard')}
          onClick={(e) => handleNavClick(e, 'dashboard')}
        >
          <div className="flex items-center gap-md">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            <span className="font-label-md text-sm">Dashboard</span>
          </div>
        </a>

        <div className="py-sm px-md text-[11px] font-label-sm text-outline uppercase tracking-widest mt-md font-semibold">
          Tasks
        </div>

        <a
          href="#all-tasks"
          data-path="all-tasks"
          aria-current={currentScreen === 'all-tasks' ? 'page' : undefined}
          className={getNavItemClass('all-tasks')}
          onClick={(e) => handleNavClick(e, 'all-tasks')}
        >
          <div className="flex items-center gap-md">
            <span className="material-symbols-outlined text-[20px]">checklist</span>
            <span className="font-label-md text-sm">All Tasks</span>
          </div>
        </a>

        <a
          href="#active-tasks"
          data-path="active-tasks"
          aria-current={currentScreen === 'active-tasks' ? 'page' : undefined}
          className={getNavItemClass('active-tasks')}
          onClick={(e) => handleNavClick(e, 'active-tasks')}
        >
          <div className="flex items-center gap-md">
            <span className="material-symbols-outlined text-[20px]">pending_actions</span>
            <span className="font-label-md text-sm">Active</span>
          </div>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-surface-container-highest text-on-surface">
              {activeCount}
            </span>
          )}
        </a>

        <a
          href="#completed-tasks"
          data-path="completed-tasks"
          className="flex items-center justify-between px-md py-sm rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('all-tasks', 'push');
          }}
        >
          <div className="flex items-center gap-md">
            <span className="material-symbols-outlined text-[20px]">task_alt</span>
            <span className="font-label-md text-sm">Completed</span>
          </div>
          {completedCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium text-outline">
              {completedCount}
            </span>
          )}
        </a>

        <a
          href="#overdue-tasks"
          data-path="overdue-tasks"
          aria-current={currentScreen === 'overdue-tasks' ? 'page' : undefined}
          className={getNavItemClass('overdue-tasks')}
          onClick={(e) => handleNavClick(e, 'overdue-tasks')}
        >
          <div className="flex items-center gap-md">
            <span className="material-symbols-outlined text-[20px] text-error">event_busy</span>
            <span className="font-label-md text-sm">Overdue</span>
          </div>
          {overdueCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-error text-on-error">
              {overdueCount}
            </span>
          )}
        </a>

        <div className="mt-xl pt-md border-t border-outline-variant/20">
          <a
            href="#settings"
            data-path="settings"
            aria-current={currentScreen === 'settings' ? 'page' : undefined}
            className={getNavItemClass('settings')}
            onClick={(e) => handleNavClick(e, 'settings')}
          >
            <div className="flex items-center gap-md">
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span className="font-label-md text-sm">Settings</span>
            </div>
          </a>
        </div>
      </nav>

      <div className="p-lg">
        <button
          onClick={handleAddNewTask}
          className="w-full flex items-center justify-center gap-sm bg-primary text-on-primary py-md rounded-xl font-label-md shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-[0.98] transition-all cursor-pointer font-semibold"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add New Task
        </button>
      </div>
    </aside>
  );
};
