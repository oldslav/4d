import { IMapMenuResponse } from "src/store/types/maps/common";

export interface IMapTransportState {
  menu: IMapMenuResponse | null,
  feature: Record<string, any> | null,
  geoJSON: Record<number, any>,
}
