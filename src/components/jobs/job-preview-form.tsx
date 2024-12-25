'use client';

import { useState } from 'react';
import { JobAd } from '@/app/types';

interface JobPreviewFormProps {
  jobData: Partial<JobAd>;
  onBack: () => void;
}

export function JobPreviewForm({ jobData, onBack }: JobPreviewFormProps) {
  const [minMatchScore, setMinMatchScore] = useState(70);
  const [notifyNewCandidates, setNotifyNewCandidates] = useState(true);

  const handlePublish = async () => {
    // In a real app, this would be an API call to save the job
    console.log('Publishing job with settings:', {
      ...jobData,
      minMatchScore,
      notifyNewCandidates,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="p-6 space-y-6">
        {/* Job Preview */}
        <div className="mb-8">
          <div className="prose dark:prose-invert max-w-none">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{jobData.title}</h1>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Job Details
                </h3>
                <ul className="list-none p-0 space-y-2">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <span className="font-medium mr-2">Type:</span> {jobData.type}
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <span className="font-medium mr-2">Work Type:</span> {jobData.workType}
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <span className="font-medium mr-2">Level:</span> {jobData.level}
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <span className="font-medium mr-2">Reports To:</span> {jobData.reportingTo}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Compensation
                </h3>
                <ul className="list-none p-0 space-y-2">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <span className="font-medium mr-2">Salary:</span>{' '}
                    {jobData.compensation?.salary} {jobData.compensation?.currency} per{' '}
                    {jobData.compensation?.interval}
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {jobData.requirements?.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Required Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {jobData.requirements?.languages?.map((lang) => (
                  <span
                    key={lang.language}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                  >
                    {lang.language} ({lang.level})
                  </span>
                ))}
              </div>
            </div>

            {jobData.benefits && jobData.benefits.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Benefits</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {jobData.benefits.map((benefit) => (
                    <li key={benefit} className="text-gray-600 dark:text-gray-300">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Publishing Options */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Matching Candidates
            </h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Minimum match score required
              </span>
              <span className="text-2xl font-bold text-primary-600">{minMatchScore}%</span>
            </div>
            <div className="relative w-full h-4 mb-2">
              <style jsx>{`
                input[type='range'] {
                  -webkit-appearance: none;
                  width: 100%;
                  height: 4px;
                  border-radius: 2px;
                  background: linear-gradient(
                    to right,
                    #7C3AED 0%,
                    #7C3AED ${minMatchScore}%,
                    #E5E7EB ${minMatchScore}%,
                    #E5E7EB 100%
                  );
                }
                input[type='range']::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  width: 16px;
                  height: 16px;
                  background-color: #7C3AED;
                  border: 2px solid white;
                  border-radius: 50%;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  cursor: pointer;
                }
                input[type='range']::-moz-range-thumb {
                  width: 16px;
                  height: 16px;
                  background-color: #7C3AED;
                  border: 2px solid white;
                  border-radius: 50%;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  cursor: pointer;
                }
                input[type='range']:focus {
                  outline: none;
                }
                .dark input[type='range'] {
                  background: linear-gradient(
                    to right,
                    #7C3AED 0%,
                    #7C3AED ${minMatchScore}%,
                    #374151 ${minMatchScore}%,
                    #374151 100%
                  );
                }
              `}</style>
              <input
                type="range"
                min="0"
                max="100"
                value={minMatchScore}
                onChange={(e) => setMinMatchScore(Number(e.target.value))}
                className="absolute inset-0"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Set minimum matching score for candidates to apply
            </p>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="notifyNewCandidates"
              checked={notifyNewCandidates}
              onChange={(e) => setNotifyNewCandidates(e.target.checked)}
              className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
            />
            <label
              htmlFor="notifyNewCandidates"
              className="ml-2 text-sm text-gray-600 dark:text-gray-300"
            >
              Notify me when new candidates match this job
            </label>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handlePublish}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Publish Job
        </button>
      </div>
    </div>
  );
} 