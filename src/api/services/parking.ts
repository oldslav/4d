import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export class ParkingGeoService extends Service {
  public static getParkingGeo (): AxiosPromise<any> {
    return this.api.get("api/v1/services/parking/user");
  }
}
