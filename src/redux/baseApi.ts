import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
// Create a base API slice using RTK Query with Axios as the base query function
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["AUTH", "JOB"],
  endpoints: () => ({}),
});
