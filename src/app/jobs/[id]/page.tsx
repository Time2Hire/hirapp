'use client';

import { useState, useRef } from 'react';
import { Briefcase, Users, ClipboardList, Building2, Gift, Pencil, Sparkles, Calendar } from 'lucide-react';
import Image from 'next/image';
import Chart from 'chart.js/auto';
import { ScheduleInterviewModal } from '@/components/interviews/schedule-interview-modal';

interface TalentProfile {
  id: string;
  name: string;
  matchScore: number;
  skills: string[];
  professionalSkills: string[];
  languages: { language: string; level: string; verified?: boolean }[];
  experience: string;
  availability: string;
  location: string;
  workType: string;
  employmentType: string;
  latestExperience: {
    position: string;
    company: string;
    industry: string;
    duration: string;
    skills: string[];
    professionalSkills: string[];
  };
  allExperiences: Array<{
    position: string;
    company: string;
    industry: string;
    duration: string;
    skills: string[];
    professionalSkills: string[];
  }>;
  personality: {
    strengths: string[];
    weaknesses: string[];
    type: string;
  };
  skillRatings: {
    software: Array<{ name: string; rating: number }>;
    professional: Array<{ name: string; rating: number }>;
  };
}

const dummyTalents: TalentProfile[] = [
  {
    id: 'T1',
    name: 'Talent One',
    matchScore: 85,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    professionalSkills: ['Team Leadership', 'Agile Project Management', 'Technical Mentoring'],
    languages: [
      { language: 'English', level: 'C1', verified: true },
      { language: 'German', level: 'Native', verified: false }
    ],
    experience: '5+ years',
    availability: 'Immediately',
    location: 'Berlin, Germany',
    workType: 'Remote',
    employmentType: 'Full-time',
    latestExperience: {
      position: 'Senior Full Stack Developer',
      company: 'Tech Company',
      industry: 'Automotive',
      duration: '3 years',
      skills: ['React', 'TypeScript', 'Node.js'],
      professionalSkills: ['Team Leadership', 'Agile Project Management']
    },
    allExperiences: [
      {
        position: 'Senior Full Stack Developer',
        company: 'Tech Company',
        industry: 'Automotive',
        duration: '3 years',
        skills: ['React', 'TypeScript', 'Node.js'],
        professionalSkills: ['Team Leadership', 'Agile Project Management']
      },
      {
        position: 'Full Stack Developer',
        company: 'Digital Agency',
        industry: 'E-commerce',
        duration: '2 years',
        skills: ['React', 'JavaScript', 'Python'],
        professionalSkills: ['Problem Solving', 'Communication']
      }
    ],
    personality: {
      strengths: ['Analytical thinking', 'Problem solving', 'Team collaboration'],
      weaknesses: ['Public speaking', 'Time management'],
      type: 'Logical and systematic'
    },
    skillRatings: {
      software: [
        { name: 'React', rating: 90 },
        { name: 'TypeScript', rating: 85 },
        { name: 'Node.js', rating: 80 },
        { name: 'GraphQL', rating: 75 },
        { name: 'AWS', rating: 70 }
      ],
      professional: [
        { name: 'Team Leadership', rating: 85 },
        { name: 'Agile Project Management', rating: 90 },
        { name: 'Technical Mentoring', rating: 80 },
        { name: 'Problem Solving', rating: 85 },
        { name: 'Communication', rating: 75 }
      ]
    }
  },
  {
    id: 'T2',
    name: 'Talent Two',
    matchScore: 78,
    skills: ['Vue.js', 'JavaScript', 'Python', 'Django', 'PostgreSQL'],
    professionalSkills: ['Problem Solving', 'Communication', 'Cross-functional Collaboration'],
    languages: [
      { language: 'English', level: 'B2', verified: true },
      { language: 'Spanish', level: 'Native', verified: false }
    ],
    experience: '3+ years',
    availability: '3 months notice',
    location: 'Madrid, Spain',
    workType: 'Hybrid',
    employmentType: 'Full-time',
    latestExperience: {
      position: 'Full Stack Developer',
      company: 'Tech Solutions',
      industry: 'FinTech',
      duration: '2 years',
      skills: ['Vue.js', 'JavaScript', 'Python'],
      professionalSkills: ['Problem Solving', 'Communication']
    },
    allExperiences: [
      {
        position: 'Full Stack Developer',
        company: 'Tech Solutions',
        industry: 'FinTech',
        duration: '2 years',
        skills: ['Vue.js', 'JavaScript', 'Python'],
        professionalSkills: ['Problem Solving', 'Communication']
      },
      {
        position: 'Frontend Developer',
        company: 'Web Studio',
        industry: 'Digital Agency',
        duration: '1 year',
        skills: ['Vue.js', 'JavaScript', 'CSS'],
        professionalSkills: ['UI Development', 'Team Collaboration']
      }
    ],
    personality: {
      strengths: ['Creative thinking', 'Adaptability', 'Fast learner'],
      weaknesses: ['Perfectionism', 'Work-life balance'],
      type: 'Creative and innovative'
    },
    skillRatings: {
      software: [
        { name: 'Vue.js', rating: 85 },
        { name: 'JavaScript', rating: 90 },
        { name: 'Python', rating: 75 },
        { name: 'Django', rating: 70 },
        { name: 'PostgreSQL', rating: 65 }
      ],
      professional: [
        { name: 'Problem Solving', rating: 85 },
        { name: 'Communication', rating: 80 },
        { name: 'Cross-functional Collaboration', rating: 85 },
        { name: 'UI Development', rating: 75 },
        { name: 'Team Collaboration', rating: 80 }
      ]
    }
  },
  {
    id: 'T3',
    name: 'Talent Three',
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
    latestExperience: {
      position: 'Lead Developer',
      company: 'Innovation Labs',
      industry: 'Healthcare',
      duration: '4 years',
      skills: ['React', 'TypeScript', 'Node.js'],
      professionalSkills: ['System Design', 'Technical Leadership']
    },
    allExperiences: [
      {
        position: 'Lead Developer',
        company: 'Innovation Labs',
        industry: 'Healthcare',
        duration: '4 years',
        skills: ['React', 'TypeScript', 'Node.js'],
        professionalSkills: ['System Design', 'Technical Leadership']
      },
      {
        position: 'Senior Developer',
        company: 'Tech Corp',
        industry: 'Enterprise Software',
        duration: '3 years',
        skills: ['React', 'JavaScript', 'Java'],
        professionalSkills: ['Mentoring', 'Architecture Design']
      }
    ],
    personality: {
      strengths: ['Strategic thinking', 'Leadership', 'Technical excellence'],
      weaknesses: ['Delegation', 'Detail orientation'],
      type: 'Strategic and visionary'
    },
    skillRatings: {
      software: [
        { name: 'React', rating: 95 },
        { name: 'TypeScript', rating: 90 },
        { name: 'Node.js', rating: 85 },
        { name: 'MongoDB', rating: 80 },
        { name: 'Docker', rating: 75 }
      ],
      professional: [
        { name: 'System Design', rating: 90 },
        { name: 'Technical Leadership', rating: 85 },
        { name: 'Mentoring', rating: 90 },
        { name: 'Architecture Design', rating: 85 },
        { name: 'Team Management', rating: 80 }
      ]
    }
  },
  {
    id: 'T4',
    name: 'Talent Four',
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
    employmentType: 'Part-time',
    latestExperience: {
      position: 'Senior Frontend Developer',
      company: 'Product House',
      industry: 'SaaS',
      duration: '2.5 years',
      skills: ['React', 'TypeScript', 'Next.js'],
      professionalSkills: ['Product Thinking', 'Agile Development']
    },
    allExperiences: [
      {
        position: 'Senior Frontend Developer',
        company: 'Product House',
        industry: 'SaaS',
        duration: '2.5 years',
        skills: ['React', 'TypeScript', 'Next.js'],
        professionalSkills: ['Product Thinking', 'Agile Development']
      },
      {
        position: 'Frontend Developer',
        company: 'Digital Solutions',
        industry: 'Consulting',
        duration: '1.5 years',
        skills: ['React', 'JavaScript', 'Redux'],
        professionalSkills: ['Team Collaboration', 'Code Review']
      }
    ],
    personality: {
      strengths: ['User-focused', 'Detail-oriented', 'Collaborative'],
      weaknesses: ['Strategic planning', 'Conflict resolution'],
      type: 'Creative and detail-oriented'
    },
    skillRatings: {
      software: [
        { name: 'React', rating: 90 },
        { name: 'TypeScript', rating: 85 },
        { name: 'Next.js', rating: 80 },
        { name: 'AWS', rating: 70 },
        { name: 'Prisma', rating: 75 }
      ],
      professional: [
        { name: 'Product Thinking', rating: 85 },
        { name: 'Agile Development', rating: 80 },
        { name: 'Team Collaboration', rating: 90 },
        { name: 'Code Review', rating: 85 },
        { name: 'Documentation', rating: 75 }
      ]
    }
  }
];

