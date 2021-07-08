import { PaginationOutput, PaginationParams } from "src/api/common";

interface IUserVacancies extends PaginationOutput {}

interface IUserVacanciesPagination extends PaginationParams{}

export interface IUserVacancyState {
  pagination: IUserVacanciesPagination,
  data: IUserVacancies | null
}


