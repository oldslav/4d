import { PaginationOutput, PaginationParams } from "src/api/common";
import { IVacancy } from "src/api/services/vacancy";

export interface IUserVacancyState {
  pagination: PaginationParams,
  data: PaginationOutput | null,
  entity: IVacancy | null,
  vacancyCandidatesData: PaginationOutput | null,
  vacancyCandidatesPagination: PaginationParams
  employeeResponds: PaginationOutput | null,
  employeeRespondsPagination: PaginationParams
}


