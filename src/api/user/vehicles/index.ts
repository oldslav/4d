import Axios, { AxiosPromise } from "axios";
import { DocumentPayload } from "src/api/common";

interface VehiclesPayload {
  id?: number | string,
  type: string,
  brand: string,
  model: string,
  number: string
}

interface VehiclesResponse {

}

export class UserVehiclesService {
  public static createVehicle (payload: VehiclesPayload): AxiosPromise<VehiclesResponse> {
    return Axios.post("profile/documents/car", payload);
  }

  public static updateVehicle (payload: VehiclesPayload): AxiosPromise<VehiclesResponse> {
    return Axios.put(`profile/documents/car/${ payload.id }`, payload);
  }

  public static deleteVehicle (id: string | number): AxiosPromise<VehiclesResponse> {
    return Axios.delete(`profile/documents/car/${ id }`);
  }

  public static createVehicleFile (file: DocumentPayload, id: number): AxiosPromise<VehiclesResponse> {
    return Axios.post(`profile/documents/car/${ id }/file`, file);
  }

  public static deleteVehicleFile (id: number): AxiosPromise<VehiclesResponse> {
    return Axios.delete(`profile/documents/car/file/${ id }`);
  }
}
