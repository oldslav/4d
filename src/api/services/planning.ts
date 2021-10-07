import { Service } from "src/api/common";
import { AxiosPromise } from "axios";
import { IMapMenuResponse } from "src/store/types/maps/common";

export class PlanningService extends Service {
  public getMapMenu (): AxiosPromise<IMapMenuResponse>{
    return this.api.get("/api/v1/map/section/3");
  }

  public async getMapLayerGeoJSON (path: string): Promise<any> {
    const { data } = await this.api.get(path);
    return data;
  }



  // Border

  public getBorderMapMenu (): AxiosPromise<IMapMenuResponse>{
    return this.api.get("/api/v1/map/section/2");
  }

  public async getBorderLayerGeoJSON (path: string): Promise<any> {
    const { data } = await this.api.get(path);
    return data;
  }

  public getBorderFeature (layerPath: string, id: number): AxiosPromise<any> {
    return this.api.get(`${ layerPath }/${ id }`);
  }

  public getBorderData (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/map/border/gis", { params });
  }

  public getBorderDetails (id: number): AxiosPromise<any> {
    return this.api.get(`api/v1/map/border/gis/${ id }`);
  }

  public updateBorderDetails (id: number, payload: Record<any, any>): AxiosPromise<any> {
    return this.api.put(`api/v1/map/border/gis/${ id }`, { ...payload });
  }

  public getBorderReferences (): AxiosPromise<any> {
    return this.api.get("api/v1/map/border/gis/references");
  }

  public uploadBorderImage (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/map/border/gis/${ id }/image`, payload);
  }

  public deleteBorderImage (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/border/gis/image/${ id }`);
  }

  public deleteBorderDocument (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/border/gis/documents/${ id }`);
  }



  // Flower

  public getFlowerMapMenu (): AxiosPromise<IMapMenuResponse>{
    return this.api.get("/api/v1/map/section/2");
  }

  public async getFlowerLayerGeoJSON (path: string): Promise<any> {
    const { data } = await this.api.get(path);
    return data;
  }

  public getFlowerFeature (layerPath: string, id: number): AxiosPromise<any> {
    return this.api.get(`${ layerPath }/${ id }`);
  }

  public getFlowerData (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/map/flower/gis", { params });
  }

  public getFlowerDetails (id: number): AxiosPromise<any> {
    return this.api.get(`api/v1/map/flower/gis/${ id }`);
  }

  public updateFlowerDetails (id: number, payload: Record<any, any>): AxiosPromise<any> {
    return this.api.put(`api/v1/map/flower/gis/${ id }`, { ...payload });
  }

  public getFlowerReferences (): AxiosPromise<any> {
    return this.api.get("api/v1/map/flower/gis/references");
  }

  public uploadFlowerImage (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/map/flower/gis/${ id }/image`, payload);
  }

  public deleteFlowerImage (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/flower/gis/image/${ id }`);
  }

  public deleteFlowerDocument (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/flower/gis/documents/${ id }`);
  }



  // Trees

  public getTreesMapMenu (): AxiosPromise<IMapMenuResponse>{
    return this.api.get("/api/v1/map/section/2");
  }

  public async getTreesLayerGeoJSON (path: string): Promise<any> {
    const { data } = await this.api.get(path);
    return data;
  }

  public getTreesFeature (layerPath: string, id: number): AxiosPromise<any> {
    return this.api.get(`${ layerPath }/${ id }`);
  }

  public getTreesData (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/map/trees/gis", { params });
  }

  public getTreesDetails (id: number): AxiosPromise<any> {
    return this.api.get(`api/v1/map/trees/gis/${ id }`);
  }

  public updateTreesDetails (id: number, payload: Record<any, any>): AxiosPromise<any> {
    return this.api.put(`api/v1/map/trees/gis/${ id }`, { ...payload });
  }

  public getTreesReferences (): AxiosPromise<any> {
    return this.api.get("api/v1/map/trees/gis/references");
  }

  public uploadTreesImage (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/map/trees/gis/${ id }/image`, payload);
  }

  public deleteTreesImage (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/trees/gis/image/${ id }`);
  }

  public deleteTreesDocument (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/trees/gis/documents/${ id }`);
  }



  // Art

  public getArtMapMenu (): AxiosPromise<IMapMenuResponse>{
    return this.api.get("/api/v1/map/section/2");
  }

  public async getArtLayerGeoJSON (path: string): Promise<any> {
    const { data } = await this.api.get(path);
    return data;
  }

  public getArtFeature (layerPath: string, id: number): AxiosPromise<any> {
    return this.api.get(`${ layerPath }/${ id }`);
  }

  public getArtData (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/map/artobject/gis", { params });
  }

  public getArtDetails (id: number): AxiosPromise<any> {
    return this.api.get(`api/v1/map/artobject/gis/${ id }`);
  }

  public updateArtDetails (id: number, payload: Record<any, any>): AxiosPromise<any> {
    return this.api.put(`api/v1/map/artobject/gis/${ id }`, { ...payload });
  }

  public getArtReferences (): AxiosPromise<any> {
    return this.api.get("api/v1/map/artobject/gis/references");
  }

  public uploadArtImage (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/map/artobject/gis/${ id }/image`, payload);
  }

  public deleteArtImage (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/artobject/gis/image/${ id }`);
  }

  public deleteArtDocument (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/artobject/gis/documents/${ id }`);
  }



  // Square

  public getSquareMapMenu (): AxiosPromise<IMapMenuResponse>{
    return this.api.get("/api/v1/map/section/2");
  }

  public async getSquareLayerGeoJSON (path: string): Promise<any> {
    const { data } = await this.api.get(path);
    return data;
  }

  public getSquareFeature (layerPath: string, id: number): AxiosPromise<any> {
    return this.api.get(`${ layerPath }/${ id }`);
  }

  public getSquareData (params: unknown): AxiosPromise<any> {
    return this.api.get("/api/v1/map/square/gis", { params });
  }

  public getSquareDetails (id: number): AxiosPromise<any> {
    return this.api.get(`api/v1/map/square/gis/${ id }`);
  }

  public updateSquareDetails (id: number, payload: Record<any, any>): AxiosPromise<any> {
    return this.api.put(`api/v1/map/square/gis/${ id }`, { ...payload });
  }

  public getSquareReferences (): AxiosPromise<any> {
    return this.api.get("api/v1/map/square/gis/references");
  }

  public uploadSquareImage (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/map/square/gis/${ id }/image`, payload);
  }

  public deleteSquareImage (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/square/gis/image/${ id }`);
  }

  public deleteSquareDocument (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/square/gis/documents/${ id }`);
  }
}
