import React, { useState, useMemo } from 'react';
import { ScreenType, TransitionType } from '../types';

interface AllTasksScreenProps {
  onNavigate: (screen: ScreenType, transition?: TransitionType) => void;
  onOpenNewTaskModal?: () => void;
}

interface AllTaskItem {
  id: string;
  title: string;
  description: string;
  category: 'work' | 'personal' | 'health';
  categoryLabel: string;
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'completed' | 'overdue';
  statusBadge: string;
  statusBadgeColor: string;
  dateStr: string;
  score: number | null;
  borderAccent: string;
  scoreColor: string;
  avatars?: string[];
  attachments?: number;
  completed: boolean;
}

export const AllTasksScreen: React.FC<AllTasksScreenProps> = ({
  onNavigate,
  onOpenNewTaskModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [sortBy, setSortBy] = useState('dynamic');
  const [currentFilter, setCurrentFilter] = useState<'all' | 'completed'>('all');

  const [taskList, setTaskList] = useState<AllTaskItem[]>([
    {
      id: 'at-1',
      title: 'Finalize Q3 Financial Report',
      description: 'Compile data from all departments, review variance analysis, and prepare the final presentation deck for the board meeting.',
      category: 'work',
      categoryLabel: 'Work',
      priority: 'high',
      status: 'overdue',
      statusBadge: 'Overdue',
      statusBadgeColor: 'bg-error/10 text-error',
      dateStr: 'Yesterday, 5:00 PM',
      score: 95,
      borderAccent: 'border-error',
      scoreColor: 'text-error',
      avatars: ['AK', 'JD'],
      completed: false,
    },
    {
      id: 'at-2',
      title: 'Book Flights for Tokyo Trip',
      description: 'Compare prices on ANA and JAL. Need to arrive by the 14th before the conference starts. Check for extra legroom options.',
      category: 'personal',
      categoryLabel: 'Personal',
      priority: 'medium',
      status: 'active',
      statusBadge: 'In Progress',
      statusBadgeColor: 'bg-secondary/10 text-secondary',
      dateStr: 'Today, 2:00 PM',
      score: 65,
      borderAccent: 'border-secondary',
      scoreColor: 'text-secondary',
      completed: false,
    },
    {
      id: 'at-3',
      title: 'Annual Physical Exam',
      description: "Dr. Smith's office. Fasting required for blood work.",
      category: 'health',
      categoryLabel: 'Health',
      priority: 'low',
      status: 'completed',
      statusBadge: 'Completed',
      statusBadgeColor: 'bg-outline/10 text-on-surface-variant',
      dateStr: 'Oct 12, 9:00 AM',
      score: null,
      borderAccent: 'border-outline',
      scoreColor: 'text-outline',
      completed: true,
    },
    {
      id: 'at-4',
      title: 'Update Onboarding Documentation',
      description: 'Review the developer setup guide and ensure new repository links are accurate. Add section on local environment variables.',
      category: 'work',
      categoryLabel: 'Work',
      priority: 'low',
      status: 'active',
      statusBadge: 'To Do',
      statusBadgeColor: 'bg-primary/10 text-primary',
      dateStr: 'Next Week',
      score: 32,
      borderAccent: 'border-primary',
      scoreColor: 'text-primary',
      attachments: 2,
      completed: false,
    },
  ]);

  const handleToggleTask = (id: string) => {
    setTaskList((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          return {
            ...t,
            completed: nextCompleted,
            status: nextCompleted ? 'completed' : 'active',
            statusBadge: nextCompleted ? 'Completed' : 'To Do',
            statusBadgeColor: nextCompleted
              ? 'bg-outline/10 text-on-surface-variant'
              : 'bg-primary/10 text-primary',
          };
        }
        return t;
      })
    );
  };

  // Quick filter buttons handling
  const handleFilterClick = (filterType: 'all' | 'active' | 'completed' | 'overdue') => {
    if (filterType === 'active') {
      onNavigate('active-tasks', 'none');
    } else if (filterType === 'overdue') {
      onNavigate('overdue-tasks', 'none');
    } else if (filterType === 'completed') {
      setCurrentFilter('completed');
    } else {
      setCurrentFilter('all');
    }
  };

  const filteredTasks = useMemo(() => {
    return taskList.filter((task) => {
      // Category filter
      if (selectedCategory && task.category !== selectedCategory) return false;
      // Priority filter
      if (selectedPriority && task.priority !== selectedPriority) return false;
      // Search term
      if (
        searchTerm &&
        !task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !task.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      // Status filter
      if (currentFilter === 'completed' && !task.completed) return false;
      return true;
    });
  }, [taskList, selectedCategory, selectedPriority, searchTerm, currentFilter]);

  return (
    <div className="flex flex-col w-full h-full relative" id="allTasksContainer">
      {/* Header Section */}
      <div className="px-lg lg:px-xl pt-lg pb-md flex flex-col md:flex-row md:items-end justify-between gap-lg sticky top-0 bg-background/80 backdrop-blur-xl z-20">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-background mb-xs">All Tasks</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Manage, filter, and organize your complete task inventory.
          </p>
        </div>
        <div className="flex items-center gap-md">
          <button
            onClick={() => {
              if (onOpenNewTaskModal) onOpenNewTaskModal();
              else {
                const title = prompt('Enter task title:');
                if (title) {
                  setTaskList((prev) => [
                    {
                      id: `at-${Date.now()}`,
                      title,
                      description: 'Quickly captured new task item.',
                      category: 'work',
                      categoryLabel: 'Work',
                      priority: 'medium',
                      status: 'active',
                      statusBadge: 'To Do',
                      statusBadgeColor: 'bg-primary/10 text-primary',
                      dateStr: 'Tomorrow, 5:00 PM',
                      score: 50,
                      borderAccent: 'border-primary',
                      scoreColor: 'text-primary',
                      completed: false,
                    },
                    ...prev,
                  ]);
                }
              }
            }}
            className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-lg py-sm rounded-xl transition-all shadow-md shadow-primary/20 flex items-center gap-sm whitespace-nowrap group cursor-pointer"
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
      <div className="px-lg lg:px-xl py-md flex flex-col gap-md border-b border-surface-container border-opacity-50">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-md">
          {/* Search */}
          <div className="flex-1 relative group">
            <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors z-10">
              search
            </span>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container-low text-on-surface placeholder:text-outline-variant pl-xl pr-md py-sm rounded-xl outline-none focus:bg-surface focus:ring-2 focus:ring-primary/50 transition-all font-body-md text-body-md"
              id="taskSearch"
              placeholder="Search tasks by name or keyword..."
              type="text"
            />
          </div>

          {/* Quick Filters (Pills) */}
          <div className="flex overflow-x-auto pb-2 md:pb-0 hide-scrollbar gap-sm snap-x">
            <button
              onClick={() => handleFilterClick('all')}
              className={`filter-btn snap-start px-md py-xs rounded-full font-label-sm text-label-sm whitespace-nowrap transition-all shadow-sm cursor-pointer ${
                currentFilter === 'all'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              }`}
              data-filter="all"
            >
              All Tasks
            </button>

            <button
              onClick={() => handleFilterClick('active')}
              className="filter-btn snap-start bg-surface-container hover:bg-surface-container-high text-on-surface px-md py-xs rounded-full font-label-sm text-label-sm whitespace-nowrap transition-all cursor-pointer"
              data-filter="active"
            >
              Active
            </button>

            <button
              onClick={() => handleFilterClick('completed')}
              className={`filter-btn snap-start px-md py-xs rounded-full font-label-sm text-label-sm whitespace-nowrap transition-all cursor-pointer ${
                currentFilter === 'completed'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              }`}
              data-filter="completed"
            >
              Completed
            </button>

            <button
              onClick={() => handleFilterClick('overdue')}
              className="filter-btn snap-start bg-surface-container hover:bg-surface-container-high text-on-surface px-md py-xs rounded-full font-label-sm text-label-sm whitespace-nowrap transition-all cursor-pointer"
              data-filter="overdue"
            >
              Overdue
            </button>
          </div>
        </div>

        {/* Advanced Filters & Sort */}
        <div className="flex flex-wrap items-center gap-md justify-between bg-surface-container-lowest p-sm rounded-xl shadow-sm border border-surface-container/30">
          <div className="flex items-center gap-md">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-surface-container-low text-on-surface font-label-md text-label-md pl-md pr-xl py-xs rounded-lg outline-none cursor-pointer hover:bg-surface-container-high transition-colors"
              >
                <option value="">Category: All</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="health">Health</option>
              </select>
              <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-outline-variant text-[18px]">
                expand_more
              </span>
            </div>

            <div className="relative">
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="appearance-none bg-surface-container-low text-on-surface font-label-md text-label-md pl-md pr-xl py-xs rounded-lg outline-none cursor-pointer hover:bg-surface-container-high transition-colors"
              >
                <option value="">Priority: All</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-outline-variant text-[18px]">
                expand_more
              </span>
            </div>
          </div>

          <div className="flex items-center gap-sm">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
              Sort by:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent text-primary font-label-md text-label-md pl-sm pr-xl py-xs outline-none cursor-pointer hover:text-primary-container transition-colors font-medium"
              >
                <option value="dynamic">Priority Score (Dynamic)</option>
                <option value="deadline">Closest Deadline</option>
                <option value="created">Newly Created</option>
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
            <div className="w-32 h-32 mb-lg opacity-50 relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping"></div>
              <span className="material-symbols-outlined text-[64px] text-primary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                search_off
              </span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-sm">No tasks found</h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-md" id="taskGrid">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                data-category={task.category}
                data-status={task.status}
                className={`task-card rounded-2xl p-md shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer border-l-4 ${task.borderAccent} ${
                  task.completed
                    ? 'bg-surface-container-low opacity-70 hover:opacity-100'
                    : 'bg-surface-container-lowest'
                }`}
              >
                <div className="flex items-start gap-md">
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className={`w-6 h-6 rounded flex items-center justify-center transition-colors mt-1 cursor-pointer ${
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
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-label-sm tracking-wider uppercase ${task.statusBadgeColor}`}
                      >
                        {task.statusBadge}
                      </span>
                      <span
                        className={`font-label-sm text-label-sm flex items-center gap-xs ${
                          task.completed
                            ? 'text-outline-variant line-through'
                            : 'text-outline-variant'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                        {task.dateStr}
                      </span>
                    </div>

                    <h3
                      className={`font-headline-md text-headline-md truncate mb-sm transition-colors ${
                        task.completed
                          ? 'text-outline line-through decoration-outline/50'
                          : 'text-on-surface group-hover:text-primary'
                      }`}
                    >
                      {task.title}
                    </h3>

                    <p
                      className={`font-body-md text-body-md line-clamp-2 mb-md ${
                        task.completed ? 'text-outline-variant' : 'text-on-surface-variant'
                      }`}
                    >
                      {task.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-sm">
                        <span
                          className={`px-sm py-1 rounded font-label-sm text-label-sm ${
                            task.completed
                              ? 'bg-surface-container-lowest text-outline'
                              : 'bg-surface-container text-on-surface-variant'
                          }`}
                        >
                          {task.categoryLabel}
                        </span>

                        {task.avatars && (
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-[10px] ring-2 ring-surface-container-lowest shadow-sm z-20">
                              {task.avatars[0]}
                            </div>
                            <div className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-label-sm text-[10px] ring-2 ring-surface-container-lowest shadow-sm z-10">
                              {task.avatars[1]}
                            </div>
                          </div>
                        )}

                        {task.attachments && (
                          <span className="flex items-center gap-1 font-label-sm text-label-sm text-outline-variant bg-surface-container-low px-2 py-0.5 rounded">
                            <span className="material-symbols-outlined text-[14px]">attach_file</span>
                            {task.attachments}
                          </span>
                        )}
                      </div>

                      {/* Dynamic Priority Score visualization */}
                      <div className="flex items-center gap-xs" title="Dynamic Priority Score">
                        {task.score !== null ? (
                          <>
                            <svg className={`w-5 h-5 -rotate-90 ${task.scoreColor}`} viewBox="0 0 36 36">
                              <path
                                className="text-surface-container"
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
                            <span className={`font-label-sm text-label-sm font-bold ${task.scoreColor}`}>
                              {task.score}
                            </span>
                          </>
                        ) : (
                          <span className="font-label-sm text-label-sm text-outline font-medium">
                            Done
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
