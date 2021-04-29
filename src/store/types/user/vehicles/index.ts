export interface IVehiclesState {
  type: string | null,
  brand: string | null,
  model: string | null,
  plates: string | null,
  documents: IVehicleDocuments
}

export interface IVehicleDocuments {
  sts: Array<any> | null,
  pts: Array<any> | null
}
