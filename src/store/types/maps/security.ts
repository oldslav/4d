import { IMapMenuResponse } from "src/store/types/maps/common";

export interface IMapSecurityState {
  menu: IMapMenuResponse | null,
  geoJSON: Record<number, any>
}
