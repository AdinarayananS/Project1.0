import React, { useState } from 'react';
import { ScreenType } from '../types';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onOpenSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onOpenSettings }) => {
  const [query, setQuery] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-20 bg-surface/80 backdrop-blur-xl z-40 px-lg lg:px-2xl flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex-1 max-w-xl relative group">
        <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
          search
        </span>
        <input
          value={query}
          onChange={handleInputChange}
          className="w-full bg-surface-container-low border-none rounded-xl py-sm pl-xl pr-md text-body-md focus:ring-2 focus:ring-primary focus:bg-surface transition-all outline-none text-on-surface"
          placeholder="Search tasks, projects..."
          type="text"
        />
      </div>

      <div className="flex items-center gap-lg ml-xl relative">
        <button
          onClick={() => setNotificationOpen(!notificationOpen)}
          className="p-sm rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer relative"
          title="Notifications"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-surface"></span>
        </button>

        {notificationOpen && (
          <div className="absolute right-12 top-12 w-80 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 p-md z-50 animate-fade-in">
            <div className="flex items-center justify-between pb-sm border-b border-outline-variant/20 mb-sm">
              <span className="font-label-md font-bold text-on-surface">Notifications</span>
              <span className="text-[11px] text-error font-medium">1 overdue item</span>
            </div>
            <div className="flex flex-col gap-sm">
              <div className="p-sm rounded-xl bg-error-container/30 text-on-surface flex items-start gap-sm">
                <span className="material-symbols-outlined text-error text-[18px] mt-0.5">warning</span>
                <div>
                  <p className="font-label-sm text-on-surface font-semibold">Q3 Budget Proposal Overdue</p>
                  <p className="text-[12px] text-on-surface-variant">Awaiting executive numbers</p>
                </div>
              </div>
              <div className="p-sm rounded-xl bg-surface-container text-on-surface flex items-start gap-sm">
                <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">schedule</span>
                <div>
                  <p className="font-label-sm text-on-surface font-semibold">Hotfix Push in 1 hour</p>
                  <p className="text-[12px] text-on-surface-variant">Mobile checkout styling</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          onClick={onOpenSettings}
          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer ring-2 ring-offset-2 ring-transparent hover:ring-primary transition-all text-on-primary text-[14px] font-bold"
          title="Jane Doe - Settings"
        >
          <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
        </div>
      </div>
    </header>
  );
};
