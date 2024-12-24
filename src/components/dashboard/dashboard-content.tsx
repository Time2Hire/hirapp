'use client';

import Link from 'next/link';
import { ArrowRight, Briefcase, Calendar, UserX, Play, ChartBar } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  applications: number;
  interviews: number;
  rejections: number;
}

interface Activity {
  id: string;
  type: 'application' | 'interview' | 'interview_accepted' | 'interview_rejected';
  jobId: string;
  jobTitle: string;
  candidate: {
    name: string;
  };
  time: string;
}

const getActivityEmoji = (type: Activity['type']): string => {
  switch (type) {
    case 'application':
      return '📝';
    case 'interview':
      return '🗓️';
    case 'interview_accepted':
      return '✅';
    case 'interview_rejected':
      return '❌';
    default:
      return '📋';
  }
};

const recentActivities: Activity[] = [
  {
    id: '1',
    type: 'application',
    jobId: 'JOB-123',
    jobTitle: 'Senior Full Stack Developer',
    candidate: {
      name: 'Sarah Chen'
    },
    time: '2 hours ago'
  },
  {
    id: '2',
    type: 'interview_accepted',
    jobId: 'JOB-124',
    jobTitle: 'Frontend Developer',
    candidate: {
      name: 'Michael Brown'
    },
    time: '3 hours ago'
  },
  {
    id: '3',
    type: 'interview',
    jobId: 'JOB-125',
    jobTitle: 'Backend Developer',
    candidate: {
      name: 'Emma Wilson'
    },
    time: '1 hour ago'
  }
];

const currentJobs: Job[] = [
  {
    id: 'JOB-123',
    title: 'Senior Full Stack Developer',
    applications: 8,
    interviews: 3,
    rejections: 2
  },
  {
    id: 'JOB-124',
    title: 'Frontend Developer',
    applications: 12,
    interviews: 4,
    rejections: 5
  },
  {
    id: 'JOB-125',
    title: 'Backend Developer',
    applications: 6,
    interviews: 2,
    rejections: 1
  }
];

export function DashboardContent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Hello Fabian 👋
          </h1>
        </div>

        {/* Recent Activities */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activities</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentActivities.map((activity) => (
                <Link
                  key={activity.id}
                  href={`/jobs/${activity.jobId}${activity.type === 'application' ? '?tab=applications' : '?tab=interviews'}`}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-50 dark:bg-primary-900 rounded-full flex items-center justify-center text-xl">
                    {getActivityEmoji(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.type === 'application' && 'New application from '}
                      {activity.type === 'interview' && 'Interview scheduled with '}
                      {activity.type === 'interview_accepted' && 'Interview accepted by '}
                      {activity.type === 'interview_rejected' && 'Interview declined by '}
                      <span className="font-semibold">{activity.candidate.name}</span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      for {activity.jobTitle}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {activity.time}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* New Resources */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">New Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    New Podcast Episode
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Why skill-based hiring is revolutionizing recruitment
                  </p>
                  <button className="mt-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                    Listen now →
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <ChartBar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Coming Soon: Workforce Analytics
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Analyze your team's skills and make data-driven hiring decisions
                  </p>
                  <button className="mt-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                    Join waitlist →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-8">
          <div className="bg-primary-600 dark:bg-primary-900 rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8 md:px-8 md:py-12">
              <h2 className="text-2xl font-bold text-white mb-2">
                Find your best fit employee!
              </h2>
              <p className="text-primary-100 mb-6">
                Create a job posting and let our AI match you with the perfect candidates.
              </p>
              <Link
                href="/jobs/create"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Create Job Posting
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Current Jobs */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Current Jobs</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {job.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.applications} applications</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{job.interviews} interviews</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UserX className="w-4 h-4" />
                        <span>{job.rejections} rejections</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 