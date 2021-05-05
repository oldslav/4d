import { IAccount, IAccessToken } from "./models";

export interface IAccountState {
  account: IAccount | null,
  accessToken: IAccessToken | null,
  refreshToken: IAccessToken | null
}
