import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export class EstateService extends Service {
  public getEstate (params: unknown): AxiosPromise<any> {
    return this.api.get("api/v1/map/buildings/gis", { params });
  }

  public getEstateReferences (): AxiosPromise<any> {
    return this.api.get("api/v1/map/buildings/gis/references");
  }

  // public static getApartments (id: number): AxiosPromise<any> {
  //   return this.api.get(`/api/v1/services/apartments/${ id }`);
  // }
}
