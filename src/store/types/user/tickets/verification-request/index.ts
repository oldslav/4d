import { PaginationOutput, PaginationParams } from "src/api/common";

export interface IUserVerificationRequestState {
  pagination: PaginationParams,
  data: PaginationOutput | null,
  references: Record<string, any>
}


