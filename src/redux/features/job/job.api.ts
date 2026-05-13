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
  }),
});

export const { useCreateJobMutation, useGetAllJobsQuery } = jobApi;
