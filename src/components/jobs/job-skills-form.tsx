'use client';

import { useState } from 'react';
import { JobAd } from '@/app/types';
import { AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

const commonLanguages = [
  { code: 'en', name: 'English', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  { code: 'de', name: 'German', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  { code: 'fr', name: 'French', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  { code: 'es', name: 'Spanish', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  { code: 'it', name: 'Italian', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  // ... other languages
];

const softwareSkills = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'Java',
  'SQL',
  'AWS',
  'Docker',
  'Kubernetes',
];

const professionalSkills = [
  'Project Management',
  'Team Leadership',
  'Communication',
  'Problem Solving',
  'Agile',
  'Scrum',
  'Strategic Planning',
  'Stakeholder Management',
  'Business Analysis',
  'Product Management',
];

interface JobSkillsFormProps {
  jobData: Partial<JobAd>;
  onUpdate: (data: Partial<JobAd>) => void;
  onNext: () => void;
  matchingCandidates: number;
}

export function JobSkillsForm({
  jobData,
  onUpdate,
  onNext,
  matchingCandidates,
}: JobSkillsFormProps) {
  const [skill, setSkill] = useState('');
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const { toast } = useToast();

  const handleAddSkill = (newSkill: string) => {
    if (newSkill.trim() && !jobData.requirements?.skills?.includes(newSkill.trim())) {
      const updatedSkills = [...(jobData.requirements?.skills || []), newSkill.trim()];
      onUpdate({
        requirements: {
          ...jobData.requirements,
          skills: updatedSkills,
        },
      });
      setSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = jobData.requirements?.skills?.filter((s) => s !== skillToRemove);
    onUpdate({
      requirements: {
        ...jobData.requirements,
        skills: updatedSkills,
      },
    });
  };

  const handleLanguageAdd = () => {
    const updatedLanguages = [
      ...(jobData.requirements?.languages || []),
      { language: '', level: 'B2' },
    ];
    onUpdate({
      requirements: {
        ...jobData.requirements,
        languages: updatedLanguages,
      },
    });
  };

  const handleLanguageRemove = (index: number) => {
    const updatedLanguages = jobData.requirements?.languages?.filter((_, i) => i !== index);
    onUpdate({
      requirements: {
        ...jobData.requirements,
        languages: updatedLanguages,
      },
    });
  };

  const handleLanguageChange = (index: number, field: 'language' | 'level', value: string) => {
    const updatedLanguages = jobData.requirements?.languages?.map((lang, i) =>
      i === index ? { ...lang, [field]: value } : lang
    );
    onUpdate({
      requirements: {
        ...jobData.requirements,
        languages: updatedLanguages,
      },
    });
  };

  const handleSalaryChange = (type: 'from' | 'to', value: string) => {
    const currentRange = jobData.compensation?.salary?.split('-') || [];
    const newRange =
      type === 'from'
        ? `${value}-${currentRange[1] || value}`
        : `${currentRange[0] || value}-${value}`;
    onUpdate({
      compensation: {
        ...jobData.compensation,
        salary: newRange,
        currency: 'EUR',
      },
    });
  };

  const handleNotificationConfirm = () => {
    if (draftTitle) {
      // Save as draft with title
      onUpdate({ status: 'draft', title: draftTitle });
      toast({
        title: 'Job Saved as Draft',
        description: "We'll notify you when we find matching candidates.",
      });
      // Redirect to job overview
      window.location.href = '/jobs';
    } else {
      // Just notify without saving
      toast({
        title: 'Notification Set',
        description: "We'll notify you when we find matching candidates.",
      });
      // Redirect to dashboard
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="p-6 space-y-6">
        {/* Skills */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Required Skills</h3>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                {jobData.requirements?.skills?.length || 0} skills added
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {jobData.requirements?.skills?.map((item) => (
              <span
                key={item}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  softwareSkills.includes(item)
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}
              >
                {item}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(item)}
                  className="ml-2 hover:text-gray-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill(skill)}
              placeholder="Add a required skill"
              className="bg-white dark:bg-gray-800 pl-3 flex-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => handleAddSkill(skill)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add
            </button>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Software Skills
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {softwareSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleAddSkill(skill)}
                  className="px-3 py-1 text-sm bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-full hover:bg-blue-100"
                >
                  + {skill}
                </button>
              ))}
            </div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Professional Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {professionalSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleAddSkill(skill)}
                  className="px-3 py-1 text-sm bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200 rounded-full hover:bg-green-100"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Languages */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Languages</h3>
            <button
              type="button"
              onClick={handleLanguageAdd}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add Language
            </button>
          </div>
          <div className="space-y-4">
            {jobData.requirements?.languages?.map((lang, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1">
                  <select
                    value={lang.language}
                    onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                    className="bg-white dark:bg-gray-800 pl-3 block w-full rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  >
                    <option value="">Select language</option>
                    {commonLanguages.map((l) => (
                      <option key={l.code} value={l.name}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-32">
                  <select
                    value={lang.level}
                    onChange={(e) => handleLanguageChange(index, 'level', e.target.value)}
                    className="bg-white dark:bg-gray-800 pl-3 block w-full rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  >
                    {commonLanguages[0].levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => handleLanguageRemove(index)}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Salary Range */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Salary Range</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                From
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={jobData.compensation?.salary?.split('-')[0] || ''}
                  onChange={(e) => handleSalaryChange('from', e.target.value)}
                  className="bg-white dark:bg-gray-800 pl-3 block w-full rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500">EUR</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                To
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={jobData.compensation?.salary?.split('-')[1] || ''}
                  onChange={(e) => handleSalaryChange('to', e.target.value)}
                  className="bg-white dark:bg-gray-800 pl-3 block w-full rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500">EUR</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Matching Candidates Alert */}
        {matchingCandidates === 0 ? (
          <div className="rounded-md bg-yellow-50 dark:bg-yellow-900 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  No matching candidates found
                </h3>
                <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <p>
                    Would you like to be notified when matching candidates become available, or proceed
                    with creating the job post?
                  </p>
                </div>
                <div className="mt-4">
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-yellow-700 dark:text-yellow-200 bg-yellow-100 dark:bg-yellow-800 hover:bg-yellow-200 dark:hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      onClick={() => setShowNotificationDialog(true)}
                    >
                      Get notified
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-yellow-700 dark:text-yellow-200 bg-yellow-100 dark:bg-yellow-800 hover:bg-yellow-200 dark:hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      onClick={onNext}
                    >
                      Continue anyway
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-md bg-green-50 dark:bg-green-900 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                  {matchingCandidates} matching candidates found
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={!jobData.requirements?.skills?.length}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Notification Dialog */}
      <Dialog open={showNotificationDialog} onOpenChange={setShowNotificationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Create Job or Get Notified?</DialogTitle>
            <DialogDescription>
              Creating a job takes only 3-5 minutes and increases the chances of finding a talent with a
              perfect fit. Would you like to continue creating the job?
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <button
              type="button"
              className="w-full mb-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
              onClick={onNext}
            >
              Continue creating job
            </button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>
            <div className="mt-3">
              <input
                type="text"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                placeholder="Enter a name for this job (optional)"
                className="bg-white dark:bg-gray-800 pl-3 w-full rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <DialogFooter className="mt-3">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
                onClick={() => {
                  setShowNotificationDialog(false);
                  handleNotificationConfirm();
                }}
              >
                {draftTitle ? 'Notify me' : 'Just notify me'}
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
                onClick={() => setShowNotificationDialog(false)}
              >
                Cancel
              </button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 