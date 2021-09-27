import { IMapMenuResponse } from "src/store/types/maps/common";

export interface IMapTerritoryState {
  menu: IMapMenuResponse | null,
  geoJSON: Record<number, any>
}
