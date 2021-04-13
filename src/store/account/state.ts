import { IAccount, IAccessToken } from "./models";

export interface IAccountState {
  account: IAccount | null,
  accessToken: IAccessToken | null
}

function state (): IAccountState {
  return {
    account: null,
    accessToken: null
  };
}

export default state;
