import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export class IdeasService extends Service {
  public static getIdeas (): AxiosPromise<any> {
    return this.api.get("api/v1/services/crowdsourcing");
  }
}
