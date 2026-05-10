export type JobStatus = "pending" | "applied" | "shortlisted";

export interface Salary {
  min?: number;
  max?: number;
  currency?: string;
}

export interface IJob {
  _id?: string;
  job_title: string;
  company_name: string;
  salary?: Salary;
  job_details: string;
  apply_date?: string;
  last_date?: string;
  apply_email?: string;
  required_skills?: string[];
  status: JobStatus;
}

export interface IJobFilters {
  search?: string;
  status?: string;
  page: number;
  limit: number;
  apply_date_start?: string;
  apply_date_end?: string;
  last_date_start?: string;
  last_date_end?: string;
}
export interface IStatusCounts {
  pending: number;
  applied: number;
  shortlisted: number;
}
export interface IJobsResponse {
  jobs: IJob[];
  total: number;
  counts: IStatusCounts;
}
