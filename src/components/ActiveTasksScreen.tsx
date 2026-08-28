import React, { useState } from 'react';
import { ScreenType, TransitionType } from '../types';

interface ActiveTasksScreenProps {
  onNavigate: (screen: ScreenType, transition?: TransitionType) => void;
}

export const ActiveTasksScreen: React.FC<ActiveTasksScreenProps> = ({ onNavigate }) => {
  const [completedCard1, setCompletedCard1] = useState(false);
  const [completedCard2, setCompletedCard2] = useState(false);
  const [completedList1, setCompletedList1] = useState(false);
  const [completedList2, setCompletedList2] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <div className="px-lg lg:px-2xl pb-2xl flex flex-col gap-2xl">
        {/* Hero / Header Section */}
        <section className="relative bg-surface-container rounded-[32px] overflow-hidden mt-lg shadow-sm">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-colors-primary),_transparent_50%)] pointer-events-none"></div>
          <div className="relative p-xl lg:p-2xl flex flex-col lg:flex-row justify-between items-start lg:items-end gap-xl">
            <div className="flex flex-col gap-md">
              <div className="inline-flex items-center gap-sm bg-primary-container/20 text-on-surface px-md py-sm rounded-full w-fit">
                <span className="material-symbols-outlined text-[16px] text-primary">play_circle</span>
                <span className="font-label-md text-label-md text-primary">Active Sprint</span>
              </div>
              <div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface mb-xs">In Progress</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                  Focus on what matters now. You have 12 active tasks across 3 projects.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-xl bg-surface p-md rounded-2xl shadow-sm self-stretch lg:self-auto min-w-[280px]">
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container-highest"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-primary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="65, 100"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-label-md text-label-md text-on-surface font-bold">
                  65%
                </div>
              </div>
              <div className="flex flex-col gap-xs">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">
                  Weekly Goal
                </span>
                <span className="font-body-md text-body-md text-on-surface font-medium">
                  24/37 Tasks Completed
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Tasks for Today */}
        <section className="flex flex-col gap-xl">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-sm">
              <span className="material-symbols-outlined text-tertiary">wb_sunny</span>
              Today's Focus
            </h2>
            <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container-high px-md py-sm rounded-lg">
              4 Tasks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-lg">
            {/* Task Card 1: High Priority */}
            <article
              className={`group bg-surface hover:bg-surface-container-lowest rounded-[24px] p-lg shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[220px] ${
                completedCard1 ? 'opacity-60 scale-[0.98]' : ''
              }`}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
              <div className="flex justify-between items-start mb-md">
                <div className="flex items-center gap-sm">
                  <span className="inline-flex items-center px-sm py-xs rounded-full bg-error-container/30 text-error font-label-sm text-label-sm">
                    High Priority
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">Design System</span>
                </div>
                <button className="text-outline hover:text-primary transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>

              <div className="mb-xl flex-1">
                <h3
                  className={`font-headline-md text-headline-md mb-sm transition-colors ${
                    completedCard1
                      ? 'line-through text-outline'
                      : 'text-on-surface group-hover:text-primary'
                  }`}
                >
                  Finalize Component Library
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                  Review and sign off on the new button, card, and input variants before developer handoff.
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-md">
                  <button
                    onClick={() => setCompletedCard1(!completedCard1)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                      completedCard1
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">check</span>
                  </button>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center border-2 border-surface">
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                        person
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center border-2 border-surface">
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                        person
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-sm text-on-surface-variant font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  <span>2:00 PM</span>
                </div>
              </div>
            </article>

            {/* Task Card 2: Medium Priority */}
            <article
              className={`group bg-surface hover:bg-surface-container-lowest rounded-[24px] p-lg shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[220px] ${
                completedCard2 ? 'opacity-60 scale-[0.98]' : ''
              }`}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
              <div className="flex justify-between items-start mb-md">
                <div className="flex items-center gap-sm">
                  <span className="inline-flex items-center px-sm py-xs rounded-full bg-secondary-fixed/30 text-secondary font-label-sm text-label-sm">
                    Medium
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">Marketing</span>
                </div>
                <button className="text-outline hover:text-primary transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>

              <div className="mb-xl flex-1">
                <h3
                  className={`font-headline-md text-headline-md mb-sm transition-colors ${
                    completedCard2
                      ? 'line-through text-outline'
                      : 'text-on-surface group-hover:text-primary'
                  }`}
                >
                  Q3 Campaign Review
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                  Analyze performance metrics from the initial launch week and prepare a summary slide deck.
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-md">
                  <button
                    onClick={() => setCompletedCard2(!completedCard2)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                      completedCard2
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">check</span>
                  </button>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center border-2 border-surface">
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                        person
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-sm text-on-surface-variant font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  <span>4:30 PM</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Later this Week */}
        <section className="flex flex-col gap-xl mt-xl">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-sm">
              <span className="material-symbols-outlined text-secondary">calendar_month</span>
              Later This Week
            </h2>
            <button
              onClick={() => onNavigate('all-tasks', 'push')}
              className="font-label-md text-label-md text-primary hover:text-primary-fixed-variant transition-colors flex items-center gap-xs cursor-pointer"
            >
              View Calendar <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          <div className="flex flex-col gap-sm">
            {/* List Item 1 */}
            <div
              className={`bg-surface hover:bg-surface-container-lowest rounded-xl p-md shadow-sm hover:shadow-md transition-all flex items-center gap-md group ${
                completedList1 ? 'opacity-60' : ''
              }`}
            >
              <button
                onClick={() => setCompletedList1(!completedList1)}
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${
                  completedList1
                    ? 'bg-primary border-primary text-on-primary'
                    : 'border-outline-variant group-hover:border-primary text-transparent hover:bg-primary hover:text-on-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
              </button>

              <div className="w-1.5 h-10 rounded-full bg-tertiary-container"></div>

              <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center justify-between gap-md">
                <div>
                  <h4
                    className={`font-body-lg text-body-lg truncate ${
                      completedList1 ? 'line-through text-outline' : 'text-on-surface'
                    }`}
                  >
                    Prepare Q4 Budget Forecast
                  </h4>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Finance • Due Thursday
                  </p>
                </div>
                <div className="flex items-center gap-lg">
                  <div className="hidden md:flex items-center gap-sm">
                    <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                    <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                    <span className="w-2 h-2 rounded-full bg-surface-container-highest"></span>
                  </div>
                  <div className="flex items-center gap-sm bg-surface-container-low px-sm py-xs rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
                        person
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface">Alex M.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* List Item 2 */}
            <div
              className={`bg-surface hover:bg-surface-container-lowest rounded-xl p-md shadow-sm hover:shadow-md transition-all flex items-center gap-md group ${
                completedList2 ? 'opacity-60' : ''
              }`}
            >
              <button
                onClick={() => setCompletedList2(!completedList2)}
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${
                  completedList2
                    ? 'bg-primary border-primary text-on-primary'
                    : 'border-outline-variant group-hover:border-primary text-transparent hover:bg-primary hover:text-on-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
              </button>

              <div className="w-1.5 h-10 rounded-full bg-secondary"></div>

              <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center justify-between gap-md">
                <div>
                  <h4
                    className={`font-body-lg text-body-lg truncate ${
                      completedList2 ? 'line-through text-outline' : 'text-on-surface'
                    }`}
                  >
                    Client Onboarding Presentation
                  </h4>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Sales • Due Friday
                  </p>
                </div>
                <div className="flex items-center gap-lg">
                  <div className="hidden md:flex items-center gap-sm">
                    <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                    <span className="w-2 h-2 rounded-full bg-surface-container-highest"></span>
                    <span className="w-2 h-2 rounded-full bg-surface-container-highest"></span>
                  </div>
                  <div className="flex items-center gap-sm bg-surface-container-low px-sm py-xs rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
                        person
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface">Sarah J.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
