import { Response } from "express";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

export const responseSuccess = <T>(
  res: Response,
  status: number,
  message: string,
  data?: T
): void => {
  const response: ApiResponse<T> = { success: true, message, data };
  res.status(status).json(response);
};

export const responseError = (
  res: Response,
  status: number,
  message: string,
  error?: any
): void => {
  const response: ApiResponse<never> = { success: false, message, error };
  res.status(status).json(response);
};
