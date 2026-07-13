'use client';

export interface Job {
  id: string;
  title: string;
  company: string;
  logoColor: string;
  logoInitials: string;
  salary: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  remote: boolean;
  postedDate: string;
  accessibilityBadges: string[]; // e.g., 'Screen Reader Compatible', 'Accessible Interview', 'Inclusive Hiring'
  accommodations: {
    interview: string[];
    documents: string[];
    communication: string[];
    workplace: string[];
  };
  description: string;
  requirements: string[];
  benefits: string[];
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'Applied' | 'Screening' | 'Interviewing' | 'Offered' | 'Declined';
  accommodationsRequested: string[];
}

// 1. Core manual jobs representing baseline examples
const manualJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Licensed Massage Therapist (Masahista)',
    company: 'Vibe Wellness Spa Manila',
    logoColor: 'bg-amber-600',
    logoInitials: 'VM',
    salary: '₱18,000 - ₱24,000 + Commissions',
    location: 'Quezon City, Metro Manila',
    type: 'Full-time',
    remote: false,
    postedDate: '2 days ago',
    accessibilityBadges: ['Blind & Low Vision Friendly', 'Accessible Recruitment', 'Service Dog Friendly'],
    accommodations: {
      interview: ['Oral Interview Format', 'Braille Documents Provided', 'Assisted Forms Filling'],
      documents: ['Braille Formats on Request', 'Audio Readouts Offered', 'Screen Reader Friendly Specs'],
      communication: ['Voice-based Channels', 'Direct Phone Call support'],
      workplace: ['Tactile floor guide paths', 'Service Dog Friendly lobby', 'Sighted guide assistance available'],
    },
    description: 'Vibe Spa Manila is looking for DOH-Licensed Massage Therapists. We have a dedicated partnership with local PWD associations and DSWD to provide a fully blind-friendly working environment, complete with tactile pathways, sighted guides, and voice-assisted booking systems.',
    requirements: [
      'Valid Department of Health (DOH) Massage Therapist License.',
      'Willingness to work in shifts (day/night options).',
      'Friendly customer communication skills.',
      'Open to candidates with partial or total visual impairment (Blind).',
    ],
    benefits: [
      'Guaranteed base salary + 20% service commission per client.',
      'Free lodging/accommodation options for stay-in staff.',
      'HMO health coverage.',
      'Annual uniform allowance.',
    ],
  },
  {
    id: 'job-2',
    title: 'Kitchen & Pastry Crew (Deaf Friendly)',
    company: 'Elait! Rolled Ice Cream & Desserts',
    logoColor: 'bg-pink-600',
    logoInitials: 'E!',
    salary: '₱16,000 - ₱18,000',
    location: 'Pasig City, Metro Manila',
    type: 'Full-time',
    remote: false,
    postedDate: '1 week ago',
    accessibilityBadges: ['Sign Language interpreter', 'Accessible Recruitment', 'Inclusive Hiring'],
    accommodations: {
      interview: ['Sign Language Interpreter Present', 'Written Questionnaire Option', 'Visual Slide Presentation'],
      documents: ['Visual Guides & Manuals', 'Written Training Materials'],
      communication: ['Text/Chat communication channels', 'Direct Sign Language support'],
      workplace: ['Visual safety light indicators (flashing fire alerts)', 'Menu cards for customer ordering', 'Deaf-friendly visual POS systems'],
    },
    description: 'Elait! is a local dessert brand proud to employ deaf staff. We are looking for Kitchen and Rolled Ice Cream Crew. Candidates will prepare ingredients, scoop ice cream, and interact with customers using Visual Order cards and writing boards.',
    requirements: [
      'Basic understanding of sign language (FSL or ASL).',
      'Active health card (Sanitary Permit for food handlers).',
      'Open to deaf, hard-of-hearing, and speech-impaired individuals.',
      'No prior restaurant experience needed; visual sign-language training provided.',
    ],
    benefits: [
      'Government mandated benefits (SSS, PhilHealth, Pag-IBIG).',
      'Free staff meals and uniform.',
      'Tips and sales performance shares.',
      'Deaf community integration and sign language workspace.',
    ],
  },
  {
    id: 'job-3',
    title: 'Data Encoder & Office Associate',
    company: 'SM Prime Holdings',
    logoColor: 'bg-blue-800',
    logoInitials: 'SM',
    salary: '₱17,000 - ₱20,000',
    location: 'Pasay City, Metro Manila',
    type: 'Full-time',
    remote: false,
    postedDate: '4 days ago',
    accessibilityBadges: ['Wheelchair Accessible', 'Accessible Recruitment', 'Inclusive Hiring'],
    accommodations: {
      interview: ['Accessible ground-floor interview room', 'Step-free ramp entry paths'],
      documents: ['Digital Form options', 'Large Font Documents'],
      communication: ['Assisted in-person support'],
      workplace: ['Step-free automatic doors', 'Wheelchair accessible washrooms', 'Ergonomic adjustable height desk', 'Elevator accessibility close to parking'],
    },
    description: 'SM Mall Operations head office is fully wheelchair-accessible. We are seeking a Data Encoder to review daily sales receipts, enter ledger updates into our operations database, and route administrative files.',
    requirements: [
      'Minimum typing speed of 35 words per minute.',
      'Basic knowledge of Microsoft Excel/Word.',
      'Open to candidates with orthopedic, physical, or mobility limitations.',
      'High school or Senior High graduate.',
    ],
    benefits: [
      'Dedicated designated parking space close to the entrance elevator.',
      'SM Store purchase discounts.',
      'HMO healthcare insurance from Day 1.',
      'Government benefits (SSS, Pag-IBIG, PhilHealth).',
    ],
  },
  {
    id: 'job-4',
    title: 'Virtual Assistant & Transcriptionist',
    company: 'Virtualahan',
    logoColor: 'bg-green-600',
    logoInitials: 'VL',
    salary: '₱22,000 - ₱30,000',
    location: 'Davao City (100% Work from Home)',
    type: 'Full-time',
    remote: true,
    postedDate: '3 days ago',
    accessibilityBadges: ['Remote Interview', 'Screen Reader Friendly', 'Inclusive Hiring'],
    accommodations: {
      interview: ['100% Online video interview', 'Written interview option', 'Flexible scheduling'],
      documents: ['Accessible text-only specifications', 'Screen Reader friendly formats'],
      communication: ['Slack/Discord messaging channels', 'E-mail updates preferred'],
      workplace: ['100% remote job scope', 'Flexible daily working hours', 'Mental wellness leaves'],
    },
    description: 'Virtualahan is a premier Philippine social enterprise. We are hiring a Remote Virtual Assistant for international clients. Tasks include calendar scheduling, document transcription, email sorting, and social media posting.',
    requirements: [
      'Own computer/laptop with reliable home internet.',
      'Good reading and writing skills in English.',
      'Open to candidates with physical, sensory, or visual limitations (screen reader users welcome).',
      'Paid virtual training is provided.',
    ],
    benefits: [
      '100% Work from home setup.',
      'Internet subsidy allowance.',
      'Access to premium training certifications.',
      'PWD support circles and mental wellness coaching.',
    ],
  },
  {
    id: 'job-5',
    title: 'Laundry Folder & Packaging Staff',
    company: 'QuickClean Laundry Shop Manila',
    logoColor: 'bg-teal-600',
    logoInitials: 'QC',
    salary: '₱14,000 - ₱16,000',
    location: 'Manila City, Metro Manila',
    type: 'Full-time',
    remote: false,
    postedDate: '5 days ago',
    accessibilityBadges: ['Neurodivergent Friendly', 'Accessible Recruitment', 'Inclusive Hiring'],
    accommodations: {
      interview: ['Simple verbal instructions', 'On-site trial session instead of written tests'],
      documents: ['Color-coded instruction manuals', 'Visual step-by-step posters'],
      communication: ['Direct visual demonstration', 'Single-task instructions'],
      workplace: ['Highly structured daily tasks', 'Calm and steady workspace environment', 'Frequent breaks option'],
    },
    description: 'QuickClean Manila is looking for Laundry Folders. The role involves sorting clean clothes, folding them, putting them into visual size categories, and packing them into plastic wrappers. We have simple color-coded charts to help guide the process.',
    requirements: [
      'Ability to follow basic visual step-by-step diagrams.',
      'Good hand-eye coordination.',
      'Open to candidates with mild developmental, learning, or cognitive limitations (Autism, Down Syndrome, or ADHD).',
      'Supportive job coach visits are welcome on-site.',
    ],
    benefits: [
      'SSS, PhilHealth, Pag-IBIG benefits.',
      'Free uniform and personal protective equipment (PPE).',
      'Paid daily overtime bonuses.',
      'Highly supportive and friendly team staff.',
    ],
  }
];

