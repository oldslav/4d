export interface INeighborsState {
  items: Array<INeighbor> | null
}

interface INeighborName {
  first: string,
  full: string,
  last: string,
  noPatronymic: boolean,
  patronymic: string
}

interface INeighborDocuments {
  passport: Array<any> | null,
  snils: Array<any> | null,
  inn: Array<any> | null,
  marriage: Array<any> | null,
  birth: Array<any> | null,
  children_registration: Array<any> | null,
}

export interface INeighbor {
  name: INeighborName,
  documents: Partial<INeighborDocuments>,
  neighborsTypeId: number
}
