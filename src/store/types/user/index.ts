export interface IUserState {
  name: IUserName,
  email: string | null,
  phones: string | null,
  telegram: string | null,
  uid: string | null,
  login: string | null,
  createdAt: Date | null,
  updatedAt: Date | null
  access_token: string | null;
}

export interface IUserName {
  first: string | null,
  last: string | null,
  patronymic: string | null,
  full: string | null
}
