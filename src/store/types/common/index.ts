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
  geoJson: GeoJsonCollection | null
  pickedFeatureId: GeoJsonFeature | null
  pointCoords: any | null
}

export interface GeoJsonCollection {
  type: string,
  features: GeoJsonFeature
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
