export type PageId = 
  | 'home' 
  | 'solutions' 
  | 'industries' 
  | 'how-it-works' 
  | 'work' 
  | 'about' 
  | 'contact' 
  | 'privacy' 
  | 'terms';

export interface SolutionItem {
  id: string;
  letter: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  integrationNote: string;
  idealFor: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  category: string;
  headline: string;
  operationalChallenge: string;
  exampleWorkflow: {
    inbound: string;
    processing: string;
    action: string;
    followUp: string;
  };
  proposedAutomation: string[];
  operationalBenefits: string[];
  imageSrc: string;
  imageAlt: string;
}

export type ProjectStatus = 'Concept / Demonstration' | 'Prototype / Demonstration' | 'Internal Product / In Development' | 'Verified Client Work';

export interface CaseStudyItem {
  id: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  statusType: 'concept' | 'prototype' | 'internal' | 'verified';
  summary: string;
  problemStatement: string;
  intendedAudience: string;
  solutionArchitecture: string[];
  workflowSteps: {
    step: string;
    name: string;
    detail: string;
  }[];
  technologies: string[];
  featuresDemonstrated: string[];
  testingPerformed: string[];
  limitations: string[];
  verifiedResultsNote?: string;
}

export interface StrategyCallSubmission {
  id: string;
  createdAt: string;
  fullName: string;
  businessName: string;
  workEmail: string;
  businessPhone?: string;
  website?: string;
  industry: string;
  stateOrCity: string;
  businessSize?: string;
  mainChallenge: string;
  preferredContact: 'video' | 'phone' | 'email';
  projectDetails?: string;
}
