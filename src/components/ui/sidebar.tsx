'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  CalendarIcon,
  Building2,
  Settings,
  HelpCircle,
  BellIcon,
  Moon,
  Sun,
  Menu,
  X,
  LogOut,
  PlusCircle,
  ChevronDown
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'job' | 'talent' | 'interview' | 'system';
}

const dummyNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Match',
    message: 'New candidate matches your Full Stack Developer position',
    time: '5 minutes ago',
    read: false,
    type: 'talent'
  },
  {
    id: '2',
    title: 'Interview Scheduled',
    message: 'Interview with Sarah Chen confirmed for tomorrow at 2 PM',
    time: '1 hour ago',
    read: false,
    type: 'interview'
  },
  {
    id: '3',
    title: 'Job Post Update',
    message: 'Your job post "Senior Frontend Developer" is expiring soon',
    time: '2 hours ago',
    read: true,
    type: 'job'
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/jobs', label: 'Jobs', icon: Briefcase },
    { href: '/interviews', label: 'Interviews', icon: CalendarIcon },
    { href: '/company', label: 'Company Profile', icon: Building2 },
  ];

  const bottomMenuItems = [
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/help', label: 'Help Center', icon: HelpCircle },
  ];

  interface Account {
    id: string;
    name: string;
    email: string;
    avatar: string;
  }

  const accounts: Account[] = [
    {
      id: '1',
      name: 'Fabian Bruns',
      email: 'fabian@fount.one',
      avatar: '/images/avatar.png'
    },
    {
      id: '2',
      name: 'Fabian Bruns',
      email: 'fabian@curiousowl.de',
      avatar: '/images/avatar.png'
    }
  ];

  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);

  const handleAccountClick = (account: Account) => {
    setSelectedAccount(account);
    setShowAccountMenu(false);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/images/logo_light_mode.png"
            alt="Fount Logo"
            width={120}
            height={40}
            className="dark:hidden"
          />
          <Image
            src="/images/logo_dark_mode.png"
            alt="Fount Logo"
            width={120}
            height={40}
            className="hidden dark:block"
          />
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2 rounded-lg ${
                pathname === item.href
                  ? 'bg-primary-50 text-primary-500 dark:bg-primary-900 dark:text-primary-100'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Notifications */}
      <div className="relative px-4 py-2">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="flex items-center px-4 py-2 w-full rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <BellIcon className="w-5 h-5 mr-3" />
          Notifications
          {unreadCount > 0 && (
            <span className="ml-auto bg-primary-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-primary-500 hover:text-primary-600"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg cursor-pointer ${
                      notification.read
                        ? 'bg-gray-50 dark:bg-gray-700'
                        : 'bg-primary-50 dark:bg-primary-900'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {notification.title}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {notification.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-2">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
        
        <button
          onClick={toggleTheme}
          className="flex items-center px-4 py-2 w-full rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 mr-3" />
          ) : (
            <Moon className="w-5 h-5 mr-3" />
          )}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* User Profile with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            <Image
              src={selectedAccount.avatar}
              alt="User avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {selectedAccount.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {selectedAccount.email}
              </p>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showAccountMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Account Dropdown Menu */}
          {showAccountMenu && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-2 space-y-1">
                {accounts.map((account) => (
                  <button
                    key={account.id}
                    onClick={() => handleAccountClick(account)}
                    className={`flex items-center gap-3 px-3 py-2 w-full rounded-md ${
                      selectedAccount.id === account.id
                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Image
                      src={account.avatar}
                      alt={`${account.name}'s avatar`}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {account.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {account.email}
                      </p>
                    </div>
                  </button>
                ))}
                
                <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                
                <button
                  onClick={() => console.log('Add account')}
                  className="flex items-center gap-2 px-3 py-2 w-full rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span className="text-sm">Add another account</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 w-full rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-6 left-4 z-50 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isMobile
            ? `fixed inset-y-0 left-0 z-50 w-64 transform ${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
              } transition-transform duration-300 ease-in-out`
            : 'fixed inset-y-0 left-0 w-64'
        } flex flex-col h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}
      >
        {sidebarContent}
      </div>
    </>
  );
} 