// 2. Data generators for programmatic items
const philippineCities = [
  'Manila City, Metro Manila',
  'Quezon City, Metro Manila',
  'Pasay City, Metro Manila',
  'Pasig City, Metro Manila',
  'Taguig City, Metro Manila',
  'Makati City, Metro Manila',
  'Cebu City, Visayas',
  'Davao City, Mindanao',
  'Iloilo City, Visayas',
  'Baguio City, Luzon',
  'Cagayan de Oro, Mindanao',
  'Angeles City, Pampanga',
  'Bacoor City, Cavite',
  'Antipolo City, Rizal'
];

const companiesList = [
  { name: 'SM Prime Holdings', initials: 'SM', color: 'bg-blue-800' },
  { name: 'Vibe Wellness Spa', initials: 'VM', color: 'bg-amber-600' },
  { name: 'Elait! Rolled Desserts', initials: 'E!', color: 'bg-pink-600' },
  { name: 'Virtualahan BPO', initials: 'VL', color: 'bg-green-600' },
  { name: 'QuickClean Laundry', initials: 'QC', color: 'bg-teal-600' },
  { name: 'Accenture Philippines', initials: 'AC', color: 'bg-purple-700' },
  { name: 'Teleperformance PH', initials: 'TP', color: 'bg-red-600' },
  { name: 'TaskUs Philippines', initials: 'TP', color: 'bg-yellow-500' },
  { name: 'Jollibee Foods Corp.', initials: 'JFC', color: 'bg-red-500' },
  { name: 'Shakeys Philippines', initials: 'SPC', color: 'bg-green-850' },
  { name: 'Watsons Personal Care', initials: 'W', color: 'bg-cyan-700' },
  { name: 'BDO Unibank Office', initials: 'BDO', color: 'bg-yellow-600' },
  { name: 'Convergy PH Group', initials: 'CV', color: 'bg-indigo-600' }
];

