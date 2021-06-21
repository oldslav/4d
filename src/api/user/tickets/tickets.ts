import { PaginationOutput, Service } from "src/api/common";
import { AxiosPromise } from "axios";

// interface TicketsRequestFilters {
//   statusId: Array<number>;
//   dateStart: Date;
//   dateEnd: Date;
// }

// interface TicketsQuery extends PaginationParams {
//   filters: Partial<TicketsRequestFilters>;
//   sort: string;
//   order: string;
// }

interface TicketResponse {

}

export interface TicketsResponse extends PaginationOutput {
  items: TicketResponse[];
}

export class TicketsService extends Service {
  public static getTicketsLiving (params: unknown): AxiosPromise<TicketsResponse> {
    return this.api.get("/api/v1/services/apartments/user/tickets", { params });
  }

  public static getEmployeeTicketsLiving (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/services/apartments/employee/tickets", { params });
  }

  public static createTicketLiving (params: any): AxiosPromise<TicketsResponse> {
    return this.api.post("/api/v1/services/apartments/user/tickets", { ...params });
  }

  public static addTicketLivingFile (id: number, params: unknown): AxiosPromise<TicketsResponse> {
    return this.api.post(`/api/v1/services/apartments/user/tickets/${ id }/file`, params);
  }

  public static deleteTicketLiving (id: number): AxiosPromise<TicketsResponse> {
    return this.api.put(`/api/v1/services/apartments/user/tickets/${ id }/cancel`);
  }

  public static requestApprovalLiving (id: number): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/apartments/user/tickets/${ id }/send_on_approval`);
  }

  public static rejectTicketLiving (id: number, reason: string): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/apartments/employee/tickets/${ id }/reject`, reason);
  }

  public static getTicketsParking (params: unknown): AxiosPromise<TicketsResponse> {
    return this.api.get("/api/v1/services/parking/user/tickets", { params });
  }

  public static createTicketParking (params: any): AxiosPromise<TicketsResponse> {
    return this.api.post("/api/v1/services/parking/user/tickets", { ...params });
  }

  public static addTicketsParkingFile (id: number, file: unknown): AxiosPromise<any> {
    return this.api.post(`/api/v1/services/parking/user/tickets/${ id }/file`, file);
  }

  public static getParkingBuildings (): AxiosPromise<any> {
    return this.api.get("/api/v1/services/parking/user");
  }

  public static getParkingPlaces (id: number): AxiosPromise<any> {
    return this.api.get(`/api/v1/services/parking/user/${ id }/places`);
  }

  public static getTicketsIdeas (params: any): AxiosPromise<any> {
    return this.api.get("api/v1/services/crowdsourcing/all", params);
  }

  public static createTicketWarehouse (payload: unknown): AxiosPromise<any> {
    return this.api.post("/api/v1/services/warehouse/user/tickets", payload);
  }

  public static addTicketsWarehouseFile (id: number, file: unknown): AxiosPromise<any> {
    return this.api.post(`/api/v1/services/warehouse/user/tickets/${ id }/file`, file);
  }
}
