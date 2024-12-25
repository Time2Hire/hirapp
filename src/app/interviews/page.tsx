'use client';

import { useState } from 'react';
import { InterviewCalendar } from '@/components/interviews/interview-calendar';
import { ScheduleInterviewModal } from '@/components/interviews/schedule-interview-modal';
import { Plus, Calendar, FileText } from 'lucide-react';
import Image from 'next/image';

interface Interview {
  id: string;
  talent: {
    name: string;
    role: string;
    matchScore: number;
    skills: string[];
    professionalSkills: string[];
    languages: { language: string; level: string; verified: boolean; }[];
    experience: string;
    availability: string;
    location: string;
    workType: string;
    employmentType: string;
    profileUrl?: string;
  };
  status: 'interview_scheduled' | 'interview_done' | 'interview_requested';
  appliedAt: string;
  interview: {
    scheduledFor: string;
    feedback?: string;
    interviewer: string;
    status: 'completed' | 'scheduled' | 'pending_confirmation';
    proposedSlots?: string[];
    proposedTypes?: Array<
      | { type: 'online'; platform: string; }
      | { type: 'offline'; location: string; }
      | { type: 'phone'; }
    >;
  };
}

interface ScheduleData {
  candidateId: string;
  timeSlots: string[];
  interviewType: {
    type: 'online' | 'offline' | 'phone';
    platform?: string;
    location?: string;
  };
}

// Helper function to create dates properly
const createDate = (daysFromNow: number, hours: number, minutes: number = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
};

// Import applications from jobs page
const applications: Interview[] = [
  {
    id: 'APP1',
    talent: {
      name: 'Artema',
      profileUrl: '/talents/artema',
      role: 'Senior Full Stack Developer',
      matchScore: 92,
      skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Docker'],
      professionalSkills: ['System Design', 'Technical Leadership', 'Mentoring'],
      languages: [
        { language: 'English', level: 'C2', verified: true },
        { language: 'French', level: 'B2', verified: true }
      ],
      experience: '7+ years',
      availability: '1 month notice',
      location: 'Munich, Germany',
      workType: 'Onsite',
      employmentType: 'Full-time',
    },
    status: 'interview_done',
    appliedAt: '2024-02-15',
    interview: {
      scheduledFor: new Date(new Date().setHours(new Date().getHours() - 3)).toISOString(), // Today, 3 hours ago
      feedback: 'Excellent technical skills, great cultural fit. Recommended for next round.',
      interviewer: 'Alex Miller',
      status: 'completed'
    }
  },
  {
    id: 'APP2',
    talent: {
      name: 'Nael',
      profileUrl: '/talents/nael',
      role: 'Senior Frontend Developer',
      matchScore: 88,
      skills: ['React', 'TypeScript', 'AWS', 'Next.js', 'Prisma'],
      professionalSkills: ['Product Thinking', 'Agile Development', 'Team Collaboration'],
      languages: [
        { language: 'English', level: 'C1', verified: true },
        { language: 'German', level: 'B1', verified: true }
      ],
      experience: '4+ years',
      availability: '2 months notice',
      location: 'Hamburg, Germany',
      workType: 'Hybrid',
      employmentType: 'Full-time',
    },
    status: 'interview_scheduled',
    appliedAt: '2024-02-16',
    interview: {
      scheduledFor: createDate(7, new Date().getHours()), // Next week same time
      interviewer: 'Emma Wilson',
      status: 'scheduled'
    }
  },
  {
    id: 'APP3',
    talent: {
      name: 'Talent 1',
      role: 'Backend Developer',
      matchScore: 90,
      skills: ['Python', 'Django', 'PostgreSQL', 'Redis', 'AWS'],
      professionalSkills: ['API Design', 'Database Optimization', 'System Architecture'],
      languages: [
        { language: 'English', level: 'B2', verified: true },
        { language: 'German', level: 'C1', verified: true }
      ],
      experience: '5+ years',
      availability: 'Immediate',
      location: 'Berlin, Germany',
      workType: 'Remote',
      employmentType: 'Full-time',
    },
    status: 'interview_requested',
    appliedAt: '2024-02-17',
    interview: {
      scheduledFor: createDate(7, 14), // Next week, 2 PM
      interviewer: 'Emma Wilson',
      status: 'pending_confirmation',
      proposedSlots: [
        createDate(7, 14),
        createDate(7, 16),
        createDate(8, 10)
      ],
      proposedTypes: [
        { type: 'online', platform: 'zoom' },
        { type: 'offline', location: 'hq' }
      ]
    }
  }
] as const;

// Add business appointments for this week
const businessAppointments = [
  // Today
  {
    id: 'BA1',
    title: 'Daily Standup',
    date: createDate(0, 10),
    duration: 30,
    type: 'business'
  },
  {
    id: 'BA2',
    title: 'Product Review',
    date: createDate(0, 14),
    duration: 60,
    type: 'business'
  },
  // Tomorrow
  {
    id: 'BA3',
    title: 'Team Sync',
    date: createDate(1, 11),
    duration: 45,
    type: 'business'
  },
  {
    id: 'BA4',
    title: 'Client Meeting',
    date: createDate(1, 15, 30),
    duration: 60,
    type: 'business'
  },
  // Day after tomorrow
  {
    id: 'BA5',
    title: 'Sprint Planning',
    date: createDate(2, 10),
    duration: 120,
    type: 'business'
  },
  {
    id: 'BA6',
    title: 'Tech Talk',
    date: createDate(2, 16),
    duration: 45,
    type: 'business'
  },
  // Rest of the week
  {
    id: 'BA7',
    title: 'Board Meeting',
    date: createDate(3, 13),
    duration: 90,
    type: 'business'
  },
  {
    id: 'BA8',
    title: 'Design Review',
    date: createDate(4, 11, 30),
    duration: 60,
    type: 'business'
  },
  {
    id: 'BA9',
    title: 'Team Building',
    date: createDate(4, 15),
    duration: 120,
    type: 'business'
  }
];

