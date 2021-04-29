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
