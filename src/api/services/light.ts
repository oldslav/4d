import { Service } from "src/api/common";
import { AxiosPromise } from "axios";
import { IMapMenuResponse } from "src/store/types/maps/common";

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

  public getMapMenu (): AxiosPromise<IMapMenuResponse>{
    return this.api.get("/api/v1/map/section/4");
  }

  public async getMapLayerGeoJSON (path: string): Promise<any> {
    const { data } = await this.api.get(path);
    return data;
  }
}
