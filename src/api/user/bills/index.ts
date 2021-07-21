import { Service } from "src/api/common";
import { AxiosPromise } from "axios";
import { TicketsResponse } from "src/api/user/tickets/tickets";

interface Params {
  paid?: boolean | null,
  ticketId?: number | null
}

export class BillsService extends Service {
  public getBillsApartments (params?: Params): AxiosPromise<TicketsResponse> {
    return this.api.get("/api/v1/payment/apartments/user", { params });
  }

  public getBillsParking (params?: Params): AxiosPromise<TicketsResponse> {
    return this.api.get("/api/v1/payment/parking/user", { params });
  }

  public getBillsWarehouse (params?: Params): AxiosPromise<TicketsResponse> {
    return this.api.get("/api/v1/payment/warehouse/user", { params });
  }

  public getPaymentLink (id: number): AxiosPromise<any> {
    return this.api.get(`/api/v1/payment/${ id }/payment`);
  }
}
