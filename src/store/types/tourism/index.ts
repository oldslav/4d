// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ITourismMenuResponse, ITourismPlace, ITourismRoute } from "src/api/services/tourism";

export interface IServicesTourismState {
  serviceMenu: ITourismMenuResponse | null,
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
