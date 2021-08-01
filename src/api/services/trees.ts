import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export class TreesService extends Service {
  public getTrees (): AxiosPromise<any> {
    return this.api.post("api/v1/services/trees", {});
  }
}
