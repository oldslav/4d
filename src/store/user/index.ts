import { Module } from "vuex";
import { IRootState } from "src/store/types/root";
import userTickets from "src/store/user/tickets";

const user: Module<any, IRootState> = {
  namespaced: true,
  modules: {
    userTickets
  }
};

export default user;
