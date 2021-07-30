import { AxiosPromise } from "axios";
import { PaginationOutput, Service } from "src/api/common";
import { VacancyReferencesEnum } from "src/store/types/vacancy";

export interface IVacancy {
  id: number;
  respondIsPresent: boolean;
}

export interface IVacancyReference {
  id: number;
  description: string;
}

export type TVacancyReferencesResponse = Record<VacancyReferencesEnum, IVacancyReference[]>

export interface IVacanciesResponse extends PaginationOutput {
  items: IVacancy[];
}

export class VacancyService extends Service {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public async getReferences (): AxiosPromise<TVacancyReferencesResponse> {
    return this.api.get("/api/v1/services/vacancy/references");
  }

  public getForCurrentUser (params: unknown): AxiosPromise<IVacanciesResponse> {
    return this.api.get("/api/v1/services/vacancy/user", { params });
  }

  public getForCompany (params: unknown): AxiosPromise<IVacanciesResponse> {
    return this.api.get("/api/v1/services/vacancy/company", { params });
  }

  public getForEmployee (params: unknown): AxiosPromise<IVacanciesResponse> {
    return this.api.get("/api/v1/services/vacancy/employee", { params });
  }

  public getUserResponds (params: Record<string, any>): AxiosPromise{
    return this.api.get("/api/v1/services/vacancy/respond/user", { params });
  }

  public createVacancy (values: unknown): AxiosPromise<never> {
    return this.api.post("/api/v1/services/vacancy", values);
  }

  public updateVacancy (vacancyId: number, values: unknown): AxiosPromise<never> {
    return this.api.put(`/api/v1/services/vacancy/${ vacancyId }`, values);
  }

  public closeVacancy (vacancyId: number, closureReasonId: number): AxiosPromise<never> {
    return this.api.put(`/api/v1/services/vacancy/${ vacancyId }/close`, { closureReasonId });
  }

  public publishVacancy (vacancyId: number): AxiosPromise<never> {
    return this.api.put(`/api/v1/services/vacancy/${ vacancyId }/publish`);
  }

  public rejectVacancy (vacancyId: number): AxiosPromise<never> {
    return this.api.put(`/api/v1/services/vacancy/${ vacancyId }/reject`);
  }

  public getVacancyById (vacancyId: number): AxiosPromise<IVacancy> {
    return this.api.get(`/api/v1/services/vacancy/${ vacancyId }`);
  }

  public search (params?: Record<string, any>): AxiosPromise {
    return this.api.get("/api/v1/services/vacancy/user", { params });
  }

  public respond (id: number, payload: Record<string, any>): AxiosPromise {
    return this.api.post(`/api/v1/services/vacancy/${ id }/respond`, payload);
  }

  public attachRespondFile (respondId: number, payload: FormData): AxiosPromise {
    return this.api.post(`/api/v1/services/vacancy/respond/${ respondId }/file`, payload);
  }

  public getVacancyRespondsForCompany (vacancyId: number, params?: Record<string, any>): AxiosPromise {
    return this.api.get(`/api/v1/services/vacancy/${ vacancyId }/respond/company`, { params });
  }

  public rejectVacancyCandidate (candidateId: number, reason: string): AxiosPromise {
    return this.api.put(`/api/v1/services/vacancy/respond/${ candidateId }/reject`, reason);
  }

  public inviteVacancyCandidate (candidateId: number, text: string): AxiosPromise {
    return this.api.put(`/api/v1/services/vacancy/respond/${ candidateId }/invite_for_interview`,text);
  }

  public interviewPassed (candidateId: number): AxiosPromise {
    return this.api.put(`/api/v1/services/vacancy/respond/${ candidateId }/interview_success`);
  }

  public sendOffer (candidateId: number): AxiosPromise {
    return this.api.put(`/api/v1/services/vacancy/respond/${ candidateId }/job_offer`);
  }

  public viewRespond (respondId: number): AxiosPromise {
    return this.api.get(`/api/v1/services/vacancy/respond/${ respondId }`);
  }

  public fetchEmployeeResponds (params?: Record<string, any>): AxiosPromise{
    return this.api.get("/api/v1/services/vacancy/respond/employee", { params });
  }

  public sendCompanyNotification (respondId: number, text :string): AxiosPromise {
    return this.api.post(`/api/v1/services/vacancy/respond/${ respondId }/employee/message`, text || "");
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,class-methods-use-this
  public exportVacancies (accessToken: string, params: Record<string, any>) {
    const url = new URL(`${ process.env.SERVER_API_HOST }/api/v1/services/vacancy/employee/export`);
    url.searchParams.append("access_token", accessToken);

    for (const name in params) {
      if (params.hasOwnProperty(name)) {
        url.searchParams.append(name, params[name]);
      }
    }

    window.open(url.toString());
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,class-methods-use-this
  public exportResponds (accessToken: string, params: Record<string, any>) {
    const url = new URL(`${ process.env.SERVER_API_HOST }/api/v1/services/vacancy/respond/employee/export`);
    url.searchParams.append("access_token", accessToken);

    for (const name in params) {
      if (params.hasOwnProperty(name)) {
        url.searchParams.append(name, params[name]);
      }
    }

    window.open(url.toString());
  }
}
