import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export class IdeasService extends Service {
  public getIdeasGeo (): AxiosPromise<any> {
    return this.api.get("api/v1/services/crowdsourcing");
  }

  public getIdeas (params: unknown): AxiosPromise<any> {
    return this.api.get("api/v1/services/crowdsourcing", { params });
  }

  public getIdea (id: number): AxiosPromise<any> {
    return this.api.get(`api/v1/services/crowdsourcing/${ id }`);
  }

  public createIdea (payload: unknown): AxiosPromise<any> {
    return this.api.post("api/v1/services/crowdsourcing", payload);
  }

  public likeIdea (id: number): AxiosPromise<any> {
    return this.api.post(`api/v1/services/crowdsourcing/${ id }/like`);
  }

  public changeIdeaStatus (id: number, payload: Record<string, any>): AxiosPromise<any> {
    return this.api.put(`api/v1/services/crowdsourcing/${ id }/status`, payload, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public cancelIdea (id: number): AxiosPromise<any> {
    return this.api.put(`api/v1/services/crowdsourcing/${ id }/cancel`);
  }

  public voteIdea (id: number, payload: Record<string, any>): AxiosPromise<any> {
    return this.api.post(`api/v1/services/crowdsourcing/${ id }/vote`, payload, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
