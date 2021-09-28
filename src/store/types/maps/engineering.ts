import { IMapMenuResponse } from "src/store/types/maps/common";

export interface IMapEngineeringState {
  menu: IMapMenuResponse | null,
  geoJSON: Record<number, any>
  feature: Record<number, any> | null
}
