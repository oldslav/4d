import { AxiosPromise } from "axios";
import { Service } from "../common";
import { IMapMenuResponse } from "src/store/types/maps/common";

export interface ITourismPlace {}

export interface ITourismRoute {}

export class TourismService extends Service {
  public getMenu (): AxiosPromise<IMapMenuResponse>{
    return this.api.get("/api/v1/map/section/5");
  }

  public async getGeoJSONByPath (path: string): Promise<any> {
    const { data } = await this.api.get(path);
    return data;
  }

  public getPlace (layerId: number, id: number): AxiosPromise<ITourismPlace> {
    return this.api.get(`/api/v1/map/tourism/places/${ layerId }/${ id }`);
  }

  public getRoute (layerId: number, id: number): AxiosPromise<ITourismRoute> {
    return this.api.get(`/api/v1/map/tourism/routes/${ layerId }/${ id }`);
  }

  public offerRoute (description: string): AxiosPromise<any> {
    return this.api.post("/api/v1/map/tourism/routes/offer", description);
  }

  public uploadRouteFile (routeId: number, file: File, isImage: boolean): AxiosPromise<any> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("isImage", String(isImage));
    return this.api.post(`/api/v1/map/tourism/routes/offer/${ routeId }/file`, formData);
  }

  public getRoutesData (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/map/tourism/routes/gis", { params });
  }

  public getPlacesData (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/map/tourism/places/gis", { params });
  }

  public getRoutesDetails (id: number): AxiosPromise<any> {
    return this.api.get(`api/v1/map/tourism/routes/gis/${ id }`);
  }

  public getPlacesDetails (id: number): AxiosPromise<any> {
    return this.api.get(`api/v1/map/tourism/places/gis/${ id }`);
  }

  public updateRoutesDetails (id: number, payload: Record<any, any>): AxiosPromise<any> {
    return this.api.put(`api/v1/map/tourism/routes/gis/${ id }`, { ...payload });
  }

  public updatePlacesDetails (id: number, payload: Record<any, any>): AxiosPromise<any> {
    return this.api.put(`api/v1/map/tourism/places/gis/${ id }`, { ...payload });
  }

  public getRoutesReferences (): AxiosPromise<any> {
    return this.api.get("api/v1/map/tourism/routes/gis/references");
  }

  public getPlacesReferences (): AxiosPromise<any> {
    return this.api.get("api/v1/map/tourism/places/gis/references");
  }

  public uploadRoutesImage (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/map/tourism/routes/gis/${ id }/image`, payload);
  }

  public uploadPlacesImage (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/map/tourism/places/gis/${ id }/image`, payload);
  }

  public deleteRoutesImage (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/tourism/routes/gis/image/${ id }`);
  }

  public deletePlacesImage (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/tourism/places/gis/image/${ id }`);
  }

  public deleteRoutesDocument (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/tourism/routes/gis/documents/${ id }`);
  }

  public deletePlacesDocument (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/tourism/places/gis/documents/${ id }`);
  }
}
