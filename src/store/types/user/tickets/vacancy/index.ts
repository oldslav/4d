import { PaginationOutput, PaginationParams } from "src/api/common";
import { IVacancy } from "src/api/services/vacancy";

interface IUserVacancies extends PaginationOutput {}

interface IUserVacanciesPagination extends PaginationParams{}

export interface IUserVacancyState {
  pagination: IUserVacanciesPagination,
  data: IUserVacancies | null,
  entity: IVacancy | null,
}


