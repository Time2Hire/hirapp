'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Video, Phone, Users, FileText, Check, X, Clock } from 'lucide-react';

interface InterviewListProps {
  type: 'upcoming' | 'past';
}

const interviews = [
  {
    id: 1,
    candidate: {
      name: 'Anna Müller',
      role: 'Software Developer BI',
      avatar: '/images/avatar.png',
      company: 'Continental VVA'
    },
    date: '2024-01-02',
    time: '15:00',
    duration: 60,
    type: 'teams',
    stage: '1st Interview',
    status: 'completed',
    feedback: 'Excellent technical skills and great cultural fit.',
    participants: [
      { name: 'Line Manager', avatar: '/images/avatar.png' },
      { name: 'Dine Danger', avatar: '/images/avatar.png' },
      { name: 'Fine Munger', avatar: '/images/avatar.png' }
    ]
  },
  {
    id: 2,
    candidate: {
      name: 'Mehmet Korbasi',
      role: 'Software Developer BI',
      avatar: '/images/avatar.png',
      company: 'MS TEAMS'
    },
    date: '2024-01-02',
    time: '15:00',
    duration: 60,
    type: 'teams',
    stage: 'Technical Interview',
    status: 'scheduled',
    participants: [
      { name: 'Line Manager', avatar: '/images/avatar.png' }
    ]
  },
  {
    id: 3,
    candidate: {
      name: 'Joyce Meyers',
      role: 'Software Developer BI',
      avatar: '/images/avatar.png',
      company: 'MS TEAMS'
    },
    date: '2024-01-22',
    time: '15:00',
    duration: 60,
    type: 'teams',
    stage: 'Final Interview',
    status: 'pending',
    participants: [
      { name: 'Line Manager', avatar: '/images/avatar.png' }
    ]
  }
];

export function InterviewList({ type }: InterviewListProps) {
  const [selectedInterview, setSelectedInterview] = useState<any>(null);

  const filteredInterviews = interviews.filter(interview => {
    const interviewDate = new Date(interview.date);
    const today = new Date();
    return type === 'past' ? interviewDate < today : interviewDate >= today;
  });

  const getInterviewTypeIcon = (type: string) => {
    switch (type) {
      case 'teams':
        return <Video className="w-4 h-4 text-blue-500" />;
      case 'phone':
        return <Phone className="w-4 h-4 text-gray-500" />;
      case 'in-person':
        return <Users className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Check className="w-3 h-3 mr-1" />
            Completed
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <Clock className="w-3 h-3 mr-1" />
            Scheduled
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <X className="w-3 h-3 mr-1" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {filteredInterviews.map((interview) => (
          <li
            key={interview.id}
            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ease-in-out"
          >
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src={interview.candidate.avatar}
                    alt={interview.candidate.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {interview.candidate.name}
                    </p>
                    <div className="flex items-center mt-1">
                      {getInterviewTypeIcon(interview.type)}
                      <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                        {interview.candidate.company}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {getStatusBadge(interview.status)}
                  {type === 'past' && interview.status === 'completed' && (
                    <button
                      onClick={() => setSelectedInterview(interview)}
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <FileText className="w-4 h-4 mr-1" />
                      View Feedback
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Stage</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {interview.stage}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Date & Time</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(interview.date).toLocaleDateString()} at {interview.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex -space-x-2">
                    {interview.participants.map((participant: any, index: number) => (
                      <Image
                        key={index}
                        src={participant.avatar}
                        alt={participant.name}
                        width={32}
                        height={32}
                        className="rounded-full ring-2 ring-white dark:ring-gray-800"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Feedback Modal */}
      {selectedInterview && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setSelectedInterview(null)}>
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Interview Feedback
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Candidate</p>
                        <div className="flex items-center mt-1 space-x-3">
                          <Image
                            src={selectedInterview.candidate.avatar}
                            alt={selectedInterview.candidate.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {selectedInterview.candidate.name}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Feedback</p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {selectedInterview.feedback}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setSelectedInterview(null)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 