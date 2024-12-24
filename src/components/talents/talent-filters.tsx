'use client';

import { CandidateProfile } from '@/app/types';

interface TalentFiltersProps {
  filters: {
    skills: string[];
    experience: [number, number];
    languages: string[];
    locations: string[];
    workTypes: string[];
    minMatchScore: number;
  };
  onFiltersChange: (filters: TalentFiltersProps['filters']) => void;
  talents: (CandidateProfile & { matchScore: number })[];
}

export function TalentFilters({ filters, onFiltersChange, talents }: TalentFiltersProps) {
  // Extract unique values from talents for filter options
  const allSkills = Array.from(
    new Set(talents.flatMap((t) => t.talents.map((skill) => skill.name)))
  );
  const allLanguages = Array.from(
    new Set(
      talents.flatMap((t) =>
        t.talents.filter((skill) => skill.category === 'Language').map((lang) => lang.name)
      )
    )
  );
  const allLocations = Array.from(
    new Set(talents.map((t) => t.personalInfo.location.city))
  );
  const allWorkTypes = Array.from(
    new Set(talents.map((t) => t.preferences.workLocation))
  );

  const handleSkillToggle = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter((s) => s !== skill)
      : [...filters.skills, skill];
    onFiltersChange({ ...filters, skills: newSkills });
  };

  const handleLanguageToggle = (language: string) => {
    const newLanguages = filters.languages.includes(language)
      ? filters.languages.filter((l) => l !== language)
      : [...filters.languages, language];
    onFiltersChange({ ...filters, languages: newLanguages });
  };

  const handleLocationToggle = (location: string) => {
    const newLocations = filters.locations.includes(location)
      ? filters.locations.filter((l) => l !== location)
      : [...filters.locations, location];
    onFiltersChange({ ...filters, locations: newLocations });
  };

  const handleWorkTypeToggle = (workType: string) => {
    const newWorkTypes = filters.workTypes.includes(workType)
      ? filters.workTypes.filter((w) => w !== workType)
      : [...filters.workTypes, workType];
    onFiltersChange({ ...filters, workTypes: newWorkTypes });
  };

  return (
    <div className="space-y-6">
      {/* Matching Score Filter */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Minimum Match Score
        </h3>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="100"
            value={filters.minMatchScore}
            onChange={(e) =>
              onFiltersChange({ ...filters, minMatchScore: Number(e.target.value) })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {filters.minMatchScore}%
          </span>
        </div>
      </div>

      {/* Skills Filter */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Skills</h3>
        <div className="space-y-2">
          {allSkills.map((skill) => (
            <label key={skill} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.skills.includes(skill)}
                onChange={() => handleSkillToggle(skill)}
                className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{skill}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Languages Filter */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Languages</h3>
        <div className="space-y-2">
          {allLanguages.map((language) => (
            <label key={language} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.languages.includes(language)}
                onChange={() => handleLanguageToggle(language)}
                className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{language}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Locations Filter */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Locations</h3>
        <div className="space-y-2">
          {allLocations.map((location) => (
            <label key={location} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.locations.includes(location)}
                onChange={() => handleLocationToggle(location)}
                className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{location}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Work Type Filter */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Work Type</h3>
        <div className="space-y-2">
          {allWorkTypes.map((workType) => (
            <label key={workType} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.workTypes.includes(workType)}
                onChange={() => handleWorkTypeToggle(workType)}
                className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {workType.charAt(0).toUpperCase() + workType.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() =>
          onFiltersChange({
            skills: [],
            experience: [0, 10],
            languages: [],
            locations: [],
            workTypes: [],
            minMatchScore: 70,
          })
        }
        className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        Reset Filters
      </button>
    </div>
  );
} 