import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export class ApartmentsService extends Service {
  public static getApartmentsGeo (requestId: number): AxiosPromise<any> {
    return this.api.get("api/v1/services/apartments/user", {
      params: {
        requestId
      }
    });
  }
  
  public static getApartments (id: number): AxiosPromise<any> {
    return this.api.get(`/api/v1/services/apartments/${ id }`);
  }
}
