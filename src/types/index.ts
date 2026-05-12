import type { IErrorData } from "./error.types";

export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IErrorResponse {
  data: IErrorData;
  status: number;
}
