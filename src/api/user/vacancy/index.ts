import { AxiosPromise } from "axios";
import { PaginationOutput, Service } from "src/api/common";
import { VacancyReferencesEnum } from "src/store/types/vacancy";

interface IVacancy {

}

export interface IVacancyReference {
  id: number;
  description: string;
}

export type TVacancyReferencesResponse = Record<VacancyReferencesEnum, IVacancyReference[]>

export interface IVacancyResponse extends PaginationOutput {
  items: IVacancy[];
}

export class VacancyService extends Service {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public static async getReferences (): AxiosPromise<TVacancyReferencesResponse> {
    return this.api.get("/api/v1/services/vacancy/references");
  }

  public static getForCurrentUser (params: unknown): AxiosPromise<IVacancyResponse> {
    return this.api.get("/api/v1/services/vacancy/user", { params });
  }

  public static getForCompany (params: unknown): AxiosPromise<IVacancyResponse> {
    return this.api.get("/api/v1/services/vacancy/company", { params });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public static createVacancy (values: any): AxiosPromise<never> {
    return this.api.post("/api/v1/services/vacancy", values);
  }
}
