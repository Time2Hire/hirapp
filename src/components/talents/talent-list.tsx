'use client';

import { CandidateProfile } from '@/app/types';

interface TalentListProps {
  talents: (CandidateProfile & { matchScore: number })[];
  selectedTalents: string[];
  onCompare: (talentId: string) => void;
}

export function TalentList({ talents, selectedTalents, onCompare }: TalentListProps) {
  const handleRequestInterview = (talentId: string) => {
    // In a real app, this would send an interview request
    console.log('Requesting interview with talent:', talentId);
  };

  return (
    <div className="space-y-6">
      {talents.map((talent) => (
        <div
          key={talent.id}
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 relative"
        >
          {/* Match Score Badge */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Match Score</span>
              <span
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-white font-bold ${
                  talent.matchScore >= 90
                    ? 'bg-green-500'
                    : talent.matchScore >= 80
                    ? 'bg-primary-500'
                    : 'bg-orange-500'
                }`}
              >
                {talent.matchScore}%
              </span>
            </div>
          </div>

          {/* Basic Info */}
          <div className="flex items-start gap-6 mb-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              {talent.personalInfo.avatar && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={talent.personalInfo.avatar}
                  alt={talent.personalInfo.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {talent.personalInfo.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                {talent.personalInfo.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>{talent.personalInfo.location.city}, {talent.personalInfo.location.country}</span>
                <span>•</span>
                <span>{talent.preferences.workLocation}</span>
                <span>•</span>
                <span>{talent.preferences.workTime.type}</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {talent.talents
                .filter((t) => t.category === 'Software Skill')
                .map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                  >
                    {skill.name} • {skill.yearsOfExperience}y
                  </span>
                ))}
            </div>
          </div>

          {/* Languages */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {talent.talents
                .filter((t) => t.category === 'Language')
                .map((language) => (
                  <span
                    key={language.name}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  >
                    {language.name} • {language.rating}
                  </span>
                ))}
            </div>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Latest Experience
            </h4>
            {talent.experiences[0] && (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {talent.experiences[0].logo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={talent.experiences[0].logo}
                      alt={talent.experiences[0].employer}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    {talent.experiences[0].position}
                  </h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {talent.experiences[0].employer} • {talent.experiences[0].duration}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <button
                onClick={() => handleRequestInterview(talent.id)}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                Request Interview
              </button>
              <button
                onClick={() => onCompare(talent.id)}
                className={`px-4 py-2 ${
                  selectedTalents.includes(talent.id)
                    ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                    : 'text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
                } rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/50`}
              >
                {selectedTalents.includes(talent.id) ? 'Selected' : 'Compare'}
              </button>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {talent.preferences.jobStatus === 'actively_searching' ? (
                <span className="text-green-500">Actively searching</span>
              ) : (
                <span className="text-blue-500">Open to offers</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 