import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export class ParkingService extends Service {
  public getParkingGeo (): AxiosPromise<any> {
    return this.api.get("api/v1/services/parking/user");
  }

  public getParkingDetails (id: number): AxiosPromise<any> {
    return this.api.get(`/api/v1/services/parking/user/${ id }`);
  }

  public getParkingPlaces (id: number): AxiosPromise<any> {
    return this.api.get(`/api/v1/services/parking/user/${ id }/places`);
  }
}
