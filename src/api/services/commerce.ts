import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export class CommerceService extends Service {
  public getCommerce (): AxiosPromise<any> {
    return this.api.get("/api/v1/services/commerce/places");
  }

  public getCommerceById (id: number): AxiosPromise<any> {
    return this.api.get(`/api/v1/services/commerce/places/${ id }`);
  }
}
