import React, { useState } from 'react';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: {
    title: string;
    description: string;
    category: string;
    priority: string;
    dueDate: string;
  }) => void;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Work');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('Today 5:00 PM');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, description, category, priority, dueDate });
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-md">
      <div className="bg-surface rounded-3xl p-xl max-w-lg w-full shadow-2xl border border-outline-variant/30 flex flex-col gap-lg animate-fade-in">
        <div className="flex items-center justify-between pb-sm border-b border-outline-variant/20">
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary text-[24px]">add_task</span>
            <h3 className="font-headline-md text-on-surface">Add New Task</h3>
          </div>
          <button
            onClick={onClose}
            className="p-sm text-outline hover:text-on-surface hover:bg-surface-container rounded-full transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          <div className="flex flex-col gap-xs">
            <label className="font-label-sm text-on-surface-variant">Task Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Prepare Q3 Budget Deck"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-surface-container-low border border-outline-variant/40 rounded-xl px-md py-sm text-body-md text-on-surface focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label className="font-label-sm text-on-surface-variant">Description</label>
            <textarea
              rows={2}
              placeholder="Brief details about what needs to be done..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-surface-container-low border border-outline-variant/40 rounded-xl px-md py-sm text-body-md text-on-surface focus:ring-2 focus:ring-primary outline-none resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="font-label-sm text-on-surface-variant">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-surface-container-low border border-outline-variant/40 rounded-xl px-md py-sm text-body-md text-on-surface focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Health">Health</option>
              </select>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-sm text-on-surface-variant">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="bg-surface-container-low border border-outline-variant/40 rounded-xl px-md py-sm text-body-md text-on-surface focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <label className="font-label-sm text-on-surface-variant">Due Date / Time</label>
            <input
              type="text"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="e.g. Due Tomorrow 3:00 PM"
              className="bg-surface-container-low border border-outline-variant/40 rounded-xl px-md py-sm text-body-md text-on-surface focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-md pt-md border-t border-outline-variant/20 mt-sm">
            <button
              type="button"
              onClick={onClose}
              className="px-lg py-sm rounded-xl text-on-surface-variant hover:bg-surface-container font-label-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-lg py-sm bg-primary text-on-primary rounded-xl font-label-md shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
