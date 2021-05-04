// export interface IVehiclesState {
//   type: string | null,
//   brand: string | null,
//   model: string | null,
//   plates: string | null,
//   documents: IVehicleDocuments
// }
//
// export interface IVehicleDocuments {
//   sts: Array<any> | null,
//   pts: Array<any> | null
// }
export interface IVehiclesState {
  items: Array<IVehicle>
}

export interface IVehiclesEntry {
  payload: IVehicle,
  index: number
}

interface Option {
  name: string,
  id: string
}

export interface IVehicle {
  id?: number,
  type: Option | null,
  brand: Option | null,
  model: Option | null,
  number: string | null,
  sts: Array<any> | null,
  pts: Array<any> | null
}
