import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export class EstateService extends Service {
  public getEstate (params: unknown): AxiosPromise<any> {
    return this.api.get("api/v1/map/buildings/gis", { params });
  }

  public getEstateDetails (id: number): AxiosPromise<any> {
    return this.api.get(`api/v1/map/buildings/gis/${ id }`);
  }

  public updateEstateDetails (id: number, payload: Record<any, any>): AxiosPromise<any> {
    return this.api.put(`api/v1/map/buildings/gis/${ id }`, { ...payload });
  }

  public getEstateReferences (): AxiosPromise<any> {
    return this.api.get("api/v1/map/buildings/gis/references");
  }

  public uploadEstateImage (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/map/buildings/gis/${ id }/image`, payload);
  }

  public deleteEstateImage (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/buildings/gis/image/${ id }`);
  }

  public deleteEstateDocument (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/map/buildings/gis/documents/${ id }`);
  }

  // public static getApartments (id: number): AxiosPromise<any> {
  //   return this.api.get(`/api/v1/services/apartments/${ id }`);
  // }
}
