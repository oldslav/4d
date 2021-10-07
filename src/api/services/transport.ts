import { AxiosPromise } from "axios";
import { Service } from "src/api/common";
import { IMapMenuResponse } from "src/store/types/maps/common";

export class TransportService extends Service {
  public getTrobjectsMapMenu (): AxiosPromise<IMapMenuResponse>{
    return this.api.get("/api/v1/map/section/2");
  }

  public async getTrobjectsLayerGeoJSON (path: string): Promise<any> {
    const { data } = await this.api.get(path);
    return data;
  }

  public getTrobjectsFeature (layerPath: string, id: number): AxiosPromise<any> {
    return this.api.get(`${ layerPath }/${ id }`);
  }

  public getTrobjectsData (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/map/trobject/gis", { params });
  }

  public getTrobjectsDetails (id: number): AxiosPromise<any> {
    return this.api.get(`api/v1/map/trobject/gis/${ id }`);
  }

  public updateTrobjectsDetails (id: number, payload: Record<any, any>): AxiosPromise<any> {
    return this.api.put(`api/v1/map/trobject/gis/${ id }`, { ...payload });
  }

  public getTrobjectsReferences (): AxiosPromise<any> {
    return this.api.get("api/v1/map/trobject/gis/references");
  }

  public uploadTrobjectsImage (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/map/trobject/gis/${ id }/image`, payload);
  }

  public deleteTrobjectsImage (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/trobject/gis/image/${ id }`);
  }

  public deleteTrobjectsDocument (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/trobject/gis/documents/${ id }`);
  }



  // Parking

  public getParkingMapMenu (): AxiosPromise<IMapMenuResponse>{
    return this.api.get("/api/v1/map/section/2");
  }

  public async getParkingLayerGeoJSON (path: string): Promise<any> {
    const { data } = await this.api.get(path);
    return data;
  }

  public getParkingFeature (layerPath: string, id: number): AxiosPromise<any> {
    return this.api.get(`${ layerPath }/${ id }`);
  }

  public getParkingData (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/map/parking/gis", { params });
  }

  public getParkingDetails (id: number): AxiosPromise<any> {
    return this.api.get(`api/v1/map/parking/gis/${ id }`);
  }

  public updateParkingDetails (id: number, payload: Record<any, any>): AxiosPromise<any> {
    return this.api.put(`api/v1/map/parking/gis/${ id }`, { ...payload });
  }

  public getParkingReferences (): AxiosPromise<any> {
    return this.api.get("api/v1/map/parking/gis/references");
  }

  public uploadParkingImage (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/map/parking/gis/${ id }/image`, payload);
  }

  public deleteParkingImage (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/parking/gis/image/${ id }`);
  }

  public deleteParkingDocument (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/parking/gis/documents/${ id }`);
  }



  // Navigation

  public getNavigationMapMenu (): AxiosPromise<IMapMenuResponse>{
    return this.api.get("/api/v1/map/section/2");
  }

  public async getNavigationLayerGeoJSON (path: string): Promise<any> {
    const { data } = await this.api.get(path);
    return data;
  }

  public getNavigationFeature (layerPath: string, id: number): AxiosPromise<any> {
    return this.api.get(`${ layerPath }/${ id }`);
  }

  public getNavigationData (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/map/navigation/gis", { params });
  }

  public getNavigationDetails (id: number): AxiosPromise<any> {
    return this.api.get(`api/v1/map/navigation/gis/${ id }`);
  }

  public updateNavigationDetails (id: number, payload: Record<any, any>): AxiosPromise<any> {
    return this.api.put(`api/v1/map/navigation/gis/${ id }`, { ...payload });
  }

  public getNavigationReferences (): AxiosPromise<any> {
    return this.api.get("api/v1/map/navigation/gis/references");
  }

  public uploadNavigationImage (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/map/navigation/gis/${ id }/image`, payload);
  }

  public deleteNavigationImage (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/navigation/gis/image/${ id }`);
  }

  public deleteNavigationDocument (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/navigation/gis/documents/${ id }`);
  }



  // Crosswalk

  public getCrosswalkMapMenu (): AxiosPromise<IMapMenuResponse>{
    return this.api.get("/api/v1/map/section/2");
  }

  public async getCrosswalkLayerGeoJSON (path: string): Promise<any> {
    const { data } = await this.api.get(path);
    return data;
  }

  public getCrosswalkFeature (layerPath: string, id: number): AxiosPromise<any> {
    return this.api.get(`${ layerPath }/${ id }`);
  }

  public getCrosswalkData (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/map/crosswalk/gis", { params });
  }

  public getCrosswalkDetails (id: number): AxiosPromise<any> {
    return this.api.get(`api/v1/map/crosswalk/gis/${ id }`);
  }

  public updateCrosswalkDetails (id: number, payload: Record<any, any>): AxiosPromise<any> {
    return this.api.put(`api/v1/map/crosswalk/gis/${ id }`, { ...payload });
  }

  public getCrosswalkReferences (): AxiosPromise<any> {
    return this.api.get("api/v1/map/crosswalk/gis/references");
  }

  public uploadCrosswalkImage (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/map/crosswalk/gis/${ id }/image`, payload);
  }

  public deleteCrosswalkImage (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/crosswalk/gis/image/${ id }`);
  }

  public deleteCrosswalkDocument (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/crosswalk/gis/documents/${ id }`);
  }



  // Highway

  public getHighwayMapMenu (): AxiosPromise<IMapMenuResponse>{
    return this.api.get("/api/v1/map/section/2");
  }

  public async getHighwayLayerGeoJSON (path: string): Promise<any> {
    const { data } = await this.api.get(path);
    return data;
  }

  public getHighwayFeature (layerPath: string, id: number): AxiosPromise<any> {
    return this.api.get(`${ layerPath }/${ id }`);
  }

  public getHighwayData (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/map/highway/gis", { params });
  }

  public getHighwayDetails (id: number): AxiosPromise<any> {
    return this.api.get(`api/v1/map/highway/gis/${ id }`);
  }

  public updateHighwayDetails (id: number, payload: Record<any, any>): AxiosPromise<any> {
    return this.api.put(`api/v1/map/highway/gis/${ id }`, { ...payload });
  }

  public getHighwayReferences (): AxiosPromise<any> {
    return this.api.get("api/v1/map/highway/gis/references");
  }

  public uploadHighwayImage (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/map/highway/gis/${ id }/image`, payload);
  }

  public deleteHighwayImage (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/highway/gis/image/${ id }`);
  }

  public deleteHighwayDocument (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/highway/gis/documents/${ id }`);
  }



  // Plan

  public getPlanMapMenu (): AxiosPromise<IMapMenuResponse>{
    return this.api.get("/api/v1/map/section/2");
  }

  public async getPlanLayerGeoJSON (path: string): Promise<any> {
    const { data } = await this.api.get(path);
    return data;
  }

  public getPlanFeature (layerPath: string, id: number): AxiosPromise<any> {
    return this.api.get(`${ layerPath }/${ id }`);
  }

  public getPlanData (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/map/gp_road/gis", { params });
  }

  public getPlanDetails (id: number): AxiosPromise<any> {
    return this.api.get(`api/v1/map/gp_road/gis/${ id }`);
  }

  public updatePlanDetails (id: number, payload: Record<any, any>): AxiosPromise<any> {
    return this.api.put(`api/v1/map/gp_road/gis/${ id }`, { ...payload });
  }

  public getPlanReferences (): AxiosPromise<any> {
    return this.api.get("api/v1/map/gp_road/gis/references");
  }

  public uploadPlanImage (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/map/gp_road/gis/${ id }/image`, payload);
  }

  public deletePlanImage (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/gp_road/gis/image/${ id }`);
  }

  public deletePlanDocument (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/gp_road/gis/documents/${ id }`);
  }
}