// Add new interfaces for application-specific data
interface Application {
  id: string;
  talent: TalentProfile;
  status: 'new' | 'interview_scheduled' | 'interview_done' | 'rejected';
  appliedAt: string;
  documents: {
    type: string;
    name: string;
    uploadedAt: string;
  }[];
  assessments?: {
    type: string;
    score: number;
    completedAt: string;
    details: string;
  }[];
  interviews?: {
    scheduledFor?: string;
    feedback?: string;
    interviewer?: string;
    status: 'scheduled' | 'completed' | 'cancelled';
  }[];
}

const dummyApplications: Application[] = [
  {
    id: 'APP1',
    talent: {
      ...dummyTalents[2], // Using T3 as base
      name: 'Artema Rymarchuck',
    },
    status: 'interview_done',
    appliedAt: '2024-02-15',
    documents: [
      { type: 'CV', name: 'Artema_Rymarchuck_CV.pdf', uploadedAt: '2024-02-15' },
      { type: 'Cover Letter', name: 'Artema_Rymarchuck_Cover.pdf', uploadedAt: '2024-02-15' },
      { type: 'Portfolio', name: 'artema_portfolio.pdf', uploadedAt: '2024-02-15' }
    ],
    assessments: [
      {
        type: 'Technical Assessment',
        score: 92,
        completedAt: '2024-02-18',
        details: 'Excellent problem-solving skills, strong understanding of system design'
      },
      {
        type: 'Cultural Fit',
        score: 95,
        completedAt: '2024-02-19',
        details: 'Great team player, shows strong leadership potential'
      }
    ],
    interviews: [
      {
        scheduledFor: '2024-02-20',
        feedback: 'Excellent technical skills, great cultural fit. Recommended for next round.',
        interviewer: 'Alex Miller',
        status: 'completed'
      }
    ]
  },
  {
    id: 'APP2',
    talent: {
      ...dummyTalents[3], // Using T4 as base
      name: 'Nael Bruns',
    },
    status: 'interview_scheduled',
    appliedAt: '2024-02-16',
    documents: [
      { type: 'CV', name: 'Nael_Bruns_CV.pdf', uploadedAt: '2024-02-16' },
      { type: 'Cover Letter', name: 'Nael_Bruns_Cover.pdf', uploadedAt: '2024-02-16' }
    ],
    assessments: [
      {
        type: 'Technical Assessment',
        score: 88,
        completedAt: '2024-02-19',
        details: 'Strong frontend skills, good understanding of modern frameworks'
      }
    ],
    interviews: [
      {
        scheduledFor: '2024-02-23',
        interviewer: 'Emma Wilson',
        status: 'scheduled'
      }
    ]
  },
  {
    id: 'APP3',
    talent: {
      ...dummyTalents[0], // Using T1 as base
      name: 'Talent 1',
    },
    status: 'new',
    appliedAt: '2024-02-20',
    documents: [
      { type: 'CV', name: 'CV.pdf', uploadedAt: '2024-02-20' },
      { type: 'Cover Letter', name: 'Cover_Letter.pdf', uploadedAt: '2024-02-20' }
    ]
  },
  {
    id: 'APP4',
    talent: {
      ...dummyTalents[1], // Using T2 as base
      name: 'Talent 2',
    },
    status: 'new',
    appliedAt: '2024-02-20',
    documents: [
      { type: 'CV', name: 'CV.pdf', uploadedAt: '2024-02-20' }
    ]
  },
  {
    id: 'APP5',
    talent: {
      ...dummyTalents[0], // Using T1 as base but with different data
      name: 'Marina Heier',
    },
    status: 'rejected',
    appliedAt: '2024-02-14',
    documents: [
      { type: 'CV', name: 'Marina_Heier_CV.pdf', uploadedAt: '2024-02-14' },
      { type: 'Cover Letter', name: 'Marina_Heier_Cover.pdf', uploadedAt: '2024-02-14' }
    ],
    assessments: [
      {
        type: 'Technical Assessment',
        score: 65,
        completedAt: '2024-02-17',
        details: 'Limited understanding of system architecture, needs improvement in problem-solving'
      }
    ],
    interviews: [
      {
        scheduledFor: '2024-02-18',
        feedback: 'Technical skills not matching requirements. Not recommended for next round.',
        interviewer: 'Alex Miller',
        status: 'completed'
      }
    ]
  }
];

