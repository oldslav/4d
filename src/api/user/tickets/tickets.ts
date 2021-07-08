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

  public static addTicketLivingNeighbor (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`/api/v1/services/apartments/user/tickets/${ id }/neighbors`, payload);
  }

  public static addTicketLivingNeighborFile (id: number, ticketId: number, file: unknown): AxiosPromise<any> {
    return this.api.post(`/api/v1/services/apartments/user/tickets/${ ticketId }/neighbors/${ id }/file`, file);
  }

  public static deleteTicketLiving (id: number): AxiosPromise<TicketsResponse> {
    return this.api.put(`/api/v1/services/apartments/user/tickets/${ id }/cancel`);
  }

  public static requestApprovalLiving (id: number): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/apartments/user/tickets/${ id }/send_on_approval`);
  }

  public static approveTicketLiving (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/apartments/employee/tickets/${ id }/approve`, payload);
  }

  public static choiceApartment (requestId: number | string, apartmentId: number | string): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/apartments/user/tickets/${ requestId }/choice_apartments`, { apartmentId });
  }

  public static viewedApartment (requestId: number | string, apartmentViewed: boolean): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/apartments/user/tickets/${ requestId }/viewing_apartments`, { apartmentViewed });
  }

  public static rejectTicketLiving (id: number, reason: string): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/apartments/employee/tickets/${ id }/reject`, reason);
  }

  public static getTicketsParking (params: unknown): AxiosPromise<TicketsResponse> {
    return this.api.get("/api/v1/services/parking/user/tickets", { params });
  }

  public static getEmployeeTicketsParking (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/services/parking/employee/tickets", { params });
  }

  public static createTicketParking (params: any): AxiosPromise<any> {
    return this.api.post("/api/v1/services/parking/user/tickets", { ...params });
  }

  public static addTicketsParkingFile (id: number, file: unknown): AxiosPromise<any> {
    return this.api.post(
      `/api/v1/services/parking/user/tickets/${ id }/file`,
      file,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
  }

  public static requestApprovalParking (id: number): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/parking/user/tickets/${ id }/send_on_approval`);
  }

  public static approveTicketParking (id: number): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/parking/employee/tickets/${ id }/approve`);
  }

  public static rejectTicketParking (id: number, reason: string): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/parking/employee/tickets/${ id }/reject`, reason);
  }

  public static sendContractInfoParking (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/parking/employee/tickets/${ id }/sign_contract_success`, payload);
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

  public static getParkingPayments (params: any): AxiosPromise<any> {
    return this.api.get("/api/v1/payment/parking/user", params);
  }
}
