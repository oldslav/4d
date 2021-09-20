// export interface Document {
//   docType: {
//     description: string,
//     id: number,
//     name: string
//   },
//   id: number,
//   imagePath: string
// }

interface DocType {
  description: string,
  id: number,
  name: string
}

export interface GeoState {
  geoJson: GeoData | null
  pickedFeatureId: GeoJsonFeature | null
  clustering: boolean
  pointCoords: any | null
  isDraw: any | null
  cesiumInstance: any | null,
  entityDistance: null | number
}

export interface GeoData {
  type: string,
  data: GeoJsonCollection | Array<any>
}

export interface GeoJsonCollection {
  type: string,
  features: Array<GeoJsonFeature>
}

export interface GeoJsonFeature {
  type: string
  geometry: GeoJsonFeatureGeometry
  properties: GeoJsonFeatureProperties
  id: number
}

export interface GeoJsonFeatureGeometry {
  type: string
  coordinates: Array<any>
}

export interface GeoJsonFeatureProperties {
  [key: string]: any
}

export interface Document {
  lastModified: string,
  lastModifiedDate: Date,
  name: string,
  size: number,
  type: string,
  webkitRelativePath: string,
  imagePath: string,
  id: number,
  docType: DocType
}

export type I18nNameLikeProps = "nameRu" | "nameEn"

export enum I18nNamePropertyByLang {
  ru = "nameRu",
  "en-us" = "nameEn",
}

export type I18nNameLike = {
  [key in I18nNameLikeProps]: string;
};
