import { IMapMenuResponse } from "src/store/types/maps/common";

export interface IMapImprovementState {
  menu: IMapMenuResponse | null,
  geoJSON: Record<number, any>
}
