import { AxiosPromise } from "axios";
import { I18nNameLike } from "src/store/types/common";
import { Service } from "../common";

interface ITourismMenuLayer extends I18nNameLike {
  id: number;
  color: string;
  path: string;
}

interface ITourismMenuSubSection extends I18nNameLike {
  id: number;
  layers: ITourismMenuLayer[]
}

export interface ITourismMenuResponse extends I18nNameLike {
  id: number;
  icon: string;
  subSections: ITourismMenuSubSection
}

export interface ITourismPlace {}

export interface ITourismRoute {}

export class TourismService extends Service {
  public getMenu (): AxiosPromise<ITourismMenuResponse>{
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
}
