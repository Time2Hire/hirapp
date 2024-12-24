'use client';

import { CandidateProfile } from '@/app/types';

interface TalentComparisonProps {
  talents: (CandidateProfile & { matchScore: number })[];
}

export function TalentComparison({ talents }: TalentComparisonProps) {
  // Get all unique skills from selected talents
  const allSkills = Array.from(
    new Set(talents.flatMap((t) => t.talents.filter((s) => s.category === 'Software Skill').map((s) => s.name)))
  );

  // Get all unique languages from selected talents
  const allLanguages = Array.from(
    new Set(talents.flatMap((t) => t.talents.filter((s) => s.category === 'Language').map((s) => s.name)))
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Compare Selected Talents
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Criteria
              </th>
              {talents.map((talent) => (
                <th
                  key={talent.id}
                  className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  {talent.personalInfo.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {/* Match Score */}
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                Match Score
              </td>
              {talents.map((talent) => (
                <td key={talent.id} className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      talent.matchScore >= 90
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : talent.matchScore >= 80
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                    }`}
                  >
                    {talent.matchScore}%
                  </span>
                </td>
              ))}
            </tr>

            {/* Location */}
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                Location
              </td>
              {talents.map((talent) => (
                <td key={talent.id} className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                  {talent.personalInfo.location.city}, {talent.personalInfo.location.country}
                </td>
              ))}
            </tr>

            {/* Work Type */}
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                Work Type
              </td>
              {talents.map((talent) => (
                <td key={talent.id} className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                  {talent.preferences.workLocation}
                </td>
              ))}
            </tr>

            {/* Experience */}
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                Latest Role
              </td>
              {talents.map((talent) => (
                <td key={talent.id} className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                  {talent.experiences[0]?.position} at {talent.experiences[0]?.employer}
                </td>
              ))}
            </tr>

            {/* Skills */}
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                Skills
              </td>
              {talents.map((talent) => (
                <td key={talent.id} className="py-3 px-4">
                  <div className="flex flex-wrap gap-2">
                    {allSkills.map((skillName) => {
                      const skill = talent.talents.find(
                        (s) => s.category === 'Software Skill' && s.name === skillName
                      );
                      return (
                        <span
                          key={skillName}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            skill
                              ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                          }`}
                        >
                          {skillName}
                          {skill && ` • ${skill.yearsOfExperience}y`}
                        </span>
                      );
                    })}
                  </div>
                </td>
              ))}
            </tr>

            {/* Languages */}
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                Languages
              </td>
              {talents.map((talent) => (
                <td key={talent.id} className="py-3 px-4">
                  <div className="flex flex-wrap gap-2">
                    {allLanguages.map((langName) => {
                      const lang = talent.talents.find(
                        (s) => s.category === 'Language' && s.name === langName
                      );
                      return (
                        <span
                          key={langName}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            lang
                              ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                          }`}
                        >
                          {langName}
                          {lang && ` • ${lang.rating}`}
                        </span>
                      );
                    })}
                  </div>
                </td>
              ))}
            </tr>

            {/* Salary Expectation */}
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                Salary Expectation
              </td>
              {talents.map((talent) => (
                <td key={talent.id} className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                  {talent.preferences.salary.amount.toLocaleString()} {talent.preferences.salary.currency}
                </td>
              ))}
            </tr>

            {/* Job Status */}
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                Job Status
              </td>
              {talents.map((talent) => (
                <td key={talent.id} className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      talent.preferences.jobStatus === 'actively_searching'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}
                  >
                    {talent.preferences.jobStatus === 'actively_searching'
                      ? 'Actively searching'
                      : 'Open to offers'}
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 