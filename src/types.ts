export type ScreenType = 'dashboard' | 'overdue-tasks' | 'settings' | 'all-tasks' | 'active-tasks';

export type TransitionType = 'push' | 'push_back' | 'slide_up' | 'none';

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  category: 'Work' | 'Personal' | 'Health' | 'Design' | 'Marketing' | 'Finance' | 'Sales';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'active' | 'completed' | 'overdue';
  dueDateStr: string;
  dueStatus?: string;
  priorityScore?: number;
  assignees?: string[];
  attachmentsCount?: number;
  completedAt?: string;
}
