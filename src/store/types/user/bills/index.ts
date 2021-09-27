export interface IBillsState {
  data: any,
  filters: {
    paid: boolean | null,
    ticketId: number | null
  }
}
