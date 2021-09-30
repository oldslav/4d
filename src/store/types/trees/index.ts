import { IUserTicketsState } from "src/store/types/user/tickets";

export interface IServiceTreesState extends IUserTicketsState {
  treesStats: Array<any> | null;
  selectedTree: any;
}
