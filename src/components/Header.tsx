import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onOpenSettings?: () => void;
  onNavigateToOverdue?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onOpenSettings,
  onNavigateToOverdue,
}) => {
  const { searchQuery, setSearchQuery, overdueCount, tasks } = useTasks();
  const [notificationOpen, setNotificationOpen] = useState(false);

  const overdueTasks = tasks.filter(
    (t) =>
      !t.completed &&
      (t.status === 'overdue' ||
        t.dueDate.toLowerCase().includes('ago') ||
        t.dueDate.toLowerCase().includes('yesterday'))
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearch) {
      onSearch(val);
    }
  };

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-20 bg-surface/90 backdrop-blur-xl z-40 px-lg lg:px-2xl flex items-center justify-between border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex-1 max-w-[560px] relative group">
        <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
          search
        </span>
        <input
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-sm pl-xl pr-md text-body-md focus:ring-2 focus:ring-primary focus:bg-surface transition-all outline-none text-on-surface placeholder:text-outline"
          placeholder="Search tasks, projects, categories..."
          type="text"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              if (onSearch) onSearch('');
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface cursor-pointer p-1"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-lg ml-xl relative">
        <button
          onClick={() => setNotificationOpen(!notificationOpen)}
          className="p-sm rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer relative"
          title="Notifications"
        >
          <span className="material-symbols-outlined">notifications</span>
          {overdueCount > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-error text-on-error text-[10px] font-bold flex items-center justify-center ring-2 ring-surface">
              {overdueCount}
            </span>
          )}
        </button>

        {notificationOpen && (
          <div className="absolute right-0 top-14 w-80 bg-surface-container-lowest text-on-surface rounded-2xl shadow-2xl border border-outline-variant/40 p-md z-50 animate-fade-in">
            <div className="flex items-center justify-between pb-sm border-b border-outline-variant/20 mb-sm">
              <span className="font-label-md font-bold text-on-surface">Notifications</span>
              <span className="text-[11px] text-error font-medium">
                {overdueCount > 0 ? `${overdueCount} overdue item${overdueCount > 1 ? 's' : ''}` : 'All caught up'}
              </span>
            </div>
            <div className="flex flex-col gap-sm max-h-64 overflow-y-auto">
              {overdueTasks.length > 0 ? (
                overdueTasks.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setNotificationOpen(false);
                      if (onNavigateToOverdue) onNavigateToOverdue();
                    }}
                    className="p-sm rounded-xl bg-error-container/30 hover:bg-error-container/50 text-on-surface flex items-start gap-sm cursor-pointer transition-colors"
                  >
                    <span className="material-symbols-outlined text-error text-[18px] mt-0.5">warning</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-label-sm text-on-surface font-semibold text-xs truncate">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-on-surface-variant">{item.dueDate}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-sm text-center text-xs text-on-surface-variant">
                  No urgent notifications right now.
                </div>
              )}
            </div>
          </div>
        )}

        <div
          onClick={onOpenSettings}
          className="w-9 h-9 rounded-full bg-primary flex items-center justify-center cursor-pointer ring-2 ring-offset-2 ring-transparent hover:ring-primary transition-all text-on-primary text-[14px] font-bold shadow-sm"
          title="User Settings"
        >
          <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
        </div>
      </div>
    </header>
  );
};
