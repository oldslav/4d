import { IAccount } from "./models";

export interface IAccountState {
  account: IAccount | null,
  accessTokenAwait: Promise<unknown> | null,
}
