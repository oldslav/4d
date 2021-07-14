import { IVacancy, TVacancyReferencesResponse } from "src/api/services/vacancy";

export enum VacancyReferencesEnum {
  closureReason = "closure_reason",
  employmentType = "employment_type",
  experience = "experience",
  profIndustry = "prof_industry",
  respondStatus = "respond_status",
  vacancyStatus = "vacancy_status",
  workSchedule = "work_schedule",
}

export enum VacancyStatusesEnum {
  published = 4,
  closed = 5
}

export interface IServiceVacancyState {
  references: TVacancyReferencesResponse,
  isExistsReferences: boolean;
  vacancies: {
    count: number,
    items: IVacancy[]
  }
}
