interface IUserTicketsList {
  [index: number]: IUserTicketsItem
}

interface IUserTicketsItem {

}

interface IUserTickets {
  limit: number;
  offset: number;
  aggregates: Array<any>;
  items: IUserTicketsList | null;
}

export interface IUserTicketsState {
  filters: any,
  data: IUserTickets | null
};
