'use client';

import { useState } from 'react';
import Link from 'next/link';
import { JobAd } from '@/app/types';
import { MoreVertical, Trash2, CheckCircle, XCircle, Plus, Sparkles } from 'lucide-react';

const dummyJobs: JobAd[] = [
  {
    id: 1,
    status: 'published',
    title: 'Senior Full Stack Developer',
    company: {
      name: '',
      logo: '',
      description: 'Innovative startup in the heart of Berlin',
      headquarters: 'Berlin',
      founded: '2020',
      employees: '10-50',
      industry: 'Software Development',
    },
    location: {
      city: 'Berlin',
      state: 'Berlin',
      country: 'Germany',
    },
    type: 'Full-time',
    workType: 'Remote',
    level: 'Senior',
    compensation: {
      salary: '65,000-85,000',
      currency: 'EUR',
      interval: 'yearly',
      vsop: true,
      vsopDetails: '0.5-1% equity',
    },
    requirements: {
      skills: [
        'React', 
        'Node.js', 
        'TypeScript', 
        'AWS',
        'Team Leadership',
        'Agile Project Management',
        'Cross-functional Collaboration',
        'Technical Mentoring',
        'Problem Solving',
        'Communication'
      ],
      experience: 5,
      languages: [
        { language: 'English', level: 'C1' },
        { language: 'German', level: 'B2' },
      ],
    },
    tasks: [
      'Lead the development of our core product features',
      'Mentor junior developers and conduct code reviews',
      'Design and implement scalable backend services'
    ],
    postedAt: '2023-12-15',
    applicants: 12,
    skillMatch: 85,
  },
  {
    id: 2,
    status: 'draft',
    title: 'Product Manager',
    company: {
      name: '',
      logo: '',
      description: 'Innovative startup in the heart of Berlin',
      headquarters: 'Berlin',
      founded: '2020',
      employees: '10-50',
      industry: 'Software Development',
    },
    location: {
      city: 'Berlin',
      state: 'Berlin',
      country: 'Germany',
    },
    type: 'Full-time',
    workType: 'Hybrid',
    level: 'Middle',
    compensation: {
      salary: '55,000-70,000',
      currency: 'EUR',
      interval: 'yearly',
      vsop: true,
      vsopDetails: '0.3-0.7% equity',
    },
    requirements: {
      skills: [
        'Product Analytics',
        'Data Analysis',
        'Jira',
        'Figma',
        'Product Strategy',
        'Stakeholder Management',
        'User Research',
        'Roadmap Planning',
        'Team Coordination',
        'Strategic Thinking'
      ],
      experience: 3,
      languages: [
        { language: 'English', level: 'C1' },
      ],
    },
    tasks: [
      'Define and execute product strategy',
      'Work closely with engineering and design teams',
      'Analyze user feedback and market trends'
    ],
    postedAt: '2023-12-20',
    applicants: 0,
    skillMatch: 0,
  },
  {
    id: 3,
    status: 'closed',
    title: 'UI/UX Designer',
    company: {
      name: '',
      logo: '',
      description: 'Innovative startup in the heart of Berlin',
      headquarters: 'Berlin',
      founded: '2020',
      employees: '10-50',
      industry: 'Software Development',
    },
    location: {
      city: 'Berlin',
      state: 'Berlin',
      country: 'Germany',
    },
    type: 'Full-time',
    workType: 'Remote',
    level: 'Middle',
    compensation: {
      salary: '45,000-60,000',
      currency: 'EUR',
      interval: 'yearly',
      vsop: true,
      vsopDetails: '0.2-0.5% equity',
    },
    requirements: {
      skills: [
        'Figma',
        'Adobe Creative Suite',
        'Prototyping',
        'Design Systems',
        'Design Thinking',
        'User Research',
        'Visual Communication',
        'Design Documentation',
        'Workshop Facilitation',
        'Iterative Design'
      ],
      experience: 3,
      languages: [
        { language: 'English', level: 'B2' },
      ],
    },
    tasks: [
      'Create intuitive user interfaces and experiences',
      'Develop and maintain our design system',
      'Conduct user research and usability testing'
    ],
    postedAt: '2023-11-01',
    applicants: 24,
    skillMatch: 92,
  },
];

