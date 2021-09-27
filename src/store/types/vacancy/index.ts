import { IVacancy, TVacancyReferencesResponse } from "src/api/services/vacancy";

export enum VacancyReferencesEnum {
  closureReason = "closure_reason",
  employmentType = "employment_type",
  experience = "experience",
  profIndustry = "prof_industry",
  publishedProfIndustry = "prof_industry_vacancies_is_published",
  respondStatus = "respond_status",
  vacancyStatus = "vacancy_status",
  workSchedule = "work_schedule",
}

export enum VacancyStatusesEnum {
  new = 1,
  moderation = 2,
  rejected = 3,
  published = 4,
  closed = 5,
}

export enum RespondStatusesEnum {
  not_viewed = 1,
  viewed = 2,
  invite = 3,
  reject = 4,
  interview_success = 5,
  job_offer = 6
}

export interface IServiceVacancyState {
  references: TVacancyReferencesResponse,
  isExistsReferences: boolean;
  isFailedLastSearch: boolean;
  currentVacancy: IVacancy | null,
  vacancies: {
    count: number,
    items: IVacancy[]
  }
}
