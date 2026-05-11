export type JobStatus = "pending" | "applied" | "shortlisted";

export interface Job {
  id: string;
  title: string;
  company: string;
  minSalary: number;
  maxSalary: number;
  details: string;
  email: string;
  skills: string[];
  applyDate: string;
  lastDate: string;
  status: JobStatus;
}

export interface JobFilters {
  search: string;
  status: JobStatus | "all";
  applyDateStart: Date | undefined;
  applyDateEnd: Date | undefined;
  lastDateStart: Date | undefined;
  lastDateEnd: Date | undefined;
}
