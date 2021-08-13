import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export class TreesService extends Service {
  public getTrees (params: unknown): AxiosPromise<any> {
    return this.api.get("api/v1/services/trees", { params });
  }

  public getTreesStats (): AxiosPromise<any> {
    return this.api.get("api/v1/services/trees/stats");
  }
}
