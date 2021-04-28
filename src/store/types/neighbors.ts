import { IUserName } from "src/store/types/user";

export interface INeighborsState {
  neighbors: Array<INeighbor> | null
}

export interface INeighbor {
  name: IUserName,
  documents: any
}
