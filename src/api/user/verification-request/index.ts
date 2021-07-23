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
    return Promise.resolve({
      data: {
        "requestStatuses": [
          {
            "id": 2,
            "name": "on_approval",
            "description": "На утверждении"
          },
          {
            "id": 4,
            "name": "rejected",
            "description": "Отклонена"
          },
          {
            "id": 10,
            "name": "approved",
            "description": "Утверждена"
          }
        ]
      }
    });

    // return this.api.get("/api/v1/profile/company/request/references");
  }
}
