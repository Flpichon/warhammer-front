export type ApiErrorData = {
  status: number;
  message: string;
  details?: unknown;
};
export class ApiError extends Error {
  readonly status: number;
  readonly details?: unknown;
  constructor(data: ApiErrorData) {
    super(data.message);
    this.name = "ApiError";
    this.status = data.status;
    this.details = data.details;
  }
}
export function isApiError(err: unknown): err is ApiError {
  return err instanceof ApiError;
}
