import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export class IdeasService extends Service {
  public getIdeas (): AxiosPromise<any> {
    return this.api.get("api/v1/services/crowdsourcing");
  }

  public createIdea (payload: unknown): AxiosPromise<any> {
    return this.api.post("api/v1/services/crowdsourcing", payload);
  }
}
