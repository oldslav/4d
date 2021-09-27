import { ITourismPlace, ITourismRoute } from "src/api/services/tourism";
import { IMapMenuResponse } from "src/store/types/maps/common";

export interface IServicesTourismState {
  serviceMenu: IMapMenuResponse | null,
  entity: null | ITourismPlace | ITourismRoute,
  currentGeoJSONLayer: null | string,
  layersGeoJSON: {
    [key:string]: any
  }
}

export interface IOfferRouteParams {
  description: string,
  images: File[],
  route: File
}

export enum TourismGeoJSONEntities {
  place = "place",
  route = "route",
  stop = "stop",
}
