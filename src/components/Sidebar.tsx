import React from 'react';
import { ScreenType, TransitionType } from '../types';

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
    if (currentScreen === 'dashboard') {
      onNavigate('all-tasks', 'slide_up');
    } else if (onOpenNewTaskModal) {
      onOpenNewTaskModal();
    } else {
      onNavigate('all-tasks', 'slide_up');
    }
  };

  const getNavItemClass = (screen: ScreenType) => {
    const isActive = currentScreen === screen;
    if (isActive) {
      return 'flex items-center gap-md px-md py-sm rounded-lg transition-all bg-primary-container text-on-primary-container font-medium';
    }
    return 'flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all';
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low hidden lg:flex flex-col z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="p-lg flex items-center gap-md mb-xl">
        <img
          alt="Focus App Logo"
          className="h-8 w-auto object-contain"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQqYpSOHPZIPx_cplyVzYp3GFxYpd9-cCetq_ubp0KmnVt4I1JmDRhXZnPnBefEWlUAmC5wUX0iY0SqkCBWzWV7vEB4BSxKlbRLi8jQ56i6L_EgiauuZFANXp1FCx4BNKu3ATyc6pF2ZAzVVldkv1e9CrU0iC0hlBgGNIr_lRObLPJ7sOaPdP_9OSffpb20psi7djaH_uXavK3tD3DkY3piV690BjVVQEn3iygPYznNXqUfn17j6uy"
        />
        <span className="text-headline-md font-headline-md text-primary">Focus</span>
      </div>

      <nav className="flex-1 px-md space-y-xs" data-active-classes="bg-primary-container text-on-primary-container font-medium">
        <a
          href="#dashboard"
          data-path="dashboard"
          aria-current={currentScreen === 'dashboard' ? 'page' : undefined}
          className={getNavItemClass('dashboard')}
          onClick={(e) => handleNavClick(e, 'dashboard')}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-md text-label-md">Dashboard</span>
        </a>

        <div className="py-sm px-md text-label-sm font-label-sm text-outline uppercase tracking-widest mt-md">
          Tasks
        </div>

        <a
          href="#all-tasks"
          data-path="all-tasks"
          aria-current={currentScreen === 'all-tasks' ? 'page' : undefined}
          className={getNavItemClass('all-tasks')}
          onClick={(e) => handleNavClick(e, 'all-tasks')}
        >
          <span className="material-symbols-outlined">checklist</span>
          <span className="font-label-md text-label-md">All Tasks</span>
        </a>

        <a
          href="#active-tasks"
          data-path="active-tasks"
          aria-current={currentScreen === 'active-tasks' ? 'page' : undefined}
          className={getNavItemClass('active-tasks')}
          onClick={(e) => handleNavClick(e, 'active-tasks')}
        >
          <span className="material-symbols-outlined">pending_actions</span>
          <span className="font-label-md text-label-md">Active</span>
        </a>

        <a
          href="#completed-tasks"
          data-path="completed-tasks"
          className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('all-tasks', 'push');
          }}
        >
          <span className="material-symbols-outlined">task_alt</span>
          <span className="font-label-md text-label-md">Completed</span>
        </a>

        <a
          href="#overdue-tasks"
          data-path="overdue-tasks"
          aria-current={currentScreen === 'overdue-tasks' ? 'page' : undefined}
          className={getNavItemClass('overdue-tasks')}
          onClick={(e) => handleNavClick(e, 'overdue-tasks')}
        >
          <span className="material-symbols-outlined">event_busy</span>
          <span className="font-label-md text-label-md">Overdue</span>
        </a>

        <div className="mt-xl">
          <a
            href="#calendar"
            data-path="calendar"
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('active-tasks', 'push');
            }}
          >
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="font-label-md text-label-md">Calendar</span>
          </a>

          <a
            href="#settings"
            data-path="settings"
            aria-current={currentScreen === 'settings' ? 'page' : undefined}
            className={getNavItemClass('settings')}
            onClick={(e) => handleNavClick(e, 'settings')}
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-md text-label-md">Settings</span>
          </a>
        </div>
      </nav>

      <div className="p-lg">
        <button
          onClick={handleAddNewTask}
          className="w-full flex items-center justify-center gap-sm bg-primary text-on-primary py-md rounded-xl font-label-md shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined">add</span>
          Add New Task
        </button>
      </div>
    </aside>
  );
};
