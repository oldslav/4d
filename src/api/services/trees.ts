import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export class TreesService extends Service {
  public getTrees (params: unknown): AxiosPromise<any> {
    return this.api.get("api/v1/services/trees", { params });
  }

  public getTreesStats (): AxiosPromise<any> {
    return this.api.get("api/v1/services/trees/stats");
  }

  public getTree (id: number): AxiosPromise<any> {
    return this.api.get(`api/v1/services/trees/${ id }`);
  }

  public updateTree (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/services/trees/${ id }/request`, payload);
  }

  public addTreeFile (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/services/trees/request/${ id }/file`, payload);
  }
}
