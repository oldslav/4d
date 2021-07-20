import { PaginationOutput, Service } from "src/api/common";
import { AxiosPromise, AxiosRequestConfig } from "axios";

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
  public static getTicketLiving (ticketId: string | number): AxiosPromise<any> {
    return this.api.get(`/api/v1/services/apartments/user/tickets/${ ticketId }`);
  }

  public static getTicketsLiving (params: unknown): AxiosPromise<TicketsResponse> {
    return this.api.get("/api/v1/services/apartments/user/tickets", { params });
  }

  public static getEmployeeTicketsLiving (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/services/apartments/employee/tickets", { params });
  }

  public static createTicketLiving (params: unknown): AxiosPromise<TicketsResponse> {
    return this.api.post("/api/v1/services/apartments/user/tickets", params);
  }

  public static createLegalTicketLiving (payload: unknown): AxiosPromise<any> {
    return this.api.post("/api/v1/services/apartments/company/tickets", payload);
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

  public static sendContractInfoLiving (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/apartments/employee/tickets/${ id }/sign_contract_success`, payload);
  }

  public static getTicketsParking (params: unknown): AxiosPromise<TicketsResponse> {
    return this.api.get("/api/v1/services/parking/user/tickets", { params });
  }

  public static getEmployeeTicketsParking (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/services/parking/employee/tickets", { params });
  }

  public static createTicketParking (params: unknown): AxiosPromise<any> {
    return this.api.post("/api/v1/services/parking/user/tickets", params as AxiosRequestConfig);
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

  public static getTicketsIdeas (params: unknown): AxiosPromise<any> {
    return this.api.get("api/v1/services/crowdsourcing/all", params as AxiosRequestConfig);
  }

  public static createTicketWarehouse (payload: unknown): AxiosPromise<any> {
    return this.api.post("/api/v1/services/warehouse/user/tickets", payload);
  }

  public static addTicketsWarehouseFile (id: number, file: unknown): AxiosPromise<any> {
    return this.api.post(`/api/v1/services/warehouse/user/tickets/${ id }/file`, file);
  }

  public static deleteTicketWarehouse (id: number): AxiosPromise<TicketsResponse> {
    return this.api.put(`/api/v1/services/warehouse/user/tickets/${ id }/cancel`);
  }

  public static getTicketsWarehouse (params: unknown): AxiosPromise<TicketsResponse> {
    return this.api.get("/api/v1/services/warehouse/user/tickets", { params });
  }

  public static getWarehouseTicketById (id: number): AxiosPromise<any> {
    return this.api.get(`/api/v1/services/warehouse/user/tickets/${ id }`);
  }

  public static getEmployeeTicketsWarehouse (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/services/warehouse/employee/tickets", { params });
  }

  public static requestApprovalWarehouse (id: number): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/warehouse/user/tickets/${ id }/send_on_approval`);
  }

  public static approveTicketWarehouse (id: number): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/warehouse/employee/tickets/${ id }/approve`);
  }

  public static getWarehousePaymentLink (id: number): AxiosPromise<any> {
    return this.api.get(`/api/v1/services/warehouse/rent/contract/${ id }/payment`);
  }

  public static rejectTicketWarehouse (id: number, reason: string): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/warehouse/employee/tickets/${ id }/reject`, reason);
  }

  public static sendContractInfoWarehouse (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/warehouse/employee/tickets/${ id }/sign_contract_success`, payload);
  }

  public static getParkingPayments (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/payment/parking/user", params as AxiosRequestConfig);
  }
  
  public static getTicketsCrowdfunding (params: unknown): AxiosPromise<TicketsResponse> {
    return this.api.get("/api/v1/services/crowdfunding", { params });
  }

  public static getEmployeeTicketsCrowdfunding (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/services/crowdfunding", { params });
  }

  public static approveTicketCrowdfunding (id: number): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/crowdfunding/${ id }/approve`);
  }

  public static rejectTicketCrowdfunding (id: number, reason: string): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/crowdfunding/${ id }/reject`, reason);
  }

  public static deleteTicketCrowdfunding (id: number): AxiosPromise<TicketsResponse> {
    return this.api.delete(`/api/v1/services/crowdfunding/${ id }`);
  }
}
