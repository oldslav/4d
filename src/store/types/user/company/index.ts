export interface ICompanyState {
  id: number | null,
  isVerify: boolean | null,
  profile: CompanyProfile,
  card: CompanyCard,
  bankDetails: CompanyBank
}

export interface CompanyProfile {
  profile_address: string | null,
  profile_description: string | null,
  profile_logo: string | null,
  profile_name: string | null,
  profile_phone: string | null,
  profile_site: string | null,
  profile_work_time: string | null
}

export interface CompanyCard {
  name: string | null,
  full_name: string | null,
  legal_address: string | null,
  real_address: string | null,
  inn: string | null,
  ogrnip: string | null,
  okpo: string | null,
  okved: string | null,
  email: string | null,
  site: string | null,
  phone: string[] | null
}

export interface CompanyBank {
  bank_account: string | null,
  bank_bik: string | null,
  bank_cor_account: string | null,
  bank_inn: string | null,
  bank_kpp: string | null,
  bank_name: string | null,
  bank_real_address: string | null
}
