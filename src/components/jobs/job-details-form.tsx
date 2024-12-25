'use client';

import { useState } from 'react';
import { JobAd } from '@/app/types';

interface JobDetailsFormProps {
  jobData: Partial<JobAd>;
  onUpdate: (data: Partial<JobAd>) => void;
  onBack: () => void;
  onNext: () => void;
}

export function JobDetailsForm({ jobData, onUpdate, onBack, onNext }: JobDetailsFormProps) {
  const [title, setTitle] = useState(jobData.title || '');
  const [type, setType] = useState<JobAd['type']>(jobData.type || 'Full-time');
  const [workType, setWorkType] = useState<JobAd['workType']>(jobData.workType || 'Remote');
  const [level, setLevel] = useState<JobAd['level']>(jobData.level || 'Middle');
  const [reportingTo, setReportingTo] = useState(jobData.reportingTo || '');
  const [benefits, setBenefits] = useState<string[]>(jobData.benefits || []);
  const [benefit, setBenefit] = useState('');
  const [hasAlternateLocation, setHasAlternateLocation] = useState(!!jobData.location);
  const [street, setStreet] = useState(jobData.location?.street || '');
  const [postalCode, setPostalCode] = useState(jobData.location?.postalCode || '');
  const [city, setCity] = useState(jobData.location?.city || '');

  const addBenefit = () => {
    if (benefit && !benefits.includes(benefit)) {
      setBenefits([...benefits, benefit]);
      setBenefit('');
    }
  };

  const removeBenefit = (item: string) => {
    setBenefits(benefits.filter((b) => b !== item));
  };

  const handleSubmit = () => {
    onUpdate({
      title,
      type,
      workType,
      level,
      reportingTo,
      benefits,
      location: hasAlternateLocation ? {
        street,
        postalCode,
        city,
        state: 'Berlin',
        country: 'Germany'
      } : null,
    });
    onNext();
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="p-6 space-y-6">
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-white dark:bg-gray-800 pl-3 block w-full rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Employment Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Employment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Employment Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as JobAd['type'])}
                  className="bg-white dark:bg-gray-800 pl-3 block w-full rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Work Type
                </label>
                <select
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value as JobAd['workType'])}
                  className="bg-white dark:bg-gray-800 pl-3 block w-full rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Onsite">Onsite</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Experience Level
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as JobAd['level'])}
                  className="bg-white dark:bg-gray-800 pl-3 block w-full rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                >
                  <option value="Entry">Entry Level</option>
                  <option value="Junior">Junior</option>
                  <option value="Middle">Middle</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Lead</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Reporting To
                </label>
                <input
                  type="text"
                  value={reportingTo}
                  onChange={(e) => setReportingTo(e.target.value)}
                  placeholder="e.g., CTO, Engineering Manager"
                  className="bg-white dark:bg-gray-800 pl-3 block w-full rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Location</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="alternateLocation"
                  checked={hasAlternateLocation}
                  onChange={(e) => setHasAlternateLocation(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-primary-600 bg-white border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 focus:ring-offset-0"
                />
                <label htmlFor="alternateLocation" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Different location than headquarters
                </label>
              </div>
              {hasAlternateLocation && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Street
                    </label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="bg-white dark:bg-gray-800 pl-3 block w-full rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="bg-white dark:bg-gray-800 pl-3 block w-full rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-white dark:bg-gray-800 pl-3 block w-full rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Benefits</h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {benefits.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeBenefit(item)}
                      className="ml-2 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => setBenefit(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addBenefit()}
                  placeholder="Add a benefit"
                  className="bg-white dark:bg-gray-800 pl-3 flex-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={addBenefit}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Add
                </button>
              </div>
            </div>
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
          onClick={handleSubmit}
          disabled={!title}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Continue
        </button>
      </div>
    </div>
  );
} 