import type { IResponse } from "@/types";
import type { IJob, IJobFilters, IJobsResponse } from "@/types/job.types";
import { baseApi } from "../../baseApi";

export const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation<IResponse<IJob>, IJob>({
      query: (jobInfo) => ({
        url: "/jobs/create",
        method: "POST",
        data: jobInfo,
      }),
      invalidatesTags: ["JOB"],
    }),

    getAllJobs: builder.query<IResponse<IJobsResponse>, IJobFilters>({
      query: (params) => ({
        url: "/jobs",
        method: "GET",
        params,
      }),
      providesTags: ["JOB"],
    }),
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
