import { PaginationOutput, PaginationParams, Service } from "src/api/common";
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

export class TicketsService extends Service {
  public static getTicketsLiving (params: unknown): AxiosPromise<TicketsResponse> {
    return this.api.get("/api/v1/services/apartments/user/tickets", { params });
  }
  
  public static deleteTicketLiving (id: number): AxiosPromise<TicketsResponse> {
    return this.api.put(`/api/v1/services/apartments/user/tickets/${ id }/cancel`);
  }
}
