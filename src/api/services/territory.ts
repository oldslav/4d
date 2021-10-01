import { AxiosPromise } from "axios";
import { Service } from "src/api/common";
import { IMapMenuResponse } from "src/store/types/maps/common";

export class TerritoryService extends Service {
  public getMapMenu (): AxiosPromise<IMapMenuResponse>{
    return this.api.get("/api/v1/map/section/6");
  }

  public async getLayerGeoJSON (path: string): Promise<any> {
    const { data } = await this.api.get(path);
    return data;
  }

  public getFeature (layerPath: string, id: number): AxiosPromise<any> {
    return this.api.get(`${ layerPath }/${ id }`);
  }

  public getData (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/map/light/gis", { params });
  }

  public getDetails (id: number): AxiosPromise<any> {
    return this.api.get(`api/v1/map/light/gis/${ id }`);
  }

  public updateDetails (id: number, payload: Record<any, any>): AxiosPromise<any> {
    return this.api.put(`api/v1/map/light/gis/${ id }`, { ...payload });
  }

  public getReferences (): AxiosPromise<any> {
    return this.api.get("api/v1/map/light/gis/references");
  }

  public uploadImage (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/map/light/gis/${ id }/image`, payload);
  }

  public deleteImage (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/light/gis/image/${ id }`);
  }

  public deleteDocument (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/light/gis/documents/${ id }`);
  }
}
