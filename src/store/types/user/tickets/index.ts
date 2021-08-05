import { PaginationOutput, PaginationParams } from "src/api/common";

interface IUserTickets extends PaginationOutput {}

interface IUserTicketsPagination extends PaginationParams {}

export interface IUserTicketsState {
  filters: any;
  pagination: IUserTicketsPagination;
  data: IUserTickets | null;
  current?: any | null;
}