const getProfileImage = (name: string): string => {
  const imageMap: Record<string, string> = {
    'Artema': '1',
    'Nael': '2',
    'Talent 1': '3'
  };
  
  return `/images/candidates/${imageMap[name] || 'default'}.png`;
};

export default function InterviewsPage() {
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Interview['talent'] | null>(null);

  const upcomingInterviews = applications.filter(app => 
    app.status === 'interview_scheduled' || app.status === 'interview_requested'
  );
  const pastInterviews = applications.filter(app => app.status === 'interview_done');

  const handleScheduleInterview = (scheduleData: ScheduleData) => {
    console.log('Scheduling interview:', scheduleData);
    setIsScheduleModalOpen(false);
  };

  const handleProfileClick = (talent: Interview['talent'], e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedProfile(talent);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Interviews</h1>
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Schedule Interview
          </button>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-8">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Upcoming Interviews
            </h2>
            <div className="space-y-6">
              {upcomingInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <Image
                      src={getProfileImage(interview.talent.name)}
                      alt={interview.talent.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    {interview.talent.profileUrl ? (
                      <button 
                        onClick={(e) => handleProfileClick(interview.talent, e)}
                        className="text-lg font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {interview.talent.name}
                      </button>
                    ) : (
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {interview.talent.name}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {interview.talent.role}
                    </p>
                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {interview.status === 'interview_requested' ? (
                        <span>Multiple time slots proposed</span>
                      ) : (
                        new Date(interview.interview.scheduledFor).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })
                      )}
                    </div>
                    {interview.status === 'interview_requested' && interview.interview.proposedSlots && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Proposed Time Slots:
                        </p>
                        <div className="space-y-1">
                          {interview.interview.proposedSlots.map((slot: string, index: number) => (
                            <div key={index} className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(slot).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </div>
                          ))}
                        </div>
                        {interview.interview.proposedTypes && (
                          <>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">
                              Interview Options:
                            </p>
                            <div className="space-y-1">
                              {interview.interview.proposedTypes.map((type, index) => (
                                <div key={index} className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                                  {type.type === 'online' ? `${type.type} (${type.platform})` : 
                                   type.type === 'offline' ? `${type.type} (${type.location === 'hq' ? 'Startup HQ' : 'Alternative Address'})` :
                                   type.type}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Past Interviews */}
        {pastInterviews.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Past Interviews
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              {pastInterviews.map((app) => (
                <div key={app.id} className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={getProfileImage(app.talent.name)}
                        alt={app.talent.name}
                        width={64}
                        height={64}
                        className="rounded-full"
                        priority
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        {app.talent.profileUrl ? (
                          <button 
                            onClick={(e) => handleProfileClick(app.talent, e)}
                            className="text-lg font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                          >
                            {app.talent.name}
                          </button>
                        ) : (
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {app.talent.name}
                          </h3>
                        )}
                        <button
                          onClick={() => setSelectedInterview(app)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          View Feedback
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {app.talent.role}
                      </p>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(app.interview.scheduledFor).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calendar Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Calendar Overview
          </h2>
          <InterviewCalendar
            interviews={[...upcomingInterviews, ...pastInterviews] as Interview[]}
            businessAppointments={businessAppointments.map(appt => ({
              ...appt,
              type: 'business' as const
            }))}
          />
        </div>

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
                              src={getProfileImage(selectedInterview.talent.name)}
                              alt={selectedInterview.talent.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                              priority
                            />
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {selectedInterview.talent.name}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Feedback</p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {selectedInterview.interview.feedback}
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

        {/* Profile Modal */}
        {selectedProfile && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" onClick={() => setSelectedProfile(null)}>
                <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
              </div>

              <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <div className="flex items-center space-x-4 mb-4">
                        <Image
                          src={getProfileImage(selectedProfile.name)}
                          alt={selectedProfile.name}
                          width={64}
                          height={64}
                          className="rounded-full"
                          priority
                        />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {selectedProfile.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {selectedProfile.role}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Match Score</h4>
                          <p className="text-sm text-gray-900 dark:text-white">{selectedProfile.matchScore}%</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Technical Skills</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {selectedProfile.skills.map((skill) => (
                              <span key={skill} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Professional Skills</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {selectedProfile.professionalSkills.map((skill) => (
                              <span key={skill} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Languages</h4>
                          <div className="space-y-1 mt-1">
                            {selectedProfile.languages.map((lang) => (
                              <div key={lang.language} className="flex items-center text-sm">
                                <span className="text-gray-900 dark:text-white">{lang.language}</span>
                                <span className="mx-2 text-gray-400">•</span>
                                <span className="text-gray-600 dark:text-gray-400">{lang.level}</span>
                                {lang.verified && (
                                  <span className="ml-2 text-xs text-green-600 dark:text-green-400">✓ Verified</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience</h4>
                            <p className="text-sm text-gray-900 dark:text-white">{selectedProfile.experience}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Availability</h4>
                            <p className="text-sm text-gray-900 dark:text-white">{selectedProfile.availability}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Work Type</h4>
                            <p className="text-sm text-gray-900 dark:text-white">{selectedProfile.workType}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</h4>
                            <p className="text-sm text-gray-900 dark:text-white">{selectedProfile.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={() => setSelectedProfile(null)}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Interview Modal */}
        <ScheduleInterviewModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          onSchedule={handleScheduleInterview}
        />
      </div>
    </div>
  );
} 