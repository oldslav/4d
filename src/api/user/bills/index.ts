import { Service } from "src/api/common";
import { AxiosPromise } from "axios";
import { TicketsResponse } from "src/api/user/tickets/tickets";

export class BillsService extends Service {
  public static getBillsApartments (): AxiosPromise<TicketsResponse> {
    return this.api.get("/api/v1/payment/apartments/user");
  }
  
  public static getBillsParking (): AxiosPromise<TicketsResponse> {
    return this.api.get("/api/v1/payment/parking/user");
  }
  
  public static getPaymentLink (id: number): AxiosPromise<any> {
    return this.api.get(`/api/v1/payment/${ id }/payment`);
  }
}
