'use client';

import { useState } from 'react';
import {
  User,
  Lock,
  Bell,
  Shield,
  Globe,
  LogOut,
  Trash2,
  Mail,
  Smartphone,
  Key,
  FileText,
  Download,
  AlertCircle,
  ToggleLeft,
  Settings as SettingsIcon
} from 'lucide-react';

interface SettingOption {
  id: string;
  label: string;
  enabled: boolean;
  required?: boolean;
}

interface BaseSetting {
  id: string;
  title: string;
  description: string;
}

interface ToggleSetting extends BaseSetting {
  type: 'toggle';
  current: boolean;
}

interface MultiToggleSetting extends BaseSetting {
  type: 'multi-toggle';
  options: SettingOption[];
}

interface SelectSetting extends BaseSetting {
  type: 'select';
  options: string[];
  current: string;
}

interface ButtonSetting extends BaseSetting {
  type: 'button';
  action: 'change' | 'view' | 'download';
}

interface ImageSetting extends BaseSetting {
  type: 'image';
  current: string;
}

interface TimeRangeSetting extends BaseSetting {
  type: 'time-range';
  current: {
    start: string;
    end: string;
  };
}

type Setting = 
  | ToggleSetting 
  | MultiToggleSetting 
  | SelectSetting 
  | ButtonSetting 
  | ImageSetting 
  | TimeRangeSetting;

interface Section {
  id: string;
  title: string;
  description: string;
  icon: any; // Using any for Lucide icons
  settings: Setting[];
}

