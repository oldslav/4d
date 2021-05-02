import { ActionContext, ActionTree, GetterTree, Module } from "vuex";
import { INeighborsState } from "../../types/user/neighbors";
import { IRootState } from "src/store/types/root";
import { CREATE_USER_NEIGHBOR, DELETE_USER_NEIGHBOR, UPDATE_USER_NEIGHBOR } from "src/store/constants/action-constants";
import { UserNeighborsService } from "src/api/user/neighbors";

const state: INeighborsState = {
  items: []
};

const actions: ActionTree<INeighborsState, IRootState> = {
  [CREATE_USER_NEIGHBOR] (ctx: ActionContext<INeighborsState, IRootState>, neighbor) {
    return UserNeighborsService.createNeighbor(neighbor);
  },
  [UPDATE_USER_NEIGHBOR] (ctx: ActionContext<INeighborsState, IRootState>, neighbor) {
    return UserNeighborsService.updateNeighbor(neighbor);
  },
  [DELETE_USER_NEIGHBOR] (ctx: ActionContext<INeighborsState, IRootState>, id) {
    return UserNeighborsService.deleteNeighbor(id);
  }
};

const getters: GetterTree<INeighborsState, IRootState> = {
  getNeighbors (state: INeighborsState) {
    return state.items;
  }
};

const neighbors: Module<INeighborsState, IRootState> = {
  namespaced: true,
  state,
  actions,
  getters
};

export default neighbors;
