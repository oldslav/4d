import { Document } from "src/store/types/common";

export interface INeighborsState {
  items: INeighbor[] | null,
  deletedIds: number[]
}

interface INeighborName {
  first: string,
  full: string,
  last: string,
  noPatronymic: boolean,
  patronymic: string
}

export interface INeighbor {
  id?: number,
  name: INeighborName,
  documents: Partial<Document[]>,
  neighborType: {
    id: number,
    name: string
  }
}
