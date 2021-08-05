import { Document } from "src/store/types/common";

export enum CompanyVerificationRequestStatuses {
  inProgress = 2,
  rejected = 4,
  approved = 10,
}

export interface ICompanyState {
  id: number | null,
  profile: CompanyProfile,
  card: CompanyCard,
  bankDetails: CompanyBank
  verifyRequest: ICompanyVerifyRequest | null
}

export interface CompanyProfile {
  address: string | null,
  description: string | null,
  logo: string | null,
  name: string | null,
  phone: string | null,
  site: string | null,
  workTime: string | null
}

export interface CompanyCard {
  name: string | null,
  fullName: string | null,
  legalAddress: string | null,
  realAddress: string | null,
  documents: {
    [key: string]: Partial<Document>[];
  } | null,
  email: string | null,
  site: string | null,
  phones: string[] | null,
  okpo: string | null,
  okved: string | null
}

export interface CompanyBank {
  account: string | null,
  bik: string | null,
  corAccount: string | null,
  inn: string | null,
  kpp: string | null,
  name: string | null,
  realAddress: string | null
}

export interface ICompanyVerifyRequest {
  status: {
    id: number,
    name: string,
    description: string
  }
}
