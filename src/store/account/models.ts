export interface IRole {
  id: number,
  name: string,
  description: string
}

export interface IAccountName {
  first: string | null,
  last: string | null,
  patronymic: string | null,
  full: string | null
}

export interface IAccount {
  name: IAccountName,
  email: string | null,
  phones: string | null,
  telegram: string | null,
  uid: string | null,
  login: string | null,
  createdAt: Date | null,
  updatedAt: Date | null
}

export interface ILoginPayload {
  username: string,
  password: string
}

export interface ILoginResponse {
  access_token:string,
  refresh_token: string,
  expires_in: number
}

export interface IAccessToken {
  token: string,
  expiresIn: number
}
