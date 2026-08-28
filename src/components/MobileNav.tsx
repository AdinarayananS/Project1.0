import React from 'react';
import { ScreenType, TransitionType } from '../types';

interface MobileNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType, transition?: TransitionType) => void;
  onOpenNewTaskModal?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentScreen,
  onNavigate,
  onOpenNewTaskModal,
}) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: ScreenType) => {
    e.preventDefault();
    if (target === currentScreen) return;
    const transition: TransitionType = target === 'dashboard' ? 'push_back' : 'push';
    onNavigate(target, transition);
  };

  const getLinkClass = (screen: ScreenType) => {
    const isActive = currentScreen === screen;
    return `flex flex-col items-center gap-xs ${isActive ? 'text-primary' : 'text-on-surface-variant'}`;
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 h-16 bg-surface-container-highest border-t border-outline-variant flex lg:hidden items-center justify-around z-50"
      data-active-classes="text-primary"
    >
      <a
        href="#dashboard"
        data-path="dashboard"
        aria-current={currentScreen === 'dashboard' ? 'page' : undefined}
        className={getLinkClass('dashboard')}
        onClick={(e) => handleNavClick(e, 'dashboard')}
      >
        <span className="material-symbols-outlined">dashboard</span>
        <span className="text-[10px] font-label-sm">Home</span>
      </a>

      <a
        href="#all-tasks"
        data-path="all-tasks"
        aria-current={currentScreen === 'all-tasks' ? 'page' : undefined}
        className={getLinkClass('all-tasks')}
        onClick={(e) => handleNavClick(e, 'all-tasks')}
      >
        <span className="material-symbols-outlined">checklist</span>
        <span className="text-[10px] font-label-sm">Tasks</span>
      </a>

      <div className="-mt-10">
        <button
          onClick={() => {
            if (onOpenNewTaskModal) onOpenNewTaskModal();
            else onNavigate('all-tasks', 'slide_up');
          }}
          className="w-12 h-12 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>

      <a
        href="#active-tasks"
        data-path="active-tasks"
        aria-current={currentScreen === 'active-tasks' ? 'page' : undefined}
        className={getLinkClass('active-tasks')}
        onClick={(e) => handleNavClick(e, 'active-tasks')}
      >
        <span className="material-symbols-outlined">pending_actions</span>
        <span className="text-[10px] font-label-sm">Active</span>
      </a>

      <a
        href="#settings"
        data-path="settings"
        aria-current={currentScreen === 'settings' ? 'page' : undefined}
        className={getLinkClass('settings')}
        onClick={(e) => handleNavClick(e, 'settings')}
      >
        <span className="material-symbols-outlined">settings</span>
        <span className="text-[10px] font-label-sm">Settings</span>
      </a>
    </nav>
  );
};
