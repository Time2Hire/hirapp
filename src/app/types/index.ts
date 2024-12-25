export interface JobAd {
  id: number;
  status: 'draft' | 'published' | 'closed';
  title: string;
  company: {
    name: string;
    logo: string;
    description: string;
    headquarters: string;
    founded: string;
    employees: string;
    industry: string;
  };
  location: {
    street?: string;
    postalCode?: string;
    city: string;
    state: string;
    country: string;
  } | null;
  type: 'Full-time' | 'Part-time' | 'Contract';
  workType: 'Remote' | 'Hybrid' | 'Onsite';
  level: 'Entry' | 'Junior' | 'Middle' | 'Senior' | 'Lead';
  reportingTo?: string;
  compensation: {
    salary: string;
    currency: string;
    interval: string;
    vsop: boolean;
    vsopDetails?: string;
  };
  requirements: {
    skills: string[];
    experience: number;
    languages: { language: string; level: string }[];
  };
  tasks: string[];
  benefits?: string[];
  postedAt: string;
  applicants: number;
  skillMatch: number;
}

export interface CandidateProfile {
  id: string;
  personalInfo: {
    name: string;
    location: {
      city: string;
      country: string;
    };
  };
  preferences: {
    workLocation: string;
    jobStatus: 'actively_searching' | 'open_to_offers';
    salary: {
      amount: number;
      currency: string;
    };
  };
  matchScore: number;
  talents: Array<{
    category: string;
    name: string;
    yearsOfExperience?: number;
    rating?: string;
  }>;
  experiences: Array<{
    position: string;
    employer: string;
    yearsOfExperience?: number;
  }>;
  skills: string[];
  professionalSkills: string[];
  languages: { language: string; level: string; verified?: boolean }[];
  availability: string;
  workType: string;
  employmentType: string;
} 