import { Module } from "vuex";
import { INeighborsState } from "src/store/types/neighbors";
import { IRootState } from "src/store/types/root";

const state: INeighborsState = {
  neighbors: null
};

const neighborsModule: Module<INeighborsState, IRootState> = {
  namespaced: true,
  state
};

export default neighborsModule;
