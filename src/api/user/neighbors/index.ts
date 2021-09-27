import { Service } from "src/api/common";
import { AxiosPromise } from "axios";
import { DocumentPayload } from "src/api/common";

interface NeighborPayload {
  id?: number,
  name: {
    first: string,
    full: string,
    last: string,
    noPatronymic: boolean,
    patronymic: string
  },
  neighborTypeId: number
}

export class UserNeighborsService extends Service {
  public createNeighbor (neighbor: NeighborPayload): AxiosPromise<any> {
    return this.api.post("api/v1/profile/documents/neighbors", neighbor);
  }

  public updateNeighbor (neighbor: NeighborPayload): AxiosPromise<any> {
    return this.api.put(`api/v1/profile/documents/neighbors/${ neighbor.id }`, neighbor);
  }

  public deleteNeighbor (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/profile/documents/neighbors/${ id }`);
  }

  public createNeighborFile (document: DocumentPayload, id: number): AxiosPromise<any> {
    return this.api.post(`api/v1/profile/documents/neighbors/${ id }/file`, document);
  }

  public deleteNeighborFile (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/profile/documents/neighbors/file/${ id }`);
  }
}
