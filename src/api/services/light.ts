import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export class LightService extends Service {
  public getLightGeo (params: unknown): AxiosPromise<any> {
    return this.api.get("api/v1/services/light", { params });
  }

  public getLightStats (): AxiosPromise<any> {
    return this.api.get("api/v1/services/light/stats");
  }

  public getLight (id: number): AxiosPromise<any> {
    return this.api.get(`api/v1/services/light/${ id }`);
  }

  public updateLight (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/services/light/${ id }/request`, payload);
  }

  public addTreeFile (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/services/light/request/${ id }/file`, payload);
  }
}
