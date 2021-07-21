import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export class ApartmentsService extends Service {
  public static getBuildings (params: unknown): AxiosPromise<any> {
    return this.api.get("api/v1/services/buildings/user", { params });
  }

  public static getApartments (params: unknown): AxiosPromise<any> {
    return this.api.get("api/v1/services/apartments/user", { params });
  }

  // public static getApartments (id: number): AxiosPromise<any> {
  //   return this.api.get(`/api/v1/services/apartments/${ id }`);
  // }
}
