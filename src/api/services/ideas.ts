import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export class IdeasService extends Service {
  public getIdeasGeo (params: unknown): AxiosPromise<any> {
    return this.api.get("api/v1/services/crowdsourcing/all", { params });
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

  public uploadFileIdea (id: number, files: Record<string, any>): AxiosPromise<any> {
    return this.api.post(`api/v1/services/crowdsourcing/${ id }/file`, files);
  }

  public createComment (id: number, payload: unknown): AxiosPromise<any> {
    return this.api.post(`api/v1/services/crowdsourcing/${ id }/comments`, payload, { headers: {
        "Content-Type": "text/plain"
      } });
  }

  public getComments (id: number, params: unknown): AxiosPromise<any> {
    return this.api.get(`api/v1/services/crowdsourcing/${ id }/comments`, { params });
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
