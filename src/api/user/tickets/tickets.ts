import { PaginationOutput, PaginationParams } from "src/api/common";
import Axios, { AxiosPromise } from "axios";

interface TicketsRequestFilters {
  statusId: Array<number>;
  dateStart: Date;
  dateEnd: Date;
}

interface TicketsQuery extends PaginationParams {
  filters: Partial<TicketsRequestFilters>;
  sort: string;
  order: string;
}

interface TicketResponse {

}

export interface TicketsResponse extends PaginationOutput {
  items: TicketResponse[];
}

export class TicketsService {
  public static getTicketsLiving (params: unknown): AxiosPromise<TicketsResponse> {
    return Axios.get("/api/v1/services/apartments/user/tickets", { params });
  }
}
