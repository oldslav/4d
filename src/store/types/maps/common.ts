import { I18nNameLike } from "src/store/types/common";

export interface IMapMenuLayer extends I18nNameLike {
  id: number;
  color: string;
  path: string;
}

export interface IMapMenuSection extends I18nNameLike {
  id: number;
  layers: IMapMenuLayer[]
}

export interface IMapMenuResponse extends I18nNameLike {
  id: number;
  icon: string;
  subSections: IMapMenuSection[]
}
