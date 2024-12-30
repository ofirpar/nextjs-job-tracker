export enum InterviewStatus {
  applied,
  interviewing,
  offered,
  rejected,
}

export interface Opportunity {
  id: number;
  status: InterviewStatus; // Use union type for known statuses
  company: {
    name: string;
    location: string;
  };
  stack: string[]; // Array of strings
}
