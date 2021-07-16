import { PaginationOutput, PaginationParams } from "src/api/common";

export interface IUsersState {
  data: PaginationOutput | null;
  filters: any;
  pagination: PaginationParams;
}
