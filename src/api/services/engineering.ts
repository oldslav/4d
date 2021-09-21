import { AxiosPromise } from "axios";
import { Service } from "src/api/common";
import { IMapMenuResponse } from "src/store/types/maps/common";

export class EngineeringService extends Service {
  public getMenu (): AxiosPromise<IMapMenuResponse>{
    return this.api.get("/api/v1/map/section/7");
  }

  public async getLayerGeoJSON (path: string): Promise<any> {
    const { data } = await this.api.get(path);
    return data;
  }

  public getFeature (layerPath: string, id: number): AxiosPromise<any> {
    return this.api.get(`${ layerPath }/${ id }`);
  }
}
