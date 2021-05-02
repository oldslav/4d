import Axios, { AxiosPromise } from "axios";

interface NeighborPayload {
  id?: number,
  name: {
    first: string,
    full: string,
    last: string,
    noPatronymic: boolean,
    patronymic: string
  },
  neighborsTypeId: 0
}

interface NeighborResponse {

}

export class UserNeighborsService {
  public static createNeighbor (neighbor: NeighborPayload): AxiosPromise<NeighborResponse> {
    return Axios.post("profile/documents/neighbors", neighbor);
  }

  public static updateNeighbor (neighbor: NeighborPayload): AxiosPromise<NeighborResponse> {
    return Axios.put(`profile/documents/neighbors/${ neighbor.id }`, neighbor);
  }

  public static deleteNeighbor (id: number): AxiosPromise<NeighborResponse> {
    return Axios.delete(`profile/documents/neighbors/${ id }`);
  }
}
