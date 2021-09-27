import { AxiosPromise } from "axios";
import { Service } from "src/api/common";

export class VerificationRequestService extends Service {
  public findAll (params?: Record<string, any>): AxiosPromise {
    return this.api.get("/api/v1/profile/company/request", { params });
  }

  public approveRequest (id: number, text: string): AxiosPromise {
    return this.api.put(`/api/v1/profile/company/request/${ id }/approve`, text);
  }

  public rejectRequest (id: number, reason: string): AxiosPromise {
    return this.api.put(`/api/v1/profile/company/request/${ id }/reject`, reason);
  }

  public getVerificationRequestsReferences (): Promise<any> {
    return this.api.get("/api/v1/profile/company/request/references");
  }
}
