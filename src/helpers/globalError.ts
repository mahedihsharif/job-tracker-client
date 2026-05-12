import type { IErrorResponse } from "@/types";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type RTKError = FetchBaseQueryError | SerializedError;

export const globalErrorResponse = (error: RTKError): IErrorResponse | null => {
  if (
    error &&
    typeof error === "object" &&
    "status" in error &&
    "data" in error
  ) {
    const err = error as FetchBaseQueryError;
    return err as IErrorResponse;
  }
  return null;
};
