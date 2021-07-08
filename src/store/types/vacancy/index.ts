import { TVacancyReferencesResponse } from "src/api/user/vacancy";

export enum VacancyReferencesEnum {
  closureReason = "closure_reason",
  employmentType = "employment_type",
  experience = "experience",
  profIndustry = "prof_industry",
  respondStatus = "respond_status",
  vacancyStatus = "vacancy_status",
  workSchedule = "work_schedule",
}

export interface IServiceVacancyState {
  references: TVacancyReferencesResponse,
  isExistsReferences: boolean;
}
