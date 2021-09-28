import { Service } from "src/api/common";
import { AxiosPromise } from "axios";
import { IMapMenuResponse } from "src/store/types/maps/common";

export class ImprovementService extends Service {
  public getMapMenu (): AxiosPromise<IMapMenuResponse>{
    return this.api.get("/api/v1/map/section/3");
  }

  public async getMapLayerGeoJSON (path: string): Promise<any> {
    const { data } = await this.api.get(path);
    return data;
  }
}
