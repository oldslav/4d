import { Module } from "vuex";
import { INeighborsState } from "../../types/user/neighbors";
import { IRootState } from "src/store/types/root";

const state: INeighborsState = {
  neighbors: null
};

const neighbors: Module<INeighborsState, IRootState> = {
  namespaced: true,
  state
};

export default neighbors;
