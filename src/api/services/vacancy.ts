import { AxiosPromise } from "axios";
import { PaginationOutput, Service } from "src/api/common";
import { VacancyReferencesEnum } from "src/store/types/vacancy";

export interface IVacancy {

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

  public exportVacancies (params: Record<string, any>): AxiosPromise<never> {
    return this.api.get("/api/v1/services/vacancy/employee/export", params);
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
}