// Update the TabId type
type TabId = 'details' | 'talents' | 'applications';

type CompareTabId = 'overview' | 'software' | 'professional' | 'experience' | 'personality' | 'recommendation';

// Add new type for application detail tabs
type ApplicationDetailTab = 'overview' | 'experience' | 'skills' | 'assessments';

export default function JobDetails() {
  const [activeTab, setActiveTab] = useState<TabId>('details');
  const [activeApplicationTab, setActiveApplicationTab] = useState<ApplicationDetailTab>('overview');
  const [selectedTalents, setSelectedTalents] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState<TalentProfile | null>(null);
  const [showTalentModal, setShowTalentModal] = useState(false);
  const [minMatchScore, setMinMatchScore] = useState<number>(70);
  const spiderChartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [activeCompareTab, setActiveCompareTab] = useState<CompareTabId>('overview');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedTalentForInterview, setSelectedTalentForInterview] = useState<TalentProfile | null>(null);

  const handleInterviewRequest = (talent: TalentProfile) => {
    setSelectedTalentForInterview(talent);
    setIsScheduleModalOpen(true);
  };

  const handleScheduleInterview = (scheduleData: any) => {
    // Here you would typically make an API call to schedule the interview
    console.log('Scheduling interview:', scheduleData);
    setIsScheduleModalOpen(false);
    setSelectedTalentForInterview(null);
  };

  const handleCloseScheduleModal = () => {
    setIsScheduleModalOpen(false);
    setSelectedTalentForInterview(null);
  };

  const handleCompare = (talent: TalentProfile) => {
    setSelectedTalents((prev) => {
      if (prev.includes(talent.id)) {
        return prev.filter(id => id !== talent.id);
      }
      if (prev.length < 3) {
        return [...prev, talent.id];
      }
      return prev;
    });
  };

  const handleTalentClick = (talent: TalentProfile) => {
    setSelectedTalent(talent);
    setShowTalentModal(true);
  };

  const handleCloseModal = () => {
    setShowTalentModal(false);
    setSelectedTalent(null);
  };

  const clearSelection = () => {
    setSelectedTalents([]);
  };

  // Update the tab list in the component
  const tabs: { id: TabId; label: string; icon: any }[] = [
    { id: 'details', label: 'Details', icon: Briefcase },
    { id: 'talents', label: 'Talent Pool', icon: Users },
    { id: 'applications', label: 'Applications', icon: ClipboardList }
  ];

  const getEmploymentTypeEmoji = (employmentType: string) => {
    switch (employmentType) {
      case 'Full-time':
        return '💼';
      case 'Part-time':
        return '🕒';
      case 'Contract':
        return '📋';
      case 'Temporary':
        return '🕒';
      case 'Internship':
        return '🎓';
      default:
        return '💼';
    }
  };

  const getWorkTypeEmoji = (workType: string) => {
    switch (workType) {
      case 'Remote':
        return '🌍';
      case 'Hybrid':
        return '🌍';
      case 'On-site':
        return '🏢';
      default:
        return '🌍';
    }
  };

  const handleShowComparison = () => {
    setShowCompareModal(true);
    
    // Wait for the canvas to be rendered
    setTimeout(() => {
      if (spiderChartRef.current) {
        // Destroy existing chart if it exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const selectedTalentProfiles = dummyTalents.filter(t => selectedTalents.includes(t.id));
        
        const ctx = spiderChartRef.current.getContext('2d');
        if (ctx) {
          chartInstanceRef.current = new Chart(ctx, {
            type: 'radar',
            data: {
              labels: ['Technical Skills', 'Professional Skills', 'Experience', 'Language Skills', 'Match Score'],
              datasets: selectedTalentProfiles.map(talent => ({
                label: talent.id,
                data: [
                  // Average of software skill ratings
                  talent.skillRatings.software.reduce((acc, curr) => acc + curr.rating, 0) / 
                  talent.skillRatings.software.length,
                  // Average of professional skill ratings
                  talent.skillRatings.professional.reduce((acc, curr) => acc + curr.rating, 0) / 
                  talent.skillRatings.professional.length,
                  // Experience score (based on years)
                  parseInt(talent.experience) * 10,
                  // Language score (based on highest level)
                  talent.languages.reduce((acc, curr) => {
                    const levelScores = { 'Native': 100, 'C2': 95, 'C1': 90, 'B2': 80, 'B1': 70 };
                    return Math.max(acc, levelScores[curr.level as keyof typeof levelScores] || 60);
                  }, 0),
                  // Match score
                  talent.matchScore
                ],
                backgroundColor: talent.id === 'T1' ? 'rgba(99, 102, 241, 0.2)' :
                                 talent.id === 'T2' ? 'rgba(16, 185, 129, 0.2)' :
                                 talent.id === 'T3' ? 'rgba(245, 158, 11, 0.2)' :
                                 'rgba(239, 68, 68, 0.2)',
                borderColor: talent.id === 'T1' ? 'rgb(99, 102, 241)' :
                            talent.id === 'T2' ? 'rgb(16, 185, 129)' :
                            talent.id === 'T3' ? 'rgb(245, 158, 11)' :
                            'rgb(239, 68, 68)',
                borderWidth: 2,
                pointBackgroundColor: talent.id === 'T1' ? 'rgb(99, 102, 241)' :
                                    talent.id === 'T2' ? 'rgb(16, 185, 129)' :
                                    talent.id === 'T3' ? 'rgb(245, 158, 11)' :
                                    'rgb(239, 68, 68)',
              }))
            },
            options: {
              scales: {
                r: {
                  min: 0,
                  max: 100,
                  ticks: {
                    stepSize: 20
                  }
                }
              },
              plugins: {
                legend: {
                  position: 'top',
                }
              }
            }
          });
        }
      }
    }, 100);
  };

  const getComparisonSummary = (talents: TalentProfile[], aspect: string) => {
    switch (aspect) {
      case 'software':
        return talents.map(talent => ({
          id: talent.id,
          strengths: talent.skillRatings.software
            .filter(skill => skill.rating >= 85)
            .map(skill => skill.name),
          weaknesses: talent.skillRatings.software
            .filter(skill => skill.rating < 70)
            .map(skill => skill.name)
        }));
      case 'professional':
        return talents.map(talent => ({
          id: talent.id,
          strengths: talent.skillRatings.professional
            .filter(skill => skill.rating >= 85)
            .map(skill => skill.name),
          weaknesses: talent.skillRatings.professional
            .filter(skill => skill.rating < 70)
            .map(skill => skill.name)
        }));
      case 'experience':
        return talents.map(talent => ({
          id: talent.id,
          strengths: [
            talent.experience.includes('+') ? 'Extensive experience' : 'Growing experience',
            talent.allExperiences.length > 2 ? 'Diverse background' : 'Focused career path'
          ],
          weaknesses: []
        }));
      case 'personality':
        return talents.map(talent => ({
          id: talent.id,
          strengths: talent.personality.strengths,
          weaknesses: talent.personality.weaknesses
        }));
      default:
        return [];
    }
  };

  // Update the getHiringRecommendation function type
  interface HiringRecommendation {
    id: string;
    recommendation: string;
    bestFitFor: string;
  }

  const getHiringRecommendation = (talents: TalentProfile[]): HiringRecommendation[] => {
    return talents.map(talent => ({
      id: talent.id,
      recommendation: `Based on ${talent.name}'s skills and experience...`, // Add your recommendation logic here
      bestFitFor: talent.matchScore > 90 ? 'Ideal candidate' :
                  talent.matchScore > 75 ? 'Strong candidate' : 'Potential candidate'
    }));
  };

  // Add helper function for status badge
  const getStatusBadge = (status: Application['status']): string => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'interview_scheduled':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'interview_done':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusText = (status: Application['status']): string => {
    switch (status) {
      case 'new':
        return 'New Application';
      case 'interview_scheduled':
        return 'Interview Scheduled';
      case 'interview_done':
        return 'Interview Completed';
      case 'rejected':
        return 'Application Rejected';
      default:
        return status;
    }
  };

  // Add helper function to get company display name for new applications
  const getAnonymizedCompanyName = (company: string): string => {
    const industryMap: Record<string, string> = {
      'Tech Company': 'Automotive Tech Company',
      'Digital Agency': 'HR Tech Startup',
      'Tech Solutions': 'FinTech Scale-up',
      'Web Studio': 'E-commerce Company',
      'Innovation Labs': 'Healthcare Tech Company',
      'Tech Corp': 'Enterprise Software Company',
      'Product House': 'SaaS Company',
      'Digital Solutions': 'Tech Consulting Firm'
    };
    return industryMap[company] || 'Tech Company';
  };

  // Update the tab handling
  const handleTabChange = (newTab: TabId) => {
    setActiveTab(newTab);
  };

  // Update the tab content rendering
  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-6">
            {/* Skills & Requirements Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Senior Full Stack Developer
                  </h2>
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {getEmploymentTypeEmoji('Full-time')} Full-time • {getWorkTypeEmoji('Remote')} Remote • 📍 Berlin, Germany
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Active
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Skills & Requirements
                    </h3>
                  </div>
                  
                  {/* Software Skills */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Software Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'TypeScript', 'Node.js', 'GraphQL'].map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Professional Skills */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Professional Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Team Leadership', 'Agile Project Management', 'Problem Solving'].map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Languages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { language: 'English', level: 'C1' },
                        { language: 'German', level: 'B2' }
                      ].map((lang) => (
                        <span
                          key={lang.language}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        >
                          {lang.language} ({lang.level})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Details Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Job Details
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Experience
                    </div>
                    <div className="mt-1 text-sm text-gray-900 dark:text-white">
                      5+ years
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Work Type
                    </div>
                    <div className="mt-1 text-sm text-gray-900 dark:text-white">
                      Remote
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Employment Type
                    </div>
                    <div className="mt-1 text-sm text-gray-900 dark:text-white">
                      Full-time
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Location
                    </div>
                    <div className="mt-1 text-sm text-gray-900 dark:text-white">
                      Berlin, Germany
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Compensation
                  </div>
                  <div className="mt-1 text-sm text-gray-900 dark:text-white">
                    💰 65,000-85,000 EUR per year
                  </div>
                  <div className="mt-1 text-sm text-gray-900 dark:text-white">
                    💎 0.5-1% equity (VSOP)
                  </div>
                </div>
              </div>
            </div>

            {/* Tasks Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center space-x-2 mb-4">
                <ClipboardList className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Tasks
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    • Lead the development of our next-generation web application using React and TypeScript
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    • Collaborate with the product team to implement new features and improve existing ones
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    • Mentor junior developers and conduct code reviews to maintain high code quality
                  </span>
                </li>
              </ul>
            </div>

            {/* Benefits Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Gift className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Benefits
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start space-x-3">
                  <span className="text-xl">🚀</span>
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">4-Day Work Week</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Work 32 hours across 4 days while receiving a full-time salary
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-xl">🌍</span>
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Workation Budget</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      €3,000 annual budget to work from anywhere in the world
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-xl">��</span>
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Personal Growth Fund</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      €10,000/year for courses, conferences, and coaching
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Information Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Company Information
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Innovative startup in the heart of Berlin
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Industry
                    </div>
                    <div className="mt-1 text-sm text-gray-900 dark:text-white">
                      Software Development
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Company Size
                    </div>
                    <div className="mt-1 text-sm text-gray-900 dark:text-white">
                      10-50 employees
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Founded
                    </div>
                    <div className="mt-1 text-sm text-gray-900 dark:text-white">
                      2020
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Headquarters
                    </div>
                    <div className="mt-1 text-sm text-gray-900 dark:text-white">
                      Berlin
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'talents':
        return (
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                Talent Pool
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {dummyTalents.filter(t => t.matchScore >= minMatchScore).length} candidates match your criteria
              </div>
              {selectedTalents.length > 0 && (
                <button
                  onClick={clearSelection}
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Clear Selection ({selectedTalents.length})
                </button>
              )}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-4 gap-6">
              {/* Left Sidebar - Filters */}
              <div className="col-span-1 space-y-6">
                {/* Match Score Filter */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    Match Score
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Min Score: {minMatchScore}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={minMatchScore}
                      onChange={(e) => setMinMatchScore(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                  </div>
                </div>

                {/* Work Type Filter */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    Work Type
                  </h3>
                  <div className="space-y-2">
                    {['Remote', 'Hybrid', 'Onsite'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          className="appearance-none h-4 w-4 border border-gray-300 dark:border-gray-600 rounded checked:bg-primary-600 checked:border-transparent focus:ring-primary-500 focus:ring-offset-0 transition-colors dark:bg-gray-700"
                        />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                          {getWorkTypeEmoji(type)} {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Employment Type Filter */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    Employment Type
                  </h3>
                  <div className="space-y-2">
                    {['Full-time', 'Part-time'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          className="appearance-none h-4 w-4 border border-gray-300 dark:border-gray-600 rounded checked:bg-primary-600 checked:border-transparent focus:ring-primary-500 focus:ring-offset-0 transition-colors dark:bg-gray-700"
                        />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                          {getEmploymentTypeEmoji(type)} {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side - Talent Cards */}
              <div className="col-span-3 space-y-4">
                {dummyTalents
                  .filter(talent => talent.matchScore >= minMatchScore)
                  .map((talent) => (
                    <div
                      key={talent.id}
                      onClick={() => handleTalentClick(talent)}
                      className={`bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200 p-4 cursor-pointer ${
                        selectedTalents.includes(talent.id) ? 'ring-2 ring-primary-500' : ''
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                            {talent.id}
                          </span>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                {talent.name}
                              </h3>
                              <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                <span>{getWorkTypeEmoji(talent.workType)} {talent.workType}</span>
                                <span>•</span>
                                <span>{getEmploymentTypeEmoji(talent.employmentType)} {talent.employmentType}</span>
                                <span>•</span>
                                <span>📍 {talent.location}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                                {talent.matchScore}%
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Match Score
                              </div>
                            </div>
                          </div>

                          {/* Content with consistent left spacing */}
                          <div className="mt-4 ml-0">
                            {/* Latest Experience */}
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                                <Image
                                  src="/images/company-logos/anonymized.png"
                                  alt={talent.latestExperience.industry}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {talent.latestExperience.position}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {talent.latestExperience.industry} • {talent.latestExperience.duration}
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 space-y-4">
                              {/* Skills */}
                              <div>
                                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Software Skills
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {talent.skills.slice(0, 4).map((skill) => (
                                    <span
                                      key={skill}
                                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                  {talent.skills.length > 4 && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                      +{talent.skills.length - 4} more
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Professional Skills */}
                              <div>
                                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Professional Skills
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {talent.professionalSkills.slice(0, 4).map((skill) => (
                                    <span
                                      key={skill}
                                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                  {talent.professionalSkills.length > 4 && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                      +{talent.professionalSkills.length - 4} more
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Languages */}
                              <div>
                                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Languages
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {talent.languages.map((lang) => (
                                    <span
                                      key={lang.language}
                                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                    >
                                      {lang.language} ({lang.level})
                                      {lang.verified && (
                                        <svg className="w-3 h-3 ml-1 text-purple-800 dark:text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                      )}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleInterviewRequest(talent);
                              }}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Request Interview
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCompare(talent);
                              }}
                              className={`inline-flex items-center px-3 py-1 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                                selectedTalents.includes(talent.id)
                                  ? 'border-primary-500 text-primary-700 bg-primary-50 hover:bg-primary-100'
                                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                              }`}
                            >
                              {selectedTalents.includes(talent.id) ? 'Selected' : 'Compare'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        );
      case 'applications':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Applications
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {dummyApplications.length} total applications
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {dummyApplications.map((application) => (
                  <li
                    key={application.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setSelectedApplication(application);
                      setShowApplicationModal(true);
                    }}
                  >
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {application.status === 'new' ? (
                            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                                {application.talent.id}
                              </span>
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                              <Image
                                src={`/images/candidates/${application.talent.name === 'Artema Rymarchuck' ? '1' : 
                                                 application.talent.name === 'Nael Bruns' ? '2' : 
                                                 application.talent.name === 'Marina Heier' ? '3' : '4'}.png`}
                                alt={application.talent.name}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                          )}
                          
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {application.talent.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Applied on {application.appliedAt}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(application.status)}`}>
                            {getStatusText(application.status)}
                          </span>
                          {application.status === 'interview_scheduled' && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Interview: {application.interviews?.[0].scheduledFor}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Application Detail Modal */}
            {showApplicationModal && selectedApplication && (
              <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                  </div>

                  <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                    <div className="absolute top-0 right-0 pt-4 pr-4">
                      <button
                        onClick={() => {
                          setShowApplicationModal(false);
                          setSelectedApplication(null);
                        }}
                        className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start space-x-4 mb-6">
                        {selectedApplication.status === 'new' ? (
                          <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                            <span className="text-lg font-medium text-primary-700 dark:text-primary-300">
                              {selectedApplication.talent.id}
                            </span>
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-full overflow-hidden">
                            <Image
                              src={`/images/candidates/${selectedApplication.talent.name === 'Artema Rymarchuck' ? '1' : 
                                                       selectedApplication.talent.name === 'Nael Bruns' ? '2' : 
                                                       selectedApplication.talent.name === 'Marina Heier' ? '3' : '4'}.png`}
                              alt={selectedApplication.talent.name}
                              width={64}
                              height={64}
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {selectedApplication.status === 'new' ? selectedApplication.talent.id : selectedApplication.talent.name}
                          </h3>
                          <div className="mt-1 flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(selectedApplication.status)}`}>
                              {getStatusText(selectedApplication.status)}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Applied on {selectedApplication.appliedAt}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span>{getWorkTypeEmoji(selectedApplication.talent.workType)} {selectedApplication.talent.workType}</span>
                            <span>{getEmploymentTypeEmoji(selectedApplication.talent.employmentType)} {selectedApplication.talent.employmentType}</span>
                            <span>📍 {selectedApplication.talent.location}</span>
                          </div>
                        </div>
                        <div className="ml-auto text-right">
                          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {selectedApplication.talent.matchScore}%
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Match Score
                          </div>
                        </div>
                      </div>

                      {/* Tabs */}
                      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                        <nav className="-mb-px flex space-x-8">
                          {[
                            { id: 'overview', label: 'Overview' },
                            { id: 'experience', label: 'Experience' },
                            { id: 'skills', label: 'Skills' },
                            { id: 'assessments', label: 'Assessments & Documents' }
                          ].map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => setActiveApplicationTab(tab.id as ApplicationDetailTab)}
                              className={`
                                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                                ${activeApplicationTab === tab.id
                                  ? 'border-primary-500 text-primary-600 dark:text-primary-500'
                                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                                }
                              `}
                            >
                              {tab.label}
                            </button>
                          ))}
                        </nav>
                      </div>

                      {/* Tab Content */}
                      <div className="space-y-6">
                        {activeApplicationTab === 'overview' && (
                          <div className="grid grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-6">
                              {/* Latest Experience */}
                              <div>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Latest Experience</h4>
                                <div className="flex items-start space-x-3">
                                  <div className="w-10 h-10 rounded-lg overflow-hidden">
                                    {selectedApplication.status === 'new' ? (
                                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">N/A</span>
                                      </div>
                                    ) : (
                                      <Image
                                        src={`/images/company-logos/${
                                          selectedApplication.talent.latestExperience.company === 'Tech Company' ? 'eon-logo' :
                                          selectedApplication.talent.latestExperience.company === 'Digital Agency' ? 'rwe-logo' :
                                          selectedApplication.talent.latestExperience.company === 'Tech Solutions' ? 'sixt-logo' :
                                          selectedApplication.talent.latestExperience.company === 'Web Studio' ? 'tag-logo' :
                                          selectedApplication.talent.latestExperience.company === 'Innovation Labs' ? 'traton-logo' :
                                          'uniper-logo'
                                        }.png`}
                                        alt={selectedApplication.talent.latestExperience.company}
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {selectedApplication.talent.latestExperience.position}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                      {selectedApplication.status === 'new' 
                                        ? getAnonymizedCompanyName(selectedApplication.talent.latestExperience.company)
                                        : selectedApplication.talent.latestExperience.company} • {selectedApplication.talent.latestExperience.duration}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Languages */}
                              <div>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Languages</h4>
                                <div className="flex flex-wrap gap-2">
                                  {selectedApplication.talent.languages.map((lang) => (
                                    <span
                                      key={lang.language}
                                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                    >
                                      {lang.language} ({lang.level})
                                      {lang.verified && (
                                        <svg className="w-3.5 h-3.5 ml-1 text-purple-800 dark:text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                      )}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Key Skills */}
                              <div>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Key Skills</h4>
                                <div className="space-y-3">
                                  <div>
                                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Software Skills</h5>
                                    <div className="flex flex-wrap gap-1">
                                      {selectedApplication.talent.skills.map((skill) => (
                                        <span
                                          key={skill}
                                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                        >
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Professional Skills</h5>
                                    <div className="flex flex-wrap gap-1">
                                      {selectedApplication.talent.professionalSkills.map((skill) => (
                                        <span
                                          key={skill}
                                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                        >
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                              {/* Assessment Results */}
                              {selectedApplication.assessments && (
                                <div>
                                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Assessment Results</h4>
                                  <div className="space-y-4">
                                    {selectedApplication.assessments.map((assessment, index) => (
                                      <div
                                        key={index}
                                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                      >
                                        <div className="flex justify-between items-start mb-2">
                                          <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                              {assessment.type}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                              Completed on {assessment.completedAt}
                                            </div>
                                          </div>
                                          <div className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                                            {assessment.score}%
                                          </div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                          {assessment.details}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Documents */}
                              {selectedApplication.status === 'new' ? (
                                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                  <div className="text-center">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                      Documents and detailed Experience will be available after an interview was scheduled
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Documents</h4>
                                  <div className="space-y-3">
                                    {selectedApplication.documents.map((doc, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                      >
                                        <div className="flex items-center space-x-3">
                                          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                          </svg>
                                          <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                              {doc.type}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                              Uploaded on {doc.uploadedAt}
                                            </div>
                                          </div>
                                        </div>
                                        <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                                          View
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {activeApplicationTab === 'experience' && (
                          <div className="space-y-6">
                            {selectedApplication.status === 'new' ? (
                              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  Detailed Experience will be available after an interview was scheduled
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-6">
                                {selectedApplication.talent.allExperiences.map((exp, index) => (
                                  <div key={index} className="flex items-start space-x-3">
                                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                                      <Image
                                        src={`/images/company-logos/${
                                          exp.company === 'Tech Company' ? 'eon-logo' :
                                          exp.company === 'Digital Agency' ? 'rwe-logo' :
                                          exp.company === 'Tech Solutions' ? 'sixt-logo' :
                                          exp.company === 'Web Studio' ? 'tag-logo' :
                                          exp.company === 'Innovation Labs' ? 'traton-logo' :
                                          'uniper-logo'
                                        }.png`}
                                        alt={exp.company}
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {exp.position}
                                      </div>
                                      <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {exp.company} • {exp.duration}
                                      </div>
                                      <div className="mt-2">
                                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                          Skills used:
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                          {exp.skills.map((skill) => (
                                            <span
                                              key={skill}
                                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                            >
                                              {skill}
                                            </span>
                                          ))}
                                        </div>
                                        <div className="mt-1">
                                          {exp.professionalSkills.map((skill) => (
                                            <span
                                              key={skill}
                                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mr-1"
                                            >
                                              {skill}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {activeApplicationTab === 'skills' && (
                          <div className="grid grid-cols-2 gap-6">
                            {/* Software Skills */}
                            <div>
                              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Software Skills</h4>
                              <div className="space-y-2">
                                {selectedApplication.talent.skillRatings.software.map((skill) => (
                                  <div key={skill.name} className="flex items-center">
                                    <div className="w-24 text-sm text-gray-600 dark:text-gray-400">
                                      {skill.name}
                                    </div>
                                    <div className="flex-1 ml-4">
                                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                        <div
                                          className="h-2 bg-blue-500 rounded-full"
                                          style={{ width: `${skill.rating}%` }}
                                        ></div>
                                    </div>
                                    <div className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                                      {skill.rating}%
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Professional Skills */}
                            <div>
                              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Professional Skills</h4>
                              <div className="space-y-2">
                                {selectedApplication.talent.skillRatings.professional.map((skill) => (
                                  <div key={skill.name} className="flex items-center">
                                    <div className="w-24 text-sm text-gray-600 dark:text-gray-400">
                                      {skill.name}
                                    </div>
                                    <div className="flex-1 ml-4">
                                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                        <div
                                          className="h-2 bg-green-500 rounded-full"
                                          style={{ width: `${skill.rating}%` }}
                                        ></div>
                                    </div>
                                    <div className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                                      {skill.rating}%
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {activeApplicationTab === 'assessments' && (
                          <div className="grid grid-cols-2 gap-6">
                            {/* Assessments */}
                            <div>
                              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Assessment Results</h4>
                              {selectedApplication.assessments ? (
                                <div className="space-y-4">
                                  {selectedApplication.assessments.map((assessment, index) => (
                                    <div
                                      key={index}
                                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                    >
                                      <div className="flex justify-between items-start mb-2">
                                        <div>
                                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {assessment.type}
                                          </div>
                                          <div className="text-xs text-gray-500 dark:text-gray-400">
                                            Completed on {assessment.completedAt}
                                          </div>
                                        </div>
                                        <div className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                                          {assessment.score}%
                                        </div>
                                      </div>
                                      <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {assessment.details}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    No assessments completed yet
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Documents */}
                            <div>
                              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Documents</h4>
                              {selectedApplication.status === 'new' ? (
                                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Documents will be available after an interview was scheduled
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  {selectedApplication.documents.map((doc, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                    >
                                      <div className="flex items-center space-x-3">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        <div>
                                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {doc.type}
                                          </div>
                                          <div className="text-xs text-gray-500 dark:text-gray-400">
                                            Uploaded on {doc.uploadedAt}
                                          </div>
                                        </div>
                                      </div>
                                      <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                                        View
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end space-x-3">
                      <button
                        onClick={() => {
                          setShowApplicationModal(false);
                          setSelectedApplication(null);
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                      >
                        Close
                      </button>
                      {selectedApplication.status === 'new' && (
                        <button
                          className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          onClick={() => handleApplicationSchedule(selectedApplication)}
                        >
                          Schedule Interview
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const handleApplicationSchedule = (application: Application) => {
    setSelectedTalentForInterview(application.talent);
    setIsScheduleModalOpen(true);
    setShowApplicationModal(false);
  };

  // Update the recommendation section
  const renderRecommendations = (talents: TalentProfile[]) => {
    const recommendations = getHiringRecommendation(talents);
    return recommendations.map((rec: HiringRecommendation) => (
      <div key={rec.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Talent {rec.id} - {rec.bestFitFor}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {rec.recommendation}
        </p>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
        {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-500'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }
                  `}
                >
                  <tab.icon className="w-5 h-5 mr-2 inline" />
                  {tab.label}
                </button>
              ))}
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
              </div>
              </div>

      {/* Schedule Interview Modal */}
      <ScheduleInterviewModal
        isOpen={isScheduleModalOpen}
        onClose={handleCloseScheduleModal}
        onSchedule={handleScheduleInterview}
        preselectedCandidate={selectedTalentForInterview}
      />
    </div>
  );
} 