import { IMapMenuResponse } from "src/store/types/maps/common";

export interface IMapBuildingsState {
  menu: IMapMenuResponse | null,
  building: null | Record<any, any>,
  geoJSON: Record<number, any>
}
