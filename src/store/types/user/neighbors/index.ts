import { IUserName } from "../index";

export interface INeighborsState {
  neighbors: Array<INeighbor> | null
}

export interface INeighbor {
  name: IUserName,
  documents: any
}
