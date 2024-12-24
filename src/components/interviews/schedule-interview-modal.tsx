'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, Video, Phone, Building2, X, Check } from 'lucide-react';
import Image from 'next/image';

interface ScheduleInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCandidate?: any; // Will be typed properly when we have the candidate type
  onSchedule: (scheduleData: any) => void; // Will be typed properly
}

type InterviewType = 'online' | 'phone' | 'offline';
type OnlinePlatform = 'zoom' | 'teams' | 'google';
type LocationType = 'hq' | 'alternative';

interface TimeSlot {
  date: Date;
  selected: boolean;
}

export function ScheduleInterviewModal({
  isOpen,
  onClose,
  preselectedCandidate,
  onSchedule
}: ScheduleInterviewModalProps) {
  const [step, setStep] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState(preselectedCandidate || null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);
  const [interviewTypes, setInterviewTypes] = useState<{
    type: InterviewType;
    platform?: OnlinePlatform;
    location?: LocationType;
    alternativeAddress?: string;
  }[]>([]);

  // Mock data for new applications
  const newApplications = [
    {
      id: 'NEW1',
      role: 'Senior Full Stack Developer',
      company: 'Tech Company',
      matchScore: 85,
      appliedAt: '2024-02-20'
    },
    {
      id: 'NEW2',
      role: 'Frontend Developer',
      company: 'Digital Agency',
      matchScore: 78,
      appliedAt: '2024-02-20'
    }
  ];

  const handleAddTimeSlot = (date: Date) => {
    if (selectedTimeSlots.length < 3) {
      setSelectedTimeSlots([...selectedTimeSlots, { date, selected: true }]);
    }
  };

  const handleRemoveTimeSlot = (index: number) => {
    setSelectedTimeSlots(selectedTimeSlots.filter((_, i) => i !== index));
  };

  const handleAddInterviewType = (type: InterviewType) => {
    setInterviewTypes([...interviewTypes, { type }]);
  };

  const handleUpdateInterviewType = (index: number, updates: Partial<typeof interviewTypes[0]>) => {
    const newTypes = [...interviewTypes];
    newTypes[index] = { ...newTypes[index], ...updates };
    setInterviewTypes(newTypes);
  };

  const handleRemoveInterviewType = (index: number) => {
    setInterviewTypes(interviewTypes.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    onSchedule({
      candidate: selectedCandidate,
      timeSlots: selectedTimeSlots,
      interviewTypes
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* Step 1: Select Candidate (only if no preselected candidate) */}
            {step === 1 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Selected Candidate
                </h3>
                {preselectedCandidate ? (
                  <div className="p-4 rounded-lg border border-primary-500 bg-primary-50 dark:bg-primary-900">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {preselectedCandidate.status === 'new' ? `Candidate ${preselectedCandidate.id}` : preselectedCandidate.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {preselectedCandidate.latestExperience?.position || 'Position not specified'}
                        </p>
                        {preselectedCandidate.status !== 'new' && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {preselectedCandidate.latestExperience?.company || 'Company not specified'}
                          </p>
                        )}
                      </div>
                      <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {preselectedCandidate.matchScore}% Match
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {newApplications.map((app) => (
                      <div
                        key={app.id}
                        onClick={() => setSelectedCandidate(app)}
                        className={`p-4 rounded-lg border cursor-pointer ${
                          selectedCandidate?.id === app.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              Candidate {app.id}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {app.role}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {app.company}
                            </p>
                          </div>
                          <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                            {app.matchScore}% Match
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Select Time Slots */}
            {step === 2 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Select Time Slots (up to 3)
                </h3>
                <div className="space-y-4">
                  {/* Calendar */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <button
                          type="button"
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                          onClick={() => {
                            const newDate = new Date();
                            newDate.setHours(9, 0, 0, 0);
                            handleAddTimeSlot(newDate);
                          }}
                        >
                          <span className="text-sm font-medium text-gray-900 dark:text-white">09:00</span>
                        </button>
                        <button
                          type="button"
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                          onClick={() => {
                            const newDate = new Date();
                            newDate.setHours(11, 0, 0, 0);
                            handleAddTimeSlot(newDate);
                          }}
                        >
                          <span className="text-sm font-medium text-gray-900 dark:text-white">11:00</span>
                        </button>
                        <button
                          type="button"
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                          onClick={() => {
                            const newDate = new Date();
                            newDate.setHours(14, 0, 0, 0);
                            handleAddTimeSlot(newDate);
                          }}
                        >
                          <span className="text-sm font-medium text-gray-900 dark:text-white">14:00</span>
                        </button>
                        <button
                          type="button"
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                          onClick={() => {
                            const newDate = new Date();
                            newDate.setHours(16, 0, 0, 0);
                            handleAddTimeSlot(newDate);
                          }}
                        >
                          <span className="text-sm font-medium text-gray-900 dark:text-white">16:00</span>
                        </button>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        Click on a time to add it as a slot option
                      </div>
                    </div>
                  </div>

                  {/* Selected time slots */}
                  <div className="space-y-2">
                    {selectedTimeSlots.map((slot, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {slot.date.toLocaleString(undefined, {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveTimeSlot(index)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Select Interview Types */}
            {step === 3 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Select Interview Types
                </h3>
                <div className="space-y-4">
                  {/* Interview type options */}
                  <div className="flex space-x-2">
                    {interviewTypes.length < 3 && (
                      <>
                        <button
                          onClick={() => handleAddInterviewType('online')}
                          className="px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-500 dark:hover:bg-primary-900 dark:hover:text-primary-400 dark:hover:border-primary-500 transition-colors"
                        >
                          <Video className="w-4 h-4 inline mr-1" />
                          Online
                        </button>
                        <button
                          onClick={() => handleAddInterviewType('phone')}
                          className="px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-500 dark:hover:bg-primary-900 dark:hover:text-primary-400 dark:hover:border-primary-500 transition-colors"
                        >
                          <Phone className="w-4 h-4 inline mr-1" />
                          Phone
                        </button>
                        <button
                          onClick={() => handleAddInterviewType('offline')}
                          className="px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-500 dark:hover:bg-primary-900 dark:hover:text-primary-400 dark:hover:border-primary-500 transition-colors"
                        >
                          <Building2 className="w-4 h-4 inline mr-1" />
                          Offline
                        </button>
                      </>
                    )}
                  </div>

                  {/* Selected interview types */}
                  <div className="space-y-3">
                    {interviewTypes.map((type, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {type.type === 'online' && <Video className="w-4 h-4 mr-2" />}
                            {type.type === 'phone' && <Phone className="w-4 h-4 mr-2" />}
                            {type.type === 'offline' && <Building2 className="w-4 h-4 mr-2" />}
                            <span className="text-sm font-medium capitalize">{type.type}</span>
                          </div>
                          <button
                            onClick={() => handleRemoveInterviewType(index)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Online platforms */}
                        {type.type === 'online' && (
                          <div className="mt-2 space-x-2">
                            <select
                              value={type.platform || ''}
                              onChange={(e) => handleUpdateInterviewType(index, { platform: e.target.value as OnlinePlatform })}
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            >
                              <option value="">Select Platform</option>
                              <option value="zoom">Zoom</option>
                              <option value="teams">Microsoft Teams</option>
                              <option value="google">Google Meet</option>
                            </select>
                          </div>
                        )}

                        {/* Offline location */}
                        {type.type === 'offline' && (
                          <div className="mt-2 space-y-2">
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id={`hq-${index}`}
                                name={`location-${index}`}
                                checked={type.location === 'hq'}
                                onChange={() => handleUpdateInterviewType(index, { location: 'hq' })}
                                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                              />
                              <label htmlFor={`hq-${index}`} className="text-sm text-gray-700 dark:text-gray-300">
                                Startup HQ
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id={`alt-${index}`}
                                name={`location-${index}`}
                                checked={type.location === 'alternative'}
                                onChange={() => handleUpdateInterviewType(index, { location: 'alternative' })}
                                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                              />
                              <label htmlFor={`alt-${index}`} className="text-sm text-gray-700 dark:text-gray-300">
                                Alternative Address
                              </label>
                            </div>
                            {type.location === 'alternative' && (
                              <input
                                type="text"
                                placeholder="Enter address"
                                value={type.alternativeAddress || ''}
                                onChange={(e) => handleUpdateInterviewType(index, { alternativeAddress: e.target.value })}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={
                  (step === 1 && !preselectedCandidate && !selectedCandidate) ||
                  (step === 2 && selectedTimeSlots.length === 0)
                }
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={interviewTypes.length === 0}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Interview Request
              </button>
            )}
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="mt-3 sm:mt-0 sm:mr-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:w-auto sm:text-sm"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="mt-3 sm:mt-0 sm:mr-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 