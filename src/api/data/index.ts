import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export default class DataService extends Service {
  public getMainPageInfo (): AxiosPromise<any> {
    return this.api.get("/api/v1/data");
  }
  public getObjects (): AxiosPromise<any> {
    return this.api.get("/api/v1/data/buildings");
  }
}
