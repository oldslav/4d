export interface IRole {
  id: number,
  name: string,
  description: string
}

export interface IAccount {
  id: number,

  accountFacebookName: string | null,
  accountGoogleName: string | null,
  accountVkName: string | null,
  avatarLocation: string | null,

  email: string,
  phone: string,

  firstName: string,
  lastName: string,
  patronymic: string,

  "job_position": string,
  "no_patronymic": boolean,
  "isYuristic": boolean

  pcmEmail: boolean,
  pcmPhone: boolean,
  pcmTelegram: boolean,
  pcmWhatsApp: boolean,
  telegramAlias: string | null,

  roles: IRole[]
}

export interface ILoginPayload {
  username: string,
  password: string
}

export interface ILoginResponse {
  // eslint-disable-next-line camelcase
  access_token:string,
  // eslint-disable-next-line camelcase
  refresh_token: string,
  // eslint-disable-next-line camelcase
  expires_in: number
}

export interface IAccessToken {
  token: string,
  expiresIn: number
}
