export interface IAccessToken {
  active: boolean,
  aud: string[],
  authorities: string[],
  // eslint-disable-next-line camelcase
  client_id: string,
  exp: number,
  jti: string,
  scope: string,
  // eslint-disable-next-line camelcase
  user_name: string
}

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

  'job_position': string,
  'no_patronymic': boolean,
  'isYuristic': boolean

  pcmEmail: boolean,
  pcmPhone: boolean,
  pcmTelegram: boolean,
  pcmWhatsApp: boolean,
  telegramAlias: string | null,

  roles: IRole[]
}

export interface IAccountState {
  account: IAccount | null,
  access: IAccessToken | null
}

function state (): IAccountState {
  return {
    account: null,
    access: null
  }
}

export default state
