import React, { useState, useMemo } from 'react';
import { ScreenType, TransitionType } from '../types';
import { useTasks, Task } from '../context/TaskContext';
import { EditTaskModal } from './EditTaskModal';

interface AllTasksScreenProps {
  onNavigate: (screen: ScreenType, transition?: TransitionType) => void;
  onOpenNewTaskModal?: () => void;
}

export const AllTasksScreen: React.FC<AllTasksScreenProps> = ({
  onNavigate,
  onOpenNewTaskModal,
}) => {
  const {
    tasks,
    toggleComplete,
    deleteTask,
    updateTask,
    addTask,
    searchQuery,
    setSearchQuery,
  } = useTasks();

  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [sortBy, setSortBy] = useState<'dynamic' | 'deadline' | 'created' | 'title'>('dynamic');
  const [currentFilter, setCurrentFilter] = useState<'all' | 'active' | 'completed' | 'overdue'>('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleFilterClick = (filterType: 'all' | 'active' | 'completed' | 'overdue') => {
    setCurrentFilter(filterType);
  };

  const getPriorityColors = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return {
          border: 'border-error',
          badge: 'bg-error/10 text-error',
          scoreColor: 'text-error',
        };
      case 'High':
        return {
          border: 'border-tertiary',
          badge: 'bg-tertiary/10 text-tertiary',
          scoreColor: 'text-tertiary',
        };
      case 'Medium':
        return {
          border: 'border-secondary',
          badge: 'bg-secondary/10 text-secondary',
          scoreColor: 'text-secondary',
        };
      case 'Low':
      default:
        return {
          border: 'border-primary',
          badge: 'bg-primary/10 text-primary',
          scoreColor: 'text-primary',
        };
    }
  };

  const filteredTasks = useMemo(() => {
    let result = tasks.filter((task) => {
      // Category filter
      if (selectedCategory && task.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Priority filter
      if (selectedPriority && task.priority.toLowerCase() !== selectedPriority.toLowerCase()) {
        return false;
      }
      // Search term
      const query = (localSearch || searchQuery).toLowerCase().trim();
      if (
        query &&
        !task.title.toLowerCase().includes(query) &&
        !task.description.toLowerCase().includes(query) &&
        !task.category.toLowerCase().includes(query)
      ) {
        return false;
      }
      // Status filter
      if (currentFilter === 'completed') {
        if (!task.completed) return false;
      } else if (currentFilter === 'active') {
        if (task.completed) return false;
      } else if (currentFilter === 'overdue') {
        if (task.completed || (!task.dueDate.toLowerCase().includes('ago') && !task.dueDate.toLowerCase().includes('yesterday') && task.status !== 'overdue')) {
          return false;
        }
      }
      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'dynamic') {
        return (b.score || 0) - (a.score || 0);
      }
      if (sortBy === 'created') {
        return (b.createdAt || 0) - (a.createdAt || 0);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'deadline') {
        return a.dueDate.localeCompare(b.dueDate);
      }
      return 0;
    });

    return result;
  }, [tasks, selectedCategory, selectedPriority, localSearch, searchQuery, currentFilter, sortBy]);

  return (
    <div className="flex flex-col w-full h-full relative" id="allTasksContainer">
      {/* Header Section */}
      <div className="px-lg lg:px-xl pt-lg pb-md flex flex-col md:flex-row md:items-end justify-between gap-lg sticky top-0 bg-background/90 backdrop-blur-xl z-20 border-b border-outline-variant/20">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-background mb-xs">All Tasks</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Manage, filter, and prioritize your complete task inventory.
          </p>
        </div>
        <div className="flex items-center gap-md">
          <button
            onClick={() => {
              if (onOpenNewTaskModal) onOpenNewTaskModal();
              else {
                const title = prompt('Enter task title:');
                if (title) {
                  addTask({
                    title,
                    description: '',
                    category: 'Work',
                    priority: 'Medium',
                    dueDate: 'Today, 5:00 PM',
                  });
                }
              }
            }}
            className="bg-primary hover:bg-primary/90 text-on-primary font-label-md text-label-md px-lg py-sm rounded-xl transition-all shadow-md shadow-primary/20 flex items-center gap-sm whitespace-nowrap group cursor-pointer active:scale-98"
            id="btnNewTask"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:rotate-90 transition-transform duration-300">
              add
            </span>
            New Task
          </button>
        </div>
      </div>

      {/* Controls Section: Search & Filters */}
      <div className="px-lg lg:px-xl py-md flex flex-col gap-md border-b border-outline-variant/20 bg-surface/40">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-md">
          {/* Search */}
          <div className="flex-1 relative group">
            <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors z-10">
              search
            </span>
            <input
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                setSearchQuery(e.target.value);
              }}
              className="w-full bg-surface-container-low text-on-surface placeholder:text-outline pl-xl pr-md py-2.5 rounded-xl outline-none focus:bg-surface focus:ring-2 focus:ring-primary/50 transition-all font-body-md border border-outline-variant/30"
              id="taskSearch"
              placeholder="Search tasks by name or keyword..."
              type="text"
            />
            {localSearch && (
              <button
                onClick={() => {
                  setLocalSearch('');
                  setSearchQuery('');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface cursor-pointer p-1"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Quick Filters (Pills) */}
          <div className="flex overflow-x-auto pb-1 md:pb-0 hide-scrollbar gap-sm snap-x">
            <button
              onClick={() => handleFilterClick('all')}
              className={`filter-btn snap-start px-md py-1.5 rounded-full font-label-sm text-xs whitespace-nowrap transition-all shadow-sm cursor-pointer ${
                currentFilter === 'all'
                  ? 'bg-primary text-on-primary font-semibold'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              }`}
            >
              All ({tasks.length})
            </button>

            <button
              onClick={() => handleFilterClick('active')}
              className={`filter-btn snap-start px-md py-1.5 rounded-full font-label-sm text-xs whitespace-nowrap transition-all shadow-sm cursor-pointer ${
                currentFilter === 'active'
                  ? 'bg-primary text-on-primary font-semibold'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              }`}
            >
              Active ({tasks.filter((t) => !t.completed).length})
            </button>

            <button
              onClick={() => handleFilterClick('overdue')}
              className={`filter-btn snap-start px-md py-1.5 rounded-full font-label-sm text-xs whitespace-nowrap transition-all shadow-sm cursor-pointer ${
                currentFilter === 'overdue'
                  ? 'bg-error text-on-error font-semibold'
                  : 'bg-surface-container hover:bg-error/10 hover:text-error text-on-surface'
              }`}
            >
              Overdue ({tasks.filter((t) => !t.completed && (t.status === 'overdue' || t.dueDate.toLowerCase().includes('ago'))).length})
            </button>

            <button
              onClick={() => handleFilterClick('completed')}
              className={`filter-btn snap-start px-md py-1.5 rounded-full font-label-sm text-xs whitespace-nowrap transition-all shadow-sm cursor-pointer ${
                currentFilter === 'completed'
                  ? 'bg-primary text-on-primary font-semibold'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              }`}
            >
              Completed ({tasks.filter((t) => t.completed).length})
            </button>
          </div>
        </div>

        {/* Advanced Filters & Sort */}
        <div className="flex flex-wrap items-center gap-md justify-between bg-surface-container-lowest p-sm rounded-xl shadow-sm border border-outline-variant/30">
          <div className="flex flex-wrap items-center gap-md">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-surface-container-low text-on-surface font-label-md text-xs pl-md pr-8 py-1.5 rounded-lg outline-none cursor-pointer hover:bg-surface-container-high transition-colors border border-outline-variant/20"
              >
                <option value="">Category: All</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Health">Health</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[18px]">
                expand_more
              </span>
            </div>

            <div className="relative">
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="appearance-none bg-surface-container-low text-on-surface font-label-md text-xs pl-md pr-8 py-1.5 rounded-lg outline-none cursor-pointer hover:bg-surface-container-high transition-colors border border-outline-variant/20"
              >
                <option value="">Priority: All</option>
                <option value="Critical">Critical Priority</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[18px]">
                expand_more
              </span>
            </div>

            {(selectedCategory || selectedPriority || localSearch) && (
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedPriority('');
                  setLocalSearch('');
                  setSearchQuery('');
                  setCurrentFilter('all');
                }}
                className="text-xs text-primary hover:underline cursor-pointer flex items-center gap-1 font-medium"
              >
                <span className="material-symbols-outlined text-[14px]">restart_alt</span> Reset Filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-sm">
            <span className="font-label-sm text-xs text-outline uppercase tracking-wider">
              Sort by:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-transparent text-primary font-label-md text-xs pl-sm pr-7 py-1 outline-none cursor-pointer hover:text-primary/80 transition-colors font-semibold"
              >
                <option value="dynamic">Priority Score (Dynamic)</option>
                <option value="deadline">Closest Deadline</option>
                <option value="created">Newly Created</option>
                <option value="title">Alphabetical (A-Z)</option>
              </select>
              <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-primary text-[18px]">
                sort
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Task List Area */}
      <div className="px-lg lg:px-xl py-lg flex-1 overflow-y-auto">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-3xl text-center" id="emptyState">
            <div className="w-24 h-24 mb-md opacity-40 relative flex items-center justify-center">
              <span className="material-symbols-outlined text-[64px] text-primary">
                search_off
              </span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-sm">No tasks found</h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md text-sm mb-md">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('');
                setSelectedPriority('');
                setLocalSearch('');
                setSearchQuery('');
                setCurrentFilter('all');
              }}
              className="px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest rounded-xl text-on-surface font-label-md text-xs cursor-pointer transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-md" id="taskGrid">
            {filteredTasks.map((task) => {
              const { border, badge, scoreColor } = getPriorityColors(task.priority);
              const isOverdue =
                !task.completed &&
                (task.status === 'overdue' ||
                  task.dueDate.toLowerCase().includes('ago') ||
                  task.dueDate.toLowerCase().includes('yesterday'));

              return (
                <div
                  key={task.id}
                  data-category={task.category.toLowerCase()}
                  data-status={task.status}
                  className={`task-card rounded-2xl p-md shadow-sm hover:shadow-md transition-all relative overflow-hidden group border-l-4 ${
                    isOverdue ? 'border-error' : border
                  } border-t border-r border-b border-outline-variant/20 ${
                    task.completed
                      ? 'bg-surface-container-low opacity-60 hover:opacity-90'
                      : 'bg-surface-container-lowest hover:bg-surface-container-low/50'
                  }`}
                >
                  <div className="flex items-start gap-md">
                    {/* Complete checkbox */}
                    <button
                      onClick={() => toggleComplete(task.id)}
                      className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors mt-1 cursor-pointer flex-shrink-0 ${
                        task.completed
                          ? 'bg-primary border-2 border-primary text-on-primary'
                          : 'border-2 border-outline-variant hover:border-primary group-hover:bg-primary/5'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[16px] ${
                          task.completed
                            ? 'text-on-primary opacity-100'
                            : 'text-transparent opacity-0 transition-opacity'
                        }`}
                      >
                        check
                      </span>
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-sm mb-xs">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-label-sm tracking-wider uppercase font-semibold ${
                              isOverdue ? 'bg-error/10 text-error' : badge
                            }`}
                          >
                            {task.priority}
                          </span>
                          <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant rounded-md text-[10px] font-medium">
                            {task.category}
                          </span>
                        </div>

                        <span
                          className={`font-label-sm text-xs flex items-center gap-1 ${
                            task.completed
                              ? 'text-outline line-through'
                              : isOverdue
                              ? 'text-error font-medium'
                              : 'text-outline'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {isOverdue ? 'warning' : 'calendar_today'}
                          </span>
                          {task.dueDate}
                        </span>
                      </div>

                      <h3
                        className={`font-headline-md text-base truncate mb-1 font-semibold transition-colors ${
                          task.completed
                            ? 'text-outline line-through decoration-outline/50'
                            : 'text-on-surface group-hover:text-primary'
                        }`}
                      >
                        {task.title}
                      </h3>

                      {task.description && (
                        <p
                          className={`font-body-md text-xs line-clamp-2 mb-3 ${
                            task.completed ? 'text-outline' : 'text-on-surface-variant'
                          }`}
                        >
                          {task.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-1 border-t border-outline-variant/10 mt-2">
                        <div className="flex items-center gap-sm">
                          {task.avatars && (
                            <div className="flex -space-x-2">
                              {task.avatars.map((av, i) => (
                                <div
                                  key={i}
                                  className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-[10px] ring-2 ring-surface font-bold shadow-sm"
                                >
                                  {av}
                                </div>
                              ))}
                            </div>
                          )}

                          {task.attachments && (
                            <span className="flex items-center gap-1 font-label-sm text-xs text-outline bg-surface-container px-2 py-0.5 rounded">
                              <span className="material-symbols-outlined text-[14px]">attach_file</span>
                              {task.attachments}
                            </span>
                          )}
                        </div>

                        {/* Actions and Dynamic Priority Score */}
                        <div className="flex items-center gap-3">
                          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                            <button
                              onClick={() => setEditingTask(task)}
                              className="p-1 rounded-lg text-outline hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                              title="Edit task"
                            >
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="p-1 rounded-lg text-outline hover:text-error hover:bg-error-container/40 transition-colors cursor-pointer"
                              title="Delete task"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>

                          {/* Dynamic Priority Score visualization */}
                          <div className="flex items-center gap-1" title="Dynamic Priority Score">
                            {!task.completed && task.score > 0 ? (
                              <>
                                <svg className={`w-4 h-4 -rotate-90 ${scoreColor}`} viewBox="0 0 36 36">
                                  <path
                                    className="text-surface-container-high"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  />
                                  <path
                                    className="text-current transition-all duration-1000 ease-out"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeDasharray={`${task.score}, 100`}
                                    strokeWidth="4"
                                  />
                                </svg>
                                <span className={`font-label-sm text-xs font-bold ${scoreColor}`}>
                                  {task.score}
                                </span>
                              </>
                            ) : (
                              <span className="font-label-sm text-xs text-outline font-medium">
                                Done
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
