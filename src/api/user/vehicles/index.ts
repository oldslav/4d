import { Service } from "src/api/common";
import { AxiosPromise } from "axios";
import { DocumentPayload } from "src/api/common";

interface Option {
  name: string,
  id: string
}

interface VehiclesPayload {
  id?: number | string,
  type: Option,
  brand: Option,
  model: Option,
  number: string
}

export class UserVehiclesService extends Service {
  public static createVehicle (payload: VehiclesPayload): AxiosPromise<any> {
    return this.api.post("api/v1/profile/documents/car", payload);
  }

  public static updateVehicle (payload: VehiclesPayload): AxiosPromise<any> {
    return this.api.put(`api/v1/profile/documents/car/${ payload.id }`, payload);
  }

  public static deleteVehicle (id: string | number): AxiosPromise<any> {
    return this.api.delete(`api/v1/profile/documents/car/${ id }`);
  }

  public static createVehicleFile (file: DocumentPayload, id: number): AxiosPromise<any> {
    return this.api.post(`api/v1/profile/documents/car/${ id }/file`, file);
  }

  public static deleteVehicleFile (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/profile/documents/car/file/${ id }`);
  }
}
