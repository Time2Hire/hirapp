'use client';

import { useState, useEffect } from 'react';
import { JobSkillsForm } from '@/components/jobs/job-skills-form';
import { JobDetailsForm } from '@/components/jobs/job-details-form';
import { JobPreviewForm } from '@/components/jobs/job-preview-form';
import { JobAd } from '@/app/types';

const steps = [
  { id: 'skills', name: 'Skills & Requirements' },
  { id: 'details', name: 'Job Details' },
  { id: 'preview', name: 'Preview & Publish' },
];

export default function CreateJob() {
  const [currentStep, setCurrentStep] = useState('skills');
  const [jobData, setJobData] = useState<Partial<JobAd>>({
    status: 'draft',
    requirements: {
      skills: [],
      experience: 0,
      languages: [],
    },
  });
  const [matchingCandidates, setMatchingCandidates] = useState(0);

  // Simulate changing number of candidates
  useEffect(() => {
    const interval = setInterval(() => {
      setMatchingCandidates(prev => (prev >= 8 ? 0 : prev + 1));
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const updateJobData = (data: Partial<JobAd>) => {
    setJobData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <nav aria-label="Progress" className="mb-12">
          <ol className="flex justify-between">
            {steps.map((step, stepIdx) => (
              <li key={step.id} className="flex flex-col items-center">
                <span
                  className={`
                    flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold
                    ${
                      step.id === currentStep
                        ? 'bg-primary-600 text-white'
                        : steps.findIndex(s => s.id === currentStep) > stepIdx
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-2 border-gray-300 dark:border-gray-600'
                    }
                  `}
                >
                  {steps.findIndex(s => s.id === currentStep) > stepIdx ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    stepIdx + 1
                  )}
                </span>
                <span className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  {step.name}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        {/* Form Steps */}
        {currentStep === 'skills' && (
          <JobSkillsForm
            jobData={jobData}
            onUpdate={updateJobData}
            onNext={() => setCurrentStep('details')}
            matchingCandidates={matchingCandidates}
            setMatchingCandidates={setMatchingCandidates}
          />
        )}
        {currentStep === 'details' && (
          <JobDetailsForm
            jobData={jobData}
            onUpdate={updateJobData}
            onBack={() => setCurrentStep('skills')}
            onNext={() => setCurrentStep('preview')}
          />
        )}
        {currentStep === 'preview' && (
          <JobPreviewForm
            jobData={jobData}
            onBack={() => setCurrentStep('details')}
            matchingCandidates={matchingCandidates}
          />
        )}
      </div>
    </div>
  );
} 