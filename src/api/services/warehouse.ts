import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export class WarehouseService extends Service {
  public getWarehouse (): AxiosPromise<any> {
    return this.api.get("/api/v1/services/warehouse");
  }
}