// Helper function to get emoji for work type
const getWorkTypeEmoji = (workType: string) => {
  switch (workType.toLowerCase()) {
    case 'remote':
      return '🏠';
    case 'hybrid':
      return '🏢↔️🏠';
    case 'onsite':
      return '🏢';
    default:
      return '🏢';
  }
};

// Helper function to get emoji for employment type
const getEmploymentTypeEmoji = (type: string) => {
  switch (type.toLowerCase()) {
    case 'full-time':
      return '⏰';
    case 'part-time':
      return '🕐';
    case 'contract':
      return '📄';
    default:
      return '⏰';
  }
};

export default function JobsPage() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const handleStatusChange = (jobId: number, newStatus: string) => {
    // In a real app, this would update the status in the database
    console.log(`Changing status of job ${jobId} to ${newStatus}`);
    setOpenMenuId(null);
  };

  const handleDelete = (jobId: number, applicants: number) => {
    if (applicants > 0) {
      alert('Cannot delete a job with active applications');
      return;
    }
    // In a real app, this would delete the job from the database
    console.log(`Deleting job ${jobId}`);
    setOpenMenuId(null);
  };

  // Close menu when clicking outside
  const handleClickOutside = () => {
    if (openMenuId !== null) {
      setOpenMenuId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" onClick={handleClickOutside}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Job Ads</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage and track your job postings
            </p>
          </div>
          <div className="flex space-x-3">
            <Link
              href="/jobs/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Job
            </Link>
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Job Coach
            </button>
          </div>
        </div>

        {/* Job List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dummyJobs.map((job) => (
            <div
              key={job.id}
              className="relative bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
            >
              <Link href={`/jobs/${job.id}`} className="block">
                <div className="p-6 flex flex-col h-full">
                  {/* Job Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {job.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          job.status === 'published'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : job.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        }`}
                      >
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                      <div className="relative" onClick={(e) => e.preventDefault()}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === job.id ? null : job.id);
                          }}
                          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </button>

                        {/* Dropdown menu */}
                        {openMenuId === job.id && (
                          <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                            <div className="py-1" onClick={(e) => e.stopPropagation()}>
                              {job.status === 'draft' && (
                                <button
                                  onClick={() => handleStatusChange(job.id, 'published')}
                                  className="flex items-center w-full px-4 py-2 text-sm text-green-700 dark:text-green-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Publish
                                </button>
                              )}
                              {job.status === 'published' && (
                                <button
                                  onClick={() => handleStatusChange(job.id, 'closed')}
                                  className="flex items-center w-full px-4 py-2 text-sm text-yellow-700 dark:text-yellow-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Close
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(job.id, job.applicants)}
                                className={`flex items-center w-full px-4 py-2 text-sm ${
                                  job.applicants > 0
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-red-700 dark:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                                disabled={job.applicants > 0}
                                title={job.applicants > 0 ? 'Cannot delete - has applications' : ''}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="flex-1 space-y-4 mt-4">
                    {/* Employment Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        {getEmploymentTypeEmoji(job.type)} {job.type}
                      </span>
                      <span className="flex items-center">
                        {getWorkTypeEmoji(job.workType)} {job.workType}
                      </span>
                      <span className="flex items-center">
                        📍 {job.location.city}
                      </span>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.requirements.skills.length > 4 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                          +{job.requirements.skills.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Languages */}
                    {job.requirements.languages && job.requirements.languages.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.languages.map((lang) => (
                          <span
                            key={lang.language}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          >
                            {lang.language} ({lang.level})
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Stats - Always show the line, conditionally show content */}
                  <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                    {job.status === 'published' && job.applicants > 0 ? (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          {job.applicants} applicants
                        </span>
                        <span className="text-primary-600 dark:text-primary-400 font-medium">
                          {job.skillMatch}% match
                        </span>
                      </div>
                    ) : (
                      <div className="h-4" />
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 