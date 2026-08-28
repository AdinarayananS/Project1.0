/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ScreenType, TransitionType } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { DashboardScreen } from './components/DashboardScreen';
import { OverdueTasksScreen } from './components/OverdueTasksScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { AllTasksScreen } from './components/AllTasksScreen';
import { ActiveTasksScreen } from './components/ActiveTasksScreen';
import { NewTaskModal } from './components/NewTaskModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [currentTransition, setCurrentTransition] = useState<TransitionType>('push');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const navigateTo = (screen: ScreenType, transition: TransitionType = 'push') => {
    if (screen === currentScreen) return;
    setCurrentTransition(transition);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTransitionVariants = (type: TransitionType) => {
    switch (type) {
      case 'push':
        return {
          initial: { x: 40, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -40, opacity: 0 },
          transition: { duration: 0.22, ease: 'easeOut' },
        };
      case 'push_back':
        return {
          initial: { x: -40, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: 40, opacity: 0 },
          transition: { duration: 0.22, ease: 'easeOut' },
        };
      case 'slide_up':
        return {
          initial: { y: 60, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: -40, opacity: 0 },
          transition: { duration: 0.28, ease: 'easeOut' },
        };
      case 'none':
      default:
        return {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 1 },
          transition: { duration: 0 },
        };
    }
  };

  const currentVariants = getTransitionVariants(currentTransition);

  return (
    <div className="bg-background font-body-md text-on-background min-h-screen flex flex-col antialiased selection:bg-primary/20 selection:text-primary">
      {/* Desktop Navigation Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
      />

      {/* Main Content View with Header */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        <Header
          onOpenSettings={() => navigateTo('settings', 'push')}
        />

        <main className="relative pt-20 pb-32 lg:pb-lg flex-1 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={currentVariants.initial}
              animate={currentVariants.animate}
              exit={currentVariants.exit}
              transition={currentVariants.transition}
              className="w-full h-full"
            >
              {currentScreen === 'dashboard' && (
                <DashboardScreen onNavigate={navigateTo} />
              )}
              {currentScreen === 'overdue-tasks' && (
                <OverdueTasksScreen onNavigate={navigateTo} />
              )}
              {currentScreen === 'settings' && (
                <SettingsScreen onNavigate={navigateTo} />
              )}
              {currentScreen === 'all-tasks' && (
                <AllTasksScreen
                  onNavigate={navigateTo}
                  onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
                />
              )}
              {currentScreen === 'active-tasks' && (
                <ActiveTasksScreen onNavigate={navigateTo} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Mobile Navigation Bar */}
        <MobileNav
          currentScreen={currentScreen}
          onNavigate={navigateTo}
          onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
        />
      </div>

      {/* Quick Add Task Modal */}
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        onSubmit={(task) => {
          console.log('New task created:', task);
          navigateTo('all-tasks', 'slide_up');
        }}
      />
    </div>
  );
}
