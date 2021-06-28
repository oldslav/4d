export interface ICompanyState {
  id: number | null,
  isVerify: boolean | null,
  profile: CompanyProfile,
  card: CompanyCard,
  bankDetails: CompanyBank
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
  inn: string | null,
  ogrnip: string | null,
  okpo: string | null,
  okved: string | null,
  email: string | null,
  site: string | null,
  phone: string[] | null
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
