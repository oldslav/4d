import { IMapMenuResponse } from "src/store/types/maps/common";

export interface IMapLightState {
  menu: IMapMenuResponse | null,
  geoJSON: Record<number, any>
}