const templates = [
  // Category 1: Visual Impairment
  {
    titles: [
      'Licensed Massage Therapist',
      'Wellness Center Masseuse',
      'Reflexology Specialist',
      'Audio Transcripionist & Scribe',
      'Telephone Customer Support Representative'
    ],
    accessibilityBadges: ['Blind & Low Vision Friendly', 'Accessible Recruitment', 'Service Dog Friendly'],
    accommodations: {
      interview: ['Oral Interview Format', 'Braille Documents Provided', 'Assisted Forms Filling'],
      documents: ['Braille Formats on Request', 'Audio Readouts Offered', 'Screen Reader Friendly Specs'],
      communication: ['Voice-based Channels', 'Direct Phone Call support'],
      workplace: ['Tactile floor guide paths', 'Service Dog Friendly lobby', 'Sighted guide assistance available'],
    },
    description: 'Provide therapeutic wellness services or transcribe voice logs for operations. Workspaces are tailored for visually impaired individuals, featuring tactile paths, sound alert indicators, and guide dog rest mats.',
    requirements: [
      'Understands vocal cues and customer relations patterns.',
      'Active licensing or technical certs if applicable.',
      'Open to blind and low-vision applicants.'
    ],
    benefits: [
      'Lodging accommodations support.',
      'HMO health card coverage.',
      'Commission shares per service.',
      'Government benefits.'
    ],
    baseSalary: 18000,
    remote: false
  },
  // Category 2: Hearing Impairment
  {
    titles: [
      'Kitchen & Dessert Associate',
      'Baker & Pastry Assistant',
      'Warehouse Organizer & Sorter',
      'Document Scanning Staff',
      'Data Entry Assistant (Silent)'
    ],
    accessibilityBadges: ['Sign Language interpreter', 'Accessible Recruitment', 'Inclusive Hiring'],
    accommodations: {
      interview: ['Sign Language Interpreter Present', 'Written Questionnaire Option', 'Visual Slide Presentation'],
      documents: ['Visual Guides & Manuals', 'Written Training Materials'],
      communication: ['Text/Chat communication channels', 'Direct Sign Language support'],
      workplace: ['Visual safety light indicators (flashing fire alerts)', 'Menu cards for customer ordering', 'Deaf-friendly visual POS systems'],
    },
    description: 'Prepare items, package inventory, or process text databases. Workspaces are modified for deaf and speech-impaired crews, offering visual POS setups, flashing emergency alarms, and translation logs.',
    requirements: [
      'Basic knowledge of visual signs (FSL).',
      'Sanitary permit for food roles if applicable.',
      'Attentive and organized work habits.'
    ],
    benefits: [
      'Sign-language training pathways.',
      'Free uniforms and personal protection equipment.',
      'Daily meals subsidy.',
      'SSS, Pag-IBIG, PhilHealth.'
    ],
    baseSalary: 16500,
    remote: false
  },
  // Category 3: Mobility Impairment
  {
    titles: [
      'Virtual Assistant (Remote)',
      'Chat Support Associate',
      'Excel Data Encoder',
      'Database Admin Clerk',
      'Operations Support Coordinator'
    ],
    accessibilityBadges: ['Remote Interview', 'Wheelchair Accessible', 'Inclusive Hiring'],
    accommodations: {
      interview: ['Accessible ground-floor interview room', 'Step-free ramp entry paths', '100% Online video interview'],
      documents: ['Digital Form options', 'Large Font Documents', 'Screen Reader friendly formats'],
      communication: ['Assisted in-person support', 'Slack/Discord messaging channels'],
      workplace: ['Step-free automatic doors', 'Wheelchair accessible washrooms', 'Ergonomic adjustable height desk', 'Elevator accessibility close to parking'],
    },
    description: 'Maintain databases, respond to user query charts, and organize documents. The office spaces are fully step-free with elevator systems, ramps, and accessible bathrooms. Remote setups are also supported.',
    requirements: [
      'Basic typing skills (35 WPM).',
      'Familiarity with online document editing tools.',
      'Open to applicants with orthopedic or mobility limitations.'
    ],
    benefits: [
      'Dedicated accessible workspace layouts.',
      'HMO health coverage from Day 1.',
      'Designated accessibility parking slots.',
      'Home-office stipend for remote agents.'
    ],
    baseSalary: 21000,
    remote: true
  },
  // Category 4: Neurodivergent
  {
    titles: [
      'Laundry Folder & Packaging Staff',
      'Office Archiving Clerk',
      'Inventory Stocking Assistant',
      'Document Sorter',
      'Assembly Line Sorter'
    ],
    accessibilityBadges: ['Neurodivergent Friendly', 'Accessible Recruitment', 'Inclusive Hiring'],
    accommodations: {
      interview: ['Simple verbal instructions', 'On-site trial session instead of written tests'],
      documents: ['Color-coded instruction manuals', 'Visual step-by-step posters'],
      communication: ['Direct visual demonstration', 'Single-task instructions'],
      workplace: ['Highly structured daily tasks', 'Calm and steady workspace environment', 'Frequent breaks option'],
    },
    description: 'Fold, package, categorize, and organize stock records. daily workflows use simple visual checklists and colour-coded charts. Workspaces are structured, quiet, and low-stimulant.',
    requirements: [
      'Comfortable with repetitive and highly structured patterns.',
      'Detail-oriented organization habits.',
      'Open to learning/developmental disability classifications.'
    ],
    benefits: [
      'Calm and sensory-neutral workspace.',
      'On-site coaching support enabled.',
      'Overtime bonus structures.',
      'PhilHealth, Pag-IBIG, SSS.'
    ],
    baseSalary: 15000,
    remote: false
  }
];

