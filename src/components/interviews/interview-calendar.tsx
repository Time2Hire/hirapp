'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Interview {
  id: string;
  talent: {
    name: string;
    role: string;
  };
  status: 'interview_scheduled' | 'interview_done' | 'interview_requested';
  interview: {
    scheduledFor: string;
    status: string;
    proposedSlots?: string[];
  };
}

interface BusinessAppointment {
  id: string;
  title: string;
  date: string;
  duration: number;
  type: 'business';
}

interface InterviewCalendarProps {
  interviews: Interview[];
  businessAppointments: BusinessAppointment[];
}

export function InterviewCalendar({ interviews, businessAppointments }: InterviewCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForDate = (date: Date) => {
    const events = [
      ...interviews.map(interview => ({
        ...interview,
        date: new Date(interview.interview.scheduledFor),
        type: 'interview' as const
      })),
      ...businessAppointments.map(appointment => ({
        ...appointment,
        date: new Date(appointment.date),
        type: 'business' as const
      }))
    ];

    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Adjust first day to start from Monday (1) instead of Sunday (0)
    const firstWeekday = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Add empty cells for days before the first day of the month (only for weekdays)
    for (let i = 0; i < firstWeekday; i++) {
      days.push(<div key={`empty-${i}`} className="h-32 border border-gray-200 dark:border-gray-700" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayOfWeek = date.getDay();
      
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;

      const events = getEventsForDate(date);
      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          className={`h-32 border border-gray-200 dark:border-gray-700 p-2 ${
            isToday ? 'bg-primary-50 dark:bg-primary-900' : ''
          }`}
        >
          <div className="font-medium text-sm mb-1">
            {day}
          </div>
          <div className="space-y-1 overflow-y-auto max-h-24">
            {events.map((event, index) => {
              if (event.type === 'interview') {
                const interview = event as typeof event & { talent: { name: string } };
                return (
                  <div
                    key={`${event.id}-${index}`}
                    className={`text-xs p-1 rounded-md flex items-center space-x-1 ${
                      interview.status === 'interview_requested'
                        ? 'border border-dashed border-primary-500 text-primary-700 dark:text-primary-400'
                        : interview.status === 'interview_done'
                        ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        : 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    }`}
                  >
                    <Image
                      src={`/images/candidates/${
                        interview.talent.name === 'Nael' 
                          ? '2' 
                          : interview.talent.name === 'Artema'
                          ? '1'
                          : '3'
                      }.png`}
                      alt={interview.talent.name}
                      width={16}
                      height={16}
                      className="rounded-full"
                    />
                    <span>{interview.talent.name}</span>
                  </div>
                );
              } else {
                return (
                  <div
                    key={`${event.id}-${index}`}
                    className="text-xs p-1 rounded-md bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 opacity-60"
                  >
                    {event.title}
                  </div>
                );
              }
            })}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Calendar Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            <ChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Weekday headers */}
        <div className="grid grid-cols-5 gap-px mb-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
            <div key={day} className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-5 gap-px">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm bg-primary-100 dark:bg-primary-900 mr-1"></div>
            <span className="text-gray-600 dark:text-gray-400">Scheduled Interview</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm border border-dashed border-primary-500 mr-1"></div>
            <span className="text-gray-600 dark:text-gray-400">Requested Interview</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-700 mr-1"></div>
            <span className="text-gray-600 dark:text-gray-400">Past Interview</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-700 opacity-60 mr-1"></div>
            <span className="text-gray-600 dark:text-gray-400">Business Appointment</span>
          </div>
        </div>
      </div>
    </div>
  );
} 