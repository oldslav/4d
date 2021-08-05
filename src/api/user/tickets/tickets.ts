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
  public getTicketLiving (ticketId: string | number): AxiosPromise<any> {
    return this.api.get(`/api/v1/services/apartments/user/tickets/${ ticketId }`);
  }

  public getTicketsLiving (params: unknown): AxiosPromise<TicketsResponse> {
    return this.api.get("/api/v1/services/apartments/user/tickets", { params });
  }

  public getEmployeeTicketsLiving (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/services/apartments/employee/tickets", { params });
  }

  public createTicketLiving (params: unknown): AxiosPromise<TicketsResponse> {
    return this.api.post("/api/v1/services/apartments/user/tickets", params);
  }

  public createLegalTicketLiving (payload: unknown): AxiosPromise<any> {
    return this.api.post("/api/v1/services/apartments/company/tickets", payload);
  }

  public addTicketLivingFile (id: number, params: unknown): AxiosPromise<TicketsResponse> {
    return this.api.post(`/api/v1/services/apartments/user/tickets/${ id }/file`, params);
  }

  public addTicketLivingNeighbor (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`/api/v1/services/apartments/user/tickets/${ id }/neighbors`, payload);
  }

  public addTicketLivingNeighborFile (id: number, ticketId: number, file: unknown): AxiosPromise<any> {
    return this.api.post(`/api/v1/services/apartments/user/tickets/${ ticketId }/neighbors/${ id }/file`, file);
  }

  public deleteTicketLiving (id: number): AxiosPromise<TicketsResponse> {
    return this.api.put(`/api/v1/services/apartments/user/tickets/${ id }/cancel`);
  }

  public deleteTicketParking (id: number): AxiosPromise<TicketsResponse> {
    return this.api.put(`/api/v1/services/parking/user/tickets/${ id }/cancel`);
  }

  public requestApprovalLiving (id: number): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/apartments/user/tickets/${ id }/send_on_approval`);
  }

  public approveTicketLiving (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/apartments/employee/tickets/${ id }/approve`, payload);
  }

  public choiceApartment (requestId: number | string, apartmentId: number | string): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/apartments/user/tickets/${ requestId }/choice_apartments`, { apartmentId });
  }

  public viewedApartment (requestId: number | string, apartmentViewed: boolean): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/apartments/user/tickets/${ requestId }/viewing_apartments`, { apartmentViewed });
  }

  public rejectTicketLiving (id: number, reason: string): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/apartments/employee/tickets/${ id }/reject`, reason);
  }

  public sendContractInfoLiving (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/apartments/employee/tickets/${ id }/sign_contract_success`, payload);
  }

  public getTicketsParking (params: unknown): AxiosPromise<TicketsResponse> {
    return this.api.get("/api/v1/services/parking/user/tickets", { params });
  }

  public getEmployeeTicketsParking (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/services/parking/employee/tickets", { params });
  }

  public createTicketParking (params: unknown): AxiosPromise<any> {
    return this.api.post("/api/v1/services/parking/user/tickets", params as AxiosRequestConfig);
  }

  public addTicketsParkingFile (id: number, file: unknown): AxiosPromise<any> {
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

  public requestApprovalParking (id: number): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/parking/user/tickets/${ id }/send_on_approval`);
  }

  public approveTicketParking (id: number): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/parking/employee/tickets/${ id }/approve`);
  }

  public rejectTicketParking (id: number, reason: string): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/parking/employee/tickets/${ id }/reject`, reason);
  }

  public sendContractInfoParking (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/parking/employee/tickets/${ id }/sign_contract_success`, payload);
  }

  public getTicketsIdeas (params: unknown): AxiosPromise<any> {
    return this.api.get("api/v1/services/crowdsourcing/all", params as AxiosRequestConfig);
  }

  public createTicketWarehouse (payload: unknown): AxiosPromise<any> {
    return this.api.post("/api/v1/services/warehouse/user/tickets", payload);
  }

  public addTicketsWarehouseFile (id: number, file: unknown): AxiosPromise<any> {
    return this.api.post(`/api/v1/services/warehouse/user/tickets/${ id }/file`, file);
  }

  public deleteTicketWarehouse (id: number): AxiosPromise<TicketsResponse> {
    return this.api.put(`/api/v1/services/warehouse/user/tickets/${ id }/cancel`);
  }

  public getTicketsWarehouse (params: unknown): AxiosPromise<TicketsResponse> {
    return this.api.get("/api/v1/services/warehouse/user/tickets", { params });
  }

  public getWarehouseTicketById (id: number): AxiosPromise<any> {
    return this.api.get(`/api/v1/services/warehouse/user/tickets/${ id }`);
  }

  public getEmployeeTicketsWarehouse (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/services/warehouse/employee/tickets", { params });
  }

  public requestApprovalWarehouse (id: number): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/warehouse/user/tickets/${ id }/send_on_approval`);
  }

  public approveTicketWarehouse (id: number): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/warehouse/employee/tickets/${ id }/approve`);
  }

  public getWarehousePaymentLink (id: number): AxiosPromise<any> {
    return this.api.get(`/api/v1/services/warehouse/rent/contract/${ id }/payment`);
  }

  public rejectTicketWarehouse (id: number, reason: string): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/warehouse/employee/tickets/${ id }/reject`, reason);
  }

  public sendContractInfoWarehouse (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/warehouse/employee/tickets/${ id }/sign_contract_success`, payload);
  }

  public getParkingPayments (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/payment/parking/user", params as AxiosRequestConfig);
  }

  public createTicketCrowdfunding (params: unknown): AxiosPromise<any> {
    return this.api.post("/api/v1/services/crowdfunding", { params });
  }

  public updateTicketCrowdfunding (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/crowdfunding/${ id }`, payload);
  }

  public addTicketCrowdfundingCover (id: number, file: unknown): AxiosPromise<TicketsResponse> {
    return this.api.post(`/api/v1/services/crowdfunding/${ id }/cover`, file);
  }

  public addTicketCrowdfundingFile (id: number, file: unknown): AxiosPromise<TicketsResponse> {
    return this.api.post(`/api/v1/services/crowdfunding/${ id }/file`, file);
  }

  public getTicketsCrowdfunding (params: unknown): AxiosPromise<TicketsResponse> {
    return this.api.get("/api/v1/services/crowdfunding", { params });
  }

  public getEmployeeTicketsCrowdfunding (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/services/crowdfunding", { params });
  }

  public approveTicketCrowdfunding (id: number): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/crowdfunding/${ id }/approve`);
  }

  public rejectTicketCrowdfunding (id: number, reason: string): AxiosPromise<any> {
    return this.api.put(`/api/v1/services/crowdfunding/${ id }/reject`, reason);
  }

  public deleteTicketCrowdfunding (id: number): AxiosPromise<TicketsResponse> {
    return this.api.delete(`/api/v1/services/crowdfunding/${ id }`);
  }
}