// Generate jobs from index 6 to 100 programmatically
const generatedJobs: Job[] = [];
for (let i = 6; i <= 100; i++) {
  const comp = companiesList[i % companiesList.length];
  const temp = templates[i % templates.length];
  
  // Choose title and city based on index increments
  const titleIndex = i % temp.titles.length;
  const title = temp.titles[titleIndex];
  const location = philippineCities[i % philippineCities.length];
  
  // Add slight salary variations based on index
  const salaryShift = (i % 4) * 800 - 1200;
  const finalSalary = temp.baseSalary + salaryShift;
  
  // Settle job type ratios
  const isPartTime = i % 10 === 0;
  const isContract = i % 14 === 0;
  const isIntern = i % 25 === 0;
  const jobType: Job['type'] = isPartTime 
    ? 'Part-time' 
    : isContract 
    ? 'Contract' 
    : isIntern 
    ? 'Internship' 
    : 'Full-time';
    
  const remoteOpt = temp.remote && (i % 3 !== 0);
  
  // Format posted dates in a staggered manner
  const daysAgo = (i % 12) + 1;
  const postedDate = daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`;

  generatedJobs.push({
    id: `job-${i}`,
    title: `${title} (${jobType === 'Full-time' ? 'FT' : 'PT'})`,
    company: comp.name,
    logoColor: comp.color,
    logoInitials: comp.initials,
    salary: `₱${finalSalary.toLocaleString()} - ₱${(finalSalary + 4000).toLocaleString()}${temp.baseSalary === 18000 ? ' + Comm.' : ''}`,
    location: location,
    type: jobType,
    remote: remoteOpt,
    postedDate: postedDate,
    accessibilityBadges: temp.accessibilityBadges,
    accommodations: temp.accommodations,
    description: temp.description,
    requirements: temp.requirements,
    benefits: temp.benefits
  });
}

export const mockJobs: Job[] = [...manualJobs, ...generatedJobs];

// Helper functions for applications and saved jobs
export function getSavedJobIds(): string[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('trahabilidad-saved-jobs');
  return stored ? JSON.parse(stored) : [];
}

export function saveJob(id: string): string[] {
  const current = getSavedJobIds();
  if (!current.includes(id)) {
    const updated = [...current, id];
    localStorage.setItem('trahabilidad-saved-jobs', JSON.stringify(updated));
    return updated;
  }
  return current;
}

export function unsaveJob(id: string): string[] {
  const current = getSavedJobIds();
  const updated = current.filter((x) => x !== id);
  localStorage.setItem('trahabilidad-saved-jobs', JSON.stringify(updated));
  return updated;
}

export function getApplications(): Application[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('trahabilidad-applications');
  if (stored) return JSON.parse(stored);
  
  // Default applications to populate dashboard initially
  const defaultApps: Application[] = [
    {
      id: 'app-default-1',
      jobId: 'job-4',
      jobTitle: 'Virtual Assistant & Transcriptionist',
      company: 'Virtualahan',
      appliedDate: '2026-07-10',
      status: 'Interviewing',
      accommodationsRequested: ['Remote Interview', 'Screen Reader Readable Docs'],
    }
  ];
  localStorage.setItem('trahabilidad-applications', JSON.stringify(defaultApps));
  return defaultApps;
}

export function applyToJob(jobId: string, accommodations: string[]): Application {
  const job = mockJobs.find((j) => j.id === jobId);
  if (!job) throw new Error('Job not found');

  const newApp: Application = {
    id: `app-${Math.random().toString(36).substring(2, 9)}`,
    jobId,
    jobTitle: job.title,
    company: job.company,
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'Applied',
    accommodationsRequested: accommodations,
  };

  const current = getApplications();
  const updated = [newApp, ...current];
  localStorage.setItem('trahabilidad-applications', JSON.stringify(updated));
  return newApp;
}
