import type { IResponse } from "@/types";
import type { IJob, IJobFilters, IJobsResponse } from "@/types/job.types";
import { baseApi } from "../../baseApi";

export const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new job
    createJob: builder.mutation<IResponse<IJob>, IJob>({
      query: (jobInfo) => ({
        url: "/jobs/create",
        method: "POST",
        data: jobInfo,
      }),
      invalidatesTags: ["JOB"],
    }),
    // Get all jobs with optional filters
    getAllJobs: builder.query<IResponse<IJobsResponse>, IJobFilters>({
      query: (params) => ({
        url: "/jobs",
        method: "GET",
        params,
      }),
      providesTags: ["JOB"],
    }),
    // Update a job by ID
    updateJob: builder.mutation<
      IResponse<Partial<IJob>>,
      { jobInfo: Partial<IJob>; _id: string }
    >({
      query: ({ jobInfo, _id }) => ({
        url: `/jobs/${_id}`,
        method: "PATCH",
        data: jobInfo,
      }),
      invalidatesTags: ["JOB"],
    }),
    // Delete a job by ID
    deleteJob: builder.mutation<IResponse<string>, { _id: string }>({
      query: ({ _id }) => ({
        url: `/jobs/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["JOB"],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetAllJobsQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobApi;