const sections: Section[] = [
  {
    id: 'profile',
    title: 'Profile Settings',
    description: 'Manage your personal information and preferences',
    icon: User,
    settings: [
      {
        id: 'profile-picture',
        title: 'Profile Picture',
        description: 'Update your profile picture',
        type: 'image',
        current: '/images/user/Logo.png'
      },
      {
        id: 'notifications',
        title: 'Email Notifications',
        description: 'Choose what updates you want to receive',
        type: 'multi-toggle',
        options: [
          { id: 'new-matches', label: 'New candidate matches', enabled: true },
          { id: 'interview-updates', label: 'Interview updates', enabled: true, required: true },
          { id: 'application-updates', label: 'Application updates', enabled: true },
          { id: 'product-news', label: 'Product news and updates', enabled: false }
        ]
      }
    ]
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Manage your account security settings',
    icon: Lock,
    settings: [
      {
        id: 'password',
        title: 'Password',
        description: 'Change your password',
        type: 'button',
        action: 'change'
      },
      {
        id: 'two-factor',
        title: 'Two-Factor Authentication',
        description: 'Add an extra layer of security to your account',
        type: 'toggle',
        current: false
      }
    ]
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Configure how you want to be notified',
    icon: Bell,
    settings: [
      {
        id: 'notification-method',
        title: 'Notification Method',
        description: 'Choose how you want to receive notifications',
        type: 'select',
        options: ['Email', 'SMS', 'Push Notifications', 'All'],
        current: 'Email'
      },
      {
        id: 'quiet-hours',
        title: 'Quiet Hours',
        description: 'Set times when you dont want to receive notifications',
        type: 'time-range',
        current: {
          start: '22:00',
          end: '08:00'
        }
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy',
    description: 'Manage your data and privacy settings',
    icon: Shield,
    settings: [
      {
        id: 'data-processing',
        title: 'Data Processing Agreement',
        description: 'View and download your DPA',
        type: 'button',
        action: 'view'
      },
      {
        id: 'export-data',
        title: 'Export Your Data',
        description: 'Download a copy of your data',
        type: 'button',
        action: 'download'
      }
    ]
  },
  {
    id: 'language',
    title: 'Language & Region',
    description: 'Set your language and regional preferences',
    icon: Globe,
    settings: [
      {
        id: 'language',
        title: 'Language',
        description: 'Choose your preferred language',
        type: 'select',
        options: ['English', 'German', 'French', 'Spanish'],
        current: 'English'
      }
    ]
  }
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [settings, setSettings] = useState<Section[]>(sections);

  const handleSettingChange = (sectionId: string, settingId: string, value: any) => {
    setSettings(prevSettings => 
      prevSettings.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            settings: section.settings.map(setting => {
              if (setting.id === settingId) {
                switch (setting.type) {
                  case 'toggle':
                    return { ...setting, current: value as boolean };
                  case 'select':
                    return { ...setting, current: value as string };
                  case 'multi-toggle':
                    return {
                      ...setting,
                      options: setting.options.map(option =>
                        option.id === value ? { ...option, enabled: !option.enabled } : option
                      )
                    };
                  case 'time-range':
                    return {
                      ...setting,
                      current: { ...setting.current, ...value }
                    };
                  default:
                    return setting;
                }
              }
              return setting;
            })
          };
        }
        return section;
      })
    );
  };

  const handleAction = (settingId: string, action: string) => {
    switch (settingId) {
      case 'delete-account':
        setShowDeleteConfirm(true);
        break;
      case 'password':
        setShowPasswordModal(true);
        break;
      // Add more cases as needed
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Navigation Sidebar */}
          <nav className="col-span-12 lg:col-span-3 space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeSection === section.id
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {section.title}
                </button>
              );
            })}
          </nav>

          {/* Main Content */}
          <main className="col-span-12 lg:col-span-9 space-y-6">
            {settings
              .filter((section) => section.id === activeSection)
              .map((section) => (
                <div key={section.id}>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    {section.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {section.description}
                  </p>

                  <div className="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                    {section.settings.map((setting) => (
                      <div key={setting.id} className="p-4 sm:p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                              {setting.title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              {setting.description}
                            </p>

                            {/* Render different types of settings */}
                            {setting.type === 'toggle' && (
                              <button
                                onClick={() => handleSettingChange(section.id, setting.id, !setting.current)}
                                className={`mt-3 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                                  setting.current ? 'bg-primary-600' : 'bg-gray-200'
                                }`}
                              >
                                <span
                                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                                    setting.current ? 'translate-x-5' : 'translate-x-0'
                                  }`}
                                />
                              </button>
                            )}

                            {setting.type === 'multi-toggle' && (
                              <div className="mt-3 space-y-2">
                                {setting.options.map((option) => (
                                  <div key={option.id} className="flex items-center">
                                    <button
                                      onClick={() => handleSettingChange(section.id, setting.id, option.id)}
                                      className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                                        option.enabled ? 'bg-primary-600' : 'bg-gray-200'
                                      } ${option.required ? 'cursor-not-allowed opacity-60' : ''}`}
                                      disabled={option.required}
                                    >
                                      <span
                                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                                          option.enabled ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                      />
                                    </button>
                                    <span className="ml-3 text-sm text-gray-900 dark:text-white">
                                      {option.label}
                                      {option.required && (
                                        <span className="ml-2 text-xs text-gray-500">(Required)</span>
                                      )}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {setting.type === 'select' && (
                              <select
                                className="mt-3 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                                value={setting.current}
                                onChange={(e) => handleSettingChange(section.id, setting.id, e.target.value)}
                              >
                                {setting.options.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            )}

                            {setting.type === 'button' && (
                              <button
                                onClick={() => handleAction(setting.id, setting.action)}
                                className="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                              >
                                {setting.action === 'change' && 'Change'}
                                {setting.action === 'view' && 'View'}
                                {setting.action === 'download' && 'Download'}
                              </button>
                            )}

                            {setting.type === 'time-range' && (
                              <div className="mt-3 flex items-center space-x-2">
                                <input
                                  type="time"
                                  value={setting.current.start}
                                  onChange={(e) => handleSettingChange(section.id, setting.id, { start: e.target.value })}
                                  className="block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                                />
                                <span className="text-gray-500">to</span>
                                <input
                                  type="time"
                                  value={setting.current.end}
                                  onChange={(e) => handleSettingChange(section.id, setting.id, { end: e.target.value })}
                                  className="block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </main>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowDeleteConfirm(false)}>
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Delete Account
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete your account? This action cannot be undone.
                        All of your data will be permanently removed from our servers forever.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    // Handle delete
                    setShowDeleteConfirm(false);
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowPasswordModal(false)}>
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Change Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="current-password"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    // Handle password change
                    setShowPasswordModal(false);
                  }}
                >
                  Change Password
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 