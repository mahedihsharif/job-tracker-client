import AddJobDialog from "@/components/add-job-dialog/AddJobDialog";
import JobFilters from "@/components/job-filters/JobFilters";
import JobTable from "@/components/job-table/JobTable";
import Profile from "@/components/profile/Profile";
import SummaryCard from "@/components/summary-card/SummaryCard";
import { sampleJobs } from "@/lib/sample-data";
import type { JobFilters as Filters, Job } from "@/lib/types";
import { Briefcase } from "lucide-react";
import { useMemo, useState } from "react";

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>(sampleJobs);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "all",
    applyDateStart: undefined,
    applyDateEnd: undefined,
    lastDateStart: undefined,
    lastDateEnd: undefined,
  });

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(searchLower);
        const matchesCompany = job.company.toLowerCase().includes(searchLower);
        if (!matchesTitle && !matchesCompany) return false;
      }

      // Status filter
      if (filters.status !== "all" && job.status !== filters.status) {
        return false;
      }

      // Apply date range filter
      if (filters.applyDateStart || filters.applyDateEnd) {
        const applyDate = new Date(job.applyDate);
        if (filters.applyDateStart && applyDate < filters.applyDateStart) {
          return false;
        }
        if (filters.applyDateEnd && applyDate > filters.applyDateEnd) {
          return false;
        }
      }

      // Last date range filter
      if (filters.lastDateStart || filters.lastDateEnd) {
        const lastDate = new Date(job.lastDate);
        if (filters.lastDateStart && lastDate < filters.lastDateStart) {
          return false;
        }
        if (filters.lastDateEnd && lastDate > filters.lastDateEnd) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, filters]);

  const handleAddJob = (jobData: Omit<Job, "id">) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  const handleUpdateJob = (updateJobData: Job) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === updateJobData.id ? updateJobData : job)),
    );
  };

  const handleDeleteJob = (id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Headers */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Job Tracker
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage and track your job applications
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-10">
            {/* add job  */}
            <AddJobDialog onAddJob={handleAddJob} />
            {/* user profile */}
            <Profile />
          </div>
        </div>
        {/* summary card */}
        <div className="mb-8">
          <SummaryCard jobs={jobs} />
        </div>
        {/* Filters Section*/}
        <div className="mb-6">
          <JobFilters filters={filters} onFiltersChange={setFilters} />
        </div>
        {/* Job Table */}
        <JobTable
          jobs={filteredJobs}
          onUpdateJob={handleUpdateJob}
          onDeleteJob={handleDeleteJob}
        />
      </div>
    </div>
  );
};

export default Home;
