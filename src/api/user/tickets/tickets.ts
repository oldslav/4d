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
  public static getTicketsLiving (params: Partial<TicketsQuery>): AxiosPromise<TicketsResponse> {
    return Axios.get("/services/apartments/tickets", { params, skipAuth: true });
  }
}
