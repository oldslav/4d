import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import { SET_USER_TICKETS, SET_USER_TICKET } from "src/store/constants/mutation-constants";
import {
  ADD_USER_TICKET_FILE_WAREHOUSE,
  ADD_WAREHOUSE_FILES,
  CREATE_USER_TICKET_WAREHOUSE,
  DELETE_USER_TICKET_WAREHOUSE,
  GET_USER_TICKETS_WAREHOUSE,
  GET_EMPLOYEE_TICKETS_WAREHOUSE,
  REJECT_TICKET_WAREHOUSE,
  APPROVE_TICKET_WAREHOUSE, SEND_CONTRACT_INFO_WAREHOUSE, GET_USER_TICKET
} from "src/store/constants/action-constants";
import { TicketsService } from "src/api/user/tickets/tickets";
import { Service } from "src/api/common";

const state: IUserTicketsState = {
  filters: null,
  pagination: {
    limit: 10,
    offset: 1
  },
  data: null,
  current: null
};

const mutations: MutationTree<IUserTicketsState> = {
  [SET_USER_TICKETS] (state, payload) {
    state.data = payload;
  },
  [SET_USER_TICKET] (state, payload) {
    state.current = payload;
  }
};

const actions: ActionTree<IUserTicketsState, TRootState> = {
  async [CREATE_USER_TICKET_WAREHOUSE] ({ dispatch }, payload) {
    const { documents, ...result } = payload;
    const { data: { id } } = await TicketsService.createTicketWarehouse(result);
    await dispatch(ADD_WAREHOUSE_FILES, { id, documents });
    await TicketsService.requestApprovalWarehouse(id);
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
  },

  async [GET_USER_TICKETS_WAREHOUSE] ({ state, commit }) {
    const { filters } = state;

    const { data } = await TicketsService.getTicketsWarehouse({
      filters
    });

    commit(SET_USER_TICKETS, data);
  },

  async [GET_USER_TICKET] ({ commit }, id) {
    const { data } = await TicketsService.getWarehouseTicketById(id);
    const { images, ...ticket } = data;
    const documents: any = {
      passport: []
    };
    await Promise.all(images.map(async (doc: any) => {
      const { imagePath, docType, fileName } = doc;
      const { data } = await Service.getFile(imagePath);
      const file = new File([data], fileName, { type: data.type });
      documents[docType.name].push(file);
    }));
    commit(SET_USER_TICKET, { ...ticket, documents });
  },

  async [GET_EMPLOYEE_TICKETS_WAREHOUSE] ({ state, commit }) {
    const { filters } = state;

    const f = Object.assign({}, filters, { statusId: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] });

    const { data } = await TicketsService.getEmployeeTicketsWarehouse({ filters: f });

    commit(SET_USER_TICKETS, data);
  },

  async [REJECT_TICKET_WAREHOUSE] (_, { id, reason }) {
    await TicketsService.rejectTicketWarehouse(id, reason);
  },

  async [APPROVE_TICKET_WAREHOUSE] (_, { id }) {
    await TicketsService.approveTicketWarehouse(id);
  },

  async [DELETE_USER_TICKET_WAREHOUSE] ({ dispatch }, payload) {
    await TicketsService.deleteTicketWarehouse(payload);
    await dispatch(GET_USER_TICKETS_WAREHOUSE);
  },

  async [SEND_CONTRACT_INFO_WAREHOUSE] ({ dispatch }, { id, payload }) {
    await TicketsService.sendContractInfoWarehouse(id, payload);
    await dispatch(GET_EMPLOYEE_TICKETS_WAREHOUSE);
  }
};

const getters: GetterTree<IUserTicketsState, TRootState> = {
  getCurrentTicket: (state) => state.current
};
const warehouse: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default warehouse;
