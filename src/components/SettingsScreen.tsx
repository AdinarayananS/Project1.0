import React, { useState } from 'react';
import { ScreenType, TransitionType } from '../types';
import { useTheme } from '../context/ThemeContext';

interface SettingsScreenProps {
  onNavigate: (screen: ScreenType, transition?: TransitionType) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'appearance' | 'notifications' | 'account' | 'general'>('appearance');
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
                  ? 'bg-surface-container-high text-on-surface font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
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
                  ? 'bg-surface-container-high text-on-surface font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
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
                  ? 'bg-surface-container-high text-on-surface font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
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
                  ? 'bg-surface-container-high text-on-surface font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
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
              <div className="bg-surface-container rounded-2xl p-xl flex flex-col gap-xl border border-outline-variant/20">
                {/* Theme Selector */}
                <div className="flex flex-col gap-md">
                  <div className="font-label-md text-label-md text-on-surface-variant font-medium">
                    Interface Theme
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                    <button
                      type="button"
                      onClick={() => {
                        setTheme('light');
                        triggerAutosave();
                      }}
                      className={`group flex flex-col gap-md p-md rounded-xl bg-surface hover:bg-surface-container-high transition-all cursor-pointer ${
                        theme === 'light'
                          ? 'ring-2 ring-primary shadow-md'
                          : 'ring-1 ring-outline-variant hover:ring-outline'
                      }`}
                    >
                      <div className="w-full h-24 rounded-lg bg-surface-container-lowest flex items-center justify-center relative overflow-hidden border border-outline-variant/30">
                        <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-100 opacity-90"></div>
                        <div className="relative z-10 flex flex-col items-center gap-1">
                          <span className="material-symbols-outlined text-primary text-[32px]">
                            light_mode
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-1">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Light Mode
                        </span>
                        {theme === 'light' && (
                          <span className="material-symbols-outlined text-primary text-[18px]">
                            check_circle
                          </span>
                        )}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setTheme('dark');
                        triggerAutosave();
                      }}
                      className={`group flex flex-col gap-md p-md rounded-xl bg-surface hover:bg-surface-container-high transition-all cursor-pointer ${
                        theme === 'dark'
                          ? 'ring-2 ring-primary shadow-md'
                          : 'ring-1 ring-outline-variant hover:ring-outline'
                      }`}
                    >
                      <div className="w-full h-24 rounded-lg bg-inverse-surface flex items-center justify-center relative overflow-hidden border border-outline-variant/30">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#12131f] to-[#090a10]"></div>
                        <div className="relative z-10 flex flex-col items-center gap-1">
                          <span className="material-symbols-outlined text-primary text-[32px]">
                            dark_mode
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-1">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Dark Mode
                        </span>
                        {theme === 'dark' && (
                          <span className="material-symbols-outlined text-primary text-[18px]">
                            check_circle
                          </span>
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex flex-col gap-md pt-md border-t border-outline-variant/20">
                  <div className="flex items-center justify-between py-sm">
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-on-surface font-medium">Reduced Motion</span>
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
                      <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-sm"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-sm">
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-on-surface font-medium">High Contrast</span>
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
                      <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-sm"></div>
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
              <div className="bg-surface-container rounded-2xl p-xl flex flex-col gap-xl border border-outline-variant/20">
                <div className="flex flex-col gap-md">
                  <div className="flex items-center justify-between py-sm">
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-on-surface font-medium">Email Reminders</span>
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
                      <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-sm"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-sm">
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-on-surface font-medium">Push Notifications</span>
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
                      <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-sm"></div>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-sm pt-md border-t border-outline-variant/20">
                  <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                    Alert Frequency
                  </span>
                  <select
                    value={alertFrequency}
                    onChange={(e) => {
                      setAlertFrequency(e.target.value);
                      triggerAutosave();
                    }}
                    className="bg-surface-container-high text-on-surface font-body-md text-body-md rounded-xl p-md outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer border border-outline-variant/30"
                  >
                    <option value="Immediate">Immediate</option>
                    <option value="Hourly Batch">Hourly Batch</option>
                    <option value="Daily Digest">Daily Digest</option>
                  </select>
                </div>
              </div>
            </section>
          )}

          {/* Account Section */}
          {activeTab === 'account' && (
            <section className="flex flex-col gap-lg animate-fade-in" id="account">
              <div className="font-headline-md text-headline-md text-on-surface">Account</div>
              <div className="bg-surface-container rounded-2xl p-xl flex flex-col gap-xl border border-outline-variant/20">
                <div className="flex flex-col gap-md">
                  <div className="flex items-center gap-md">
                    <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline-md text-headline-md shadow-md">
                      JD
                    </div>
                    <div>
                      <h4 className="font-headline-md text-on-surface text-base font-semibold">Jane Doe</h4>
                      <p className="font-body-md text-on-surface-variant text-xs">{email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md mt-md">
                    <div className="flex flex-col gap-xs">
                      <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        First Name
                      </label>
                      <input
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                          triggerAutosave();
                        }}
                        className="bg-surface-container-high text-on-surface font-body-md text-body-md rounded-xl p-md outline-none focus:bg-surface focus:ring-2 focus:ring-primary transition-all border border-outline-variant/30"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Last Name
                      </label>
                      <input
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                          triggerAutosave();
                        }}
                        className="bg-surface-container-high text-on-surface font-body-md text-body-md rounded-xl p-md outline-none focus:bg-surface focus:ring-2 focus:ring-primary transition-all border border-outline-variant/30"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        triggerAutosave();
                      }}
                      className="bg-surface-container-high text-on-surface font-body-md text-body-md rounded-xl p-md outline-none focus:bg-surface focus:ring-2 focus:ring-primary transition-all border border-outline-variant/30"
                      type="email"
                    />
                  </div>
                </div>

                {/* Password Change */}
                <div className="flex flex-col gap-md pt-lg relative border-t border-outline-variant/20">
                  <div className="font-label-md text-label-md text-on-surface-variant font-medium">
                    Security
                  </div>
                  <button
                    onClick={() => alert('Password reset email sent to ' + email)}
                    className="self-start bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md px-md py-sm rounded-lg transition-colors cursor-pointer border border-outline-variant/30"
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
              <div className="bg-surface-container rounded-2xl p-xl flex flex-col gap-xl border border-outline-variant/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                  <div className="flex flex-col gap-sm">
                    <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                      Language
                    </span>
                    <select
                      value={language}
                      onChange={(e) => {
                        setLanguage(e.target.value);
                        triggerAutosave();
                      }}
                      className="bg-surface-container-high text-on-surface font-body-md text-body-md rounded-xl p-md outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer border border-outline-variant/30"
                    >
                      <option value="English (US)">English (US)</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-sm">
                    <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                      Time Zone
                    </span>
                    <select
                      value={timeZone}
                      onChange={(e) => {
                        setTimeZone(e.target.value);
                        triggerAutosave();
                      }}
                      className="bg-surface-container-high text-on-surface font-body-md text-body-md rounded-xl p-md outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer border border-outline-variant/30"
                    >
                      <option value="Pacific Time (PT)">Pacific Time (PT)</option>
                      <option value="Eastern Time (ET)">Eastern Time (ET)</option>
                      <option value="Greenwich Mean Time (GMT)">Greenwich Mean Time (GMT)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-sm pt-md border-t border-outline-variant/20">
                  <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                    Start of the Week
                  </span>
                  <div className="flex gap-sm">
                    <button
                      type="button"
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
                      type="button"
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
