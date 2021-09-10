import { AxiosPromise } from "axios";
import { Service } from "src/api/common";
import { IMapMenuResponse } from "src/store/types/maps/common";

export class SecurityService extends Service {
  public getMapMenu (): AxiosPromise<IMapMenuResponse>{
    return this.api.get("/api/v1/map/section/8");
  }

  public async getLayerGeoJSON (path: string): Promise<any> {
    const { data } = await this.api.get(path);
    return data;
  }
}
