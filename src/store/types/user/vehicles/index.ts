import { Document } from "src/store/types/common";

export interface IVehiclesState {
  items: IVehicle[],
  deletedIds: number[]
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
  documents: Partial<Document>[]
}
