import { ActionTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import { SET_USER_TICKETS } from "src/store/constants/mutation-constants";
import {
  ADD_USER_TICKET_FILE_WAREHOUSE,
  ADD_WAREHOUSE_FILES,
  CREATE_USER_TICKET_WAREHOUSE
} from "src/store/constants/action-constants";
import { TicketsService } from "src/api/user/tickets/tickets";

const state: IUserTicketsState = {
  filters: null,
  data: null
};

const mutations: MutationTree<IUserTicketsState> = {
  [SET_USER_TICKETS] (state, payload) {
    state.data = payload;
  }
};

const actions: ActionTree<IUserTicketsState, TRootState> = {
  [CREATE_USER_TICKET_WAREHOUSE] ({ dispatch }, payload) {
    const { documents, ...result } = payload;
    return TicketsService.createTicketWarehouse(result)
      .then(({ data }) => {
        const { id } = data;
        return dispatch(ADD_WAREHOUSE_FILES, { id, documents });
      });
  },

  [ADD_WAREHOUSE_FILES] ({ dispatch, rootGetters }, { id, documents }) {
    const awaits: any = [];
    Object.entries(documents).forEach(([key, val]: any) => {
      val.forEach((file: any) => {
        const type = rootGetters["references/getDocTypeByName"](key);
        const payload = new FormData();
        payload.append("file", file);
        payload.append("typeId", type.id);
        awaits.push(payload);
      });
    });
    return Promise.all(awaits.map((f: any) => dispatch(ADD_USER_TICKET_FILE_WAREHOUSE, { id, file: f })));
  },

  [ADD_USER_TICKET_FILE_WAREHOUSE] (_, { id, file }) {
    return TicketsService.addTicketsWarehouseFile(id, file);
  }
};

const warehouse: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default warehouse;
