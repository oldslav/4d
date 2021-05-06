import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export default class ReferencesService extends Service {
  public static getReferences (type: string): AxiosPromise<any> {
    return this.api.get("api/v1/references", { params: { type } });
  }
}
