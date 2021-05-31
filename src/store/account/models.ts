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

export interface IContacts {
  email:string | null,
  pcm: {
    email: boolean,
    phone: boolean,
    telegram: boolean,
    whatsApp: boolean
  },
  phone: string | null,
  telegramAlias: string | null
}

// export interface IAccount {
//   name: IAccountName,
//   email: string | null,
//   phones: string | null,
//   telegram: string | null,
//   uid: string | null,
//   login: string | null,
//   createdAt: Date | null,
//   updatedAt: Date | null,
//   roles: IRole[] | null
// }

export interface IAccount {
  name: IAccountName,
  contacts: IContacts,
  id: string | null,
  jobPosition: string | null,
  created: string | null,
  updated: string | null,
  roles: IRole[] | null
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
