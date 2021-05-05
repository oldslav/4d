import axios, { AxiosInstance } from "axios";

interface Aggregates {
  [key: string]: any;
}

interface Extras {
  [key: string]: any;
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
}

export class Service {
  protected static api: AxiosInstance = axios;
}
