import React, { useState } from 'react';
import { ScreenType, TransitionType } from '../types';

interface SettingsScreenProps {
  onNavigate: (screen: ScreenType, transition?: TransitionType) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const [activeTab, setActiveTab] = useState<'appearance' | 'notifications' | 'account' | 'general'>('appearance');
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>('light');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const [emailReminders, setEmailReminders] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [alertFrequency, setAlertFrequency] = useState('Immediate');

  const [firstName, setFirstName] = useState('Jane');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('jane.doe@example.com');

  const [language, setLanguage] = useState('English (US)');
  const [timeZone, setTimeZone] = useState('Pacific Time (PT)');
  const [startOfWeek, setStartOfWeek] = useState<'Sunday' | 'Monday'>('Sunday');

  const [saveStatus, setSaveStatus] = useState('Preferences autosaved');

  const triggerAutosave = () => {
    setSaveStatus('Saving...');
    setTimeout(() => setSaveStatus('Preferences autosaved'), 600);
  };

  return (
    <div className="flex flex-col w-full h-full p-lg lg:p-2xl">
      <div className="flex flex-col md:flex-row gap-xl w-full max-w-[1280px] mx-auto">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0 flex flex-col gap-sm">
          <div className="font-headline-md text-headline-md text-on-surface mb-lg">Settings</div>
          <nav className="flex flex-col gap-xs" id="settings-nav">
            <button
              onClick={() => setActiveTab('appearance')}
              className={`flex items-center gap-md p-md rounded-xl transition-colors text-left cursor-pointer ${
                activeTab === 'appearance'
                  ? 'bg-surface-container-high text-on-surface'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
              data-target="appearance"
            >
              <span className="material-symbols-outlined text-[20px]">palette</span>
              <span className="font-label-md text-label-md">Appearance</span>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-md p-md rounded-xl transition-colors text-left cursor-pointer ${
                activeTab === 'notifications'
                  ? 'bg-surface-container-high text-on-surface'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
              data-target="notifications"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="font-label-md text-label-md">Notifications</span>
            </button>

            <button
              onClick={() => setActiveTab('account')}
              className={`flex items-center gap-md p-md rounded-xl transition-colors text-left cursor-pointer ${
                activeTab === 'account'
                  ? 'bg-surface-container-high text-on-surface'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
              data-target="account"
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
              <span className="font-label-md text-label-md">Account</span>
            </button>

            <button
              onClick={() => setActiveTab('general')}
              className={`flex items-center gap-md p-md rounded-xl transition-colors text-left cursor-pointer ${
                activeTab === 'general'
                  ? 'bg-surface-container-high text-on-surface'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
              data-target="general"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
              <span className="font-label-md text-label-md">General</span>
            </button>
          </nav>

          <div className="mt-auto pt-xl">
            <div className="flex items-center gap-sm text-outline font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">cloud_done</span>
              <span>{saveStatus}</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-2xl">
          {/* Appearance Section */}
          {activeTab === 'appearance' && (
            <section className="flex flex-col gap-lg animate-fade-in" id="appearance">
              <div className="font-headline-md text-headline-md text-on-surface">Appearance</div>
              <div className="bg-surface-container rounded-2xl p-xl flex flex-col gap-xl">
                {/* Theme Selector */}
                <div className="flex flex-col gap-md">
                  <div className="font-label-md text-label-md text-on-surface-variant">Theme</div>
                  <div className="grid grid-cols-2 gap-md">
                    <button
                      onClick={() => {
                        setSelectedTheme('light');
                        triggerAutosave();
                      }}
                      className={`group flex flex-col gap-md p-md rounded-xl bg-surface hover:bg-surface-container-high transition-colors cursor-pointer ${
                        selectedTheme === 'light'
                          ? 'ring-2 ring-primary'
                          : 'ring-1 ring-outline-variant hover:ring-outline'
                      }`}
                    >
                      <div className="w-full h-24 rounded-lg bg-surface-container-lowest flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-surface-container-lowest to-surface-container-high"></div>
                        <span className="material-symbols-outlined text-on-surface z-10 text-[32px]">
                          light_mode
                        </span>
                      </div>
                      <div className="font-label-md text-label-md text-on-surface text-center">
                        Light
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedTheme('dark');
                        triggerAutosave();
                      }}
                      className={`group flex flex-col gap-md p-md rounded-xl bg-surface hover:bg-surface-container-high transition-colors cursor-pointer ${
                        selectedTheme === 'dark'
                          ? 'ring-2 ring-primary'
                          : 'ring-1 ring-outline-variant hover:ring-outline'
                      }`}
                    >
                      <div className="w-full h-24 rounded-lg bg-inverse-surface flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-inverse-surface to-black/50"></div>
                        <span className="material-symbols-outlined text-inverse-on-surface z-10 text-[32px]">
                          dark_mode
                        </span>
                      </div>
                      <div className="font-label-md text-label-md text-on-surface text-center">
                        Dark
                      </div>
                    </button>
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex flex-col gap-md">
                  <div className="flex items-center justify-between py-sm">
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-on-surface">Reduced Motion</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Minimize UI animations
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reducedMotion}
                        onChange={(e) => {
                          setReducedMotion(e.target.checked);
                          triggerAutosave();
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-sm"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-sm">
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-on-surface">High Contrast</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Increase legibility of text
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={highContrast}
                        onChange={(e) => {
                          setHighContrast(e.target.checked);
                          triggerAutosave();
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-sm"></div>
                    </label>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Notifications Section */}
          {activeTab === 'notifications' && (
            <section className="flex flex-col gap-lg animate-fade-in" id="notifications">
              <div className="font-headline-md text-headline-md text-on-surface">Notifications</div>
              <div className="bg-surface-container rounded-2xl p-xl flex flex-col gap-xl">
                <div className="flex flex-col gap-md">
                  <div className="flex items-center justify-between py-sm">
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-on-surface">Email Reminders</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Daily digest of upcoming tasks
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailReminders}
                        onChange={(e) => {
                          setEmailReminders(e.target.checked);
                          triggerAutosave();
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-sm"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-sm">
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-on-surface">Push Notifications</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Real-time alerts for deadlines
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pushNotifications}
                        onChange={(e) => {
                          setPushNotifications(e.target.checked);
                          triggerAutosave();
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-sm"></div>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-sm">
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    Alert Frequency
                  </span>
                  <select
                    value={alertFrequency}
                    onChange={(e) => {
                      setAlertFrequency(e.target.value);
                      triggerAutosave();
                    }}
                    className="bg-surface-container-high text-on-surface font-body-md text-body-md rounded-xl p-md outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                  >
                    <option>Immediate</option>
                    <option>Hourly Batch</option>
                    <option>Daily Digest</option>
                  </select>
                </div>
              </div>
            </section>
          )}

          {/* Account Section */}
          {activeTab === 'account' && (
            <section className="flex flex-col gap-lg animate-fade-in" id="account">
              <div className="font-headline-md text-headline-md text-on-surface">Account</div>
              <div className="bg-surface-container rounded-2xl p-xl flex flex-col gap-xl">
                <div className="flex flex-col gap-md">
                  <div className="flex items-center gap-md">
                    <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-headline-md text-headline-md">
                      JD
                    </div>
                    <button
                      onClick={() => alert('Avatar upload modal opened')}
                      className="bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md px-md py-sm rounded-lg transition-colors cursor-pointer"
                    >
                      Change Avatar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md mt-md">
                    <div className="flex flex-col gap-xs">
                      <label className="font-label-sm text-label-sm text-on-surface-variant">
                        First Name
                      </label>
                      <input
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                          triggerAutosave();
                        }}
                        className="bg-surface-container-high text-on-surface font-body-md text-body-md rounded-xl p-md outline-none focus:bg-surface focus:ring-2 focus:ring-primary transition-all"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label className="font-label-sm text-label-sm text-on-surface-variant">
                        Last Name
                      </label>
                      <input
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                          triggerAutosave();
                        }}
                        className="bg-surface-container-high text-on-surface font-body-md text-body-md rounded-xl p-md outline-none focus:bg-surface focus:ring-2 focus:ring-primary transition-all"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label className="font-label-sm text-label-sm text-on-surface-variant">
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        triggerAutosave();
                      }}
                      className="bg-surface-container-high text-on-surface font-body-md text-body-md rounded-xl p-md outline-none focus:bg-surface focus:ring-2 focus:ring-primary transition-all"
                      type="email"
                    />
                  </div>
                </div>

                {/* Password Change */}
                <div className="flex flex-col gap-md pt-lg relative">
                  <div className="absolute top-0 left-0 right-0 h-px bg-outline-variant/30"></div>
                  <div className="font-label-md text-label-md text-on-surface-variant">
                    Security
                  </div>
                  <button
                    onClick={() => alert('Password reset email sent to ' + email)}
                    className="self-start bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md px-md py-sm rounded-lg transition-colors cursor-pointer"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* General Section */}
          {activeTab === 'general' && (
            <section className="flex flex-col gap-lg animate-fade-in" id="general">
              <div className="font-headline-md text-headline-md text-on-surface">General</div>
              <div className="bg-surface-container rounded-2xl p-xl flex flex-col gap-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                  <div className="flex flex-col gap-sm">
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      Language
                    </span>
                    <select
                      value={language}
                      onChange={(e) => {
                        setLanguage(e.target.value);
                        triggerAutosave();
                      }}
                      className="bg-surface-container-high text-on-surface font-body-md text-body-md rounded-xl p-md outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                    >
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-sm">
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      Time Zone
                    </span>
                    <select
                      value={timeZone}
                      onChange={(e) => {
                        setTimeZone(e.target.value);
                        triggerAutosave();
                      }}
                      className="bg-surface-container-high text-on-surface font-body-md text-body-md rounded-xl p-md outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                    >
                      <option>Pacific Time (PT)</option>
                      <option>Eastern Time (ET)</option>
                      <option>Greenwich Mean Time (GMT)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-sm">
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    Start of the Week
                  </span>
                  <div className="flex gap-sm">
                    <button
                      onClick={() => {
                        setStartOfWeek('Sunday');
                        triggerAutosave();
                      }}
                      className={`flex-1 font-label-md text-label-md py-sm rounded-lg transition-colors text-center cursor-pointer ${
                        startOfWeek === 'Sunday'
                          ? 'bg-primary text-on-primary shadow-sm'
                          : 'bg-surface-container-high hover:bg-surface-variant text-on-surface'
                      }`}
                    >
                      Sunday
                    </button>
                    <button
                      onClick={() => {
                        setStartOfWeek('Monday');
                        triggerAutosave();
                      }}
                      className={`flex-1 font-label-md text-label-md py-sm rounded-lg transition-colors text-center cursor-pointer ${
                        startOfWeek === 'Monday'
                          ? 'bg-primary text-on-primary shadow-sm'
                          : 'bg-surface-container-high hover:bg-surface-variant text-on-surface'
                      }`}
                    >
                      Monday
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
