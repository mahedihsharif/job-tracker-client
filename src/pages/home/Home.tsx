/* eslint-disable @typescript-eslint/no-explicit-any */
import AddJobDialog from "@/components/add-job-dialog/AddJobDialog";
import JobFilters from "@/components/job-filters/JobFilters";
import JobTable from "@/components/job-table/JobTable";
import Profile from "@/components/profile/Profile";
import DashboardSkeleton from "@/components/skeleton/DashboardSkeleton";
import SummaryCard from "@/components/summary-card/SummaryCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { globalErrorResponse } from "@/helpers/globalError";
import {
  useCreateJobMutation,
  useDeleteJobMutation,
  useGetAllJobsQuery,
  useUpdateJobMutation,
} from "@/redux/features/job/job.api";
import type { IJob } from "@/types/job.types";
import { Briefcase } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const [updateJob] = useUpdateJobMutation();
  const [deleteJob] = useDeleteJobMutation();
  const [filters, setFilters] = useState<{
    search?: string;
    status?: string;
    page: number;
    limit: number;
    apply_date_start?: string;
    apply_date_end?: string;
    last_date_start?: string;
    last_date_end?: string;
  }>({
    search: "",
    status: "all",
    page: 1,
    limit: 10,
    apply_date_start: "",
    apply_date_end: "",
    last_date_start: "",
    last_date_end: "",
  });
  const { data, isLoading, isFetching } = useGetAllJobsQuery({
    ...filters,
    status: filters.status === "all" ? undefined : filters.status,
    apply_date_start:
      filters.apply_date_start && filters.apply_date_end
        ? filters.apply_date_start
        : undefined,
    apply_date_end:
      filters.apply_date_start && filters.apply_date_end
        ? filters.apply_date_end
        : undefined,
    last_date_start:
      filters.last_date_start && filters.last_date_end
        ? filters.last_date_start
        : undefined,
    last_date_end:
      filters.last_date_start && filters.last_date_end
        ? filters.last_date_end
        : undefined,
  });

  const [createJob] = useCreateJobMutation();
  const total = data?.data?.total ?? 0;
  const totalPages = Math.ceil(total / filters.limit);
  //filter jobs on client side based on search and date filters..
  const filteredJobs = useMemo(() => {
    return data?.data?.jobs?.filter((job: IJob) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesTitle = job.job_title.toLowerCase().includes(searchLower);
        const matchesCompany = job.company_name
          .toLowerCase()
          .includes(searchLower);
        if (!matchesTitle && !matchesCompany) return false;
      }

      // Status filter
      if (filters.status !== "all" && job.status !== filters.status) {
        return false;
      }

      // Apply date range filter
      const applyDateStart = filters.apply_date_start;
      const applyDateEnd = filters.apply_date_end;
      if (applyDateStart && applyDateEnd) {
        if (!job.apply_date) return false;
        const applyDate = new Date(job.apply_date);

        if (applyDate < new Date(applyDateStart)) {
          return false;
        }
        if (applyDate > new Date(applyDateEnd)) {
          return false;
        }
      }

      // Last date range filter
      const lastDateStart = filters.last_date_start;
      const lastDateEnd = filters.last_date_end;
      if (lastDateStart && lastDateEnd) {
        if (!job.last_date) return false;
        const lastDate = new Date(job.last_date);
        if (lastDate < new Date(lastDateStart)) {
          return false;
        }
        if (lastDate > new Date(lastDateEnd)) {
          return false;
        }
      }

      return true;
    });
  }, [data?.data?.jobs, filters]);

  //loading state
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  //add new job
  const handleAddJob = async (jobData: IJob) => {
    try {
      await createJob(jobData).unwrap();
    } catch (error: any) {
      const errors = globalErrorResponse(error);

      if (errors && errors?.data !== null && typeof errors.data === "object") {
        const errorSources = (errors.data as any).errorSources;

        //Zod validation error
        if (Array.isArray(errorSources) && errorSources.length > 0) {
          errorSources.forEach((singleError: any) => {
            if (singleError?.message) {
              toast.error(singleError.message);
            }
          });
        }
        //Normal error
        else {
          toast.error((errors.data as any)?.message || "Something went wrong");
        }
      }
    }
  };

  //update job
  const handleUpdateJob = async (updateJobData: IJob) => {
    if (!updateJobData._id) {
      toast.error("Job ID is missing");
      return;
    }
    try {
      await updateJob({
        jobInfo: updateJobData,
        _id: updateJobData._id,
      }).unwrap();
    } catch (error) {
      if (error) {
        const err = globalErrorResponse(error);
        if (err && typeof err.data === "object" && err.data !== null) {
          toast.error((err.data as any).message);
        }
      }
    }
  };
  //delete job
  const handleDeleteJob = async (id: string) => {
    try {
      await deleteJob({ _id: id }).unwrap();
    } catch (error) {
      if (error) {
        const err = globalErrorResponse(error);
        if (err && typeof err.data === "object" && err.data !== null) {
          toast.error((err.data as any).message);
        }
      }
    }
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
          <SummaryCard
            total={data?.data?.total ?? 0}
            counts={
              data?.data?.counts ?? { pending: 0, applied: 0, shortlisted: 0 }
            }
          />
        </div>
        {/* Filters Section*/}
        <div className="mb-6">
          <JobFilters filters={filters} onFiltersChange={setFilters} />
        </div>
        {/* Job Table */}
        <JobTable
          jobs={filteredJobs ?? []}
          isFetching={isFetching}
          onUpdateJob={handleUpdateJob}
          onDeleteJob={handleDeleteJob}
        />
        {/* pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
                }
                className={
                  filters.page === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, page: pageNum }))
                    }
                    isActive={filters.page === pageNum}
                    className="cursor-pointer"
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
                }
                className={
                  filters.page === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Home;
