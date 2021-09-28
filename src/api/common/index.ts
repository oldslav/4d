import { AxiosInstance, AxiosPromise } from "axios";

interface Aggregates {
  [key: string]: any;
}

interface Extras {
  [key: string]: any;
}

export interface DocumentPayload {
  file: any,
  typeId: number
}

export interface ProfileFormPayload {
  name: {
    first: string | null,
    full: string | null,
    last: string | null,
    patronymic: string | null
  },
  contacts: {
    email: string | null,
    phone: string | null,
    telegramAlias: string | null
  }
}

export interface NewPasswordPayload {
  oldPassword: string | null,
  password: string | null,
  confirmPassword: string | null
}

export interface ResetPasswordPayload {
  token: string | null,
  password: string | null,
  confirmPassword: string | null
}

export interface PaginationOutput {
  count: number;
  items: Array<any>;
  aggregates?: Aggregates;
  extras?: Extras;
}

export interface PaginationParams {
  limit: number;
  offset: number;
  sort?: string | null;
}

export class Service {
  protected api: AxiosInstance;

  constructor (axios: AxiosInstance) {
    this.api = axios;
  }

  public getFile (url: string): AxiosPromise<any> {
    return this.api.get(url, { responseType: "blob" });
  }
}
