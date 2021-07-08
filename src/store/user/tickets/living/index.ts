import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import { SET_USER_TICKET, SET_USER_TICKETS } from "src/store/constants/mutation-constants";
import {
  REQUEST_APPROVAL_LIVING,
  ADD_USER_TICKET_FILE_LIVING,
  CREATE_USER_TICKET_LIVING,
  DELETE_USER_TICKET_LIVING,
  GET_USER_TICKETS_LIVING,
  GET_EMPLOYEE_TICKETS_LIVING,
  REJECT_TICKET_LIVING,
  ADD_USER_TICKET_NEIGHBOR,
  APPROVE_TICKET_LIVING,
  UPDATE_TICKET_APARTMENT,
  UPDATE_TICKET_APARTMENT_VIEWED
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
  async [GET_USER_TICKETS_LIVING] ({ state, commit }) {
    const { filters } = state;

    const { data } = await TicketsService.getTicketsLiving({
      filters
    });

    commit(SET_USER_TICKETS, data);
  },

  async [GET_USER_TICKET] ({ commit }, ticketId) {
    const { data } = await TicketsService.getTicketLiving(ticketId);

    data.documents = {
      passport: [],
      snils: [],
      inn: [],
      job: [],
      job_petition: []
    };

    await Promise.all(data.images.map(async (doc: any) => {
      const { imagePath, docType, fileName } = doc;
      const { data: fileData } = await Service.getFile(imagePath);
      const file = new File([fileData], fileName, {
        type: fileData.type
      });

      data.documents[docType.name].push(file);
    }));

    commit(SET_USER_TICKET, data);
  },

  async [GET_EMPLOYEE_TICKETS_LIVING] ({ state, commit }) {
    const { filters } = state;

    const f = Object.assign({}, filters, { statusId: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }); // no draft

    const { data } = await TicketsService.getEmployeeTicketsLiving({ filters: f });

    commit(SET_USER_TICKETS, data);
  },

  [REJECT_TICKET_LIVING] (_, { id, reason }) {
    return TicketsService.rejectTicketLiving(id, reason);
  },

  [APPROVE_TICKET_LIVING] (_, { id, payload }) {
    return TicketsService.approveTicketLiving(id, payload);
  },

  async [UPDATE_TICKET_APARTMENT] (_, { requestId, apartmentId }) {
    await TicketsService.choiceApartment(requestId, apartmentId);
  },

  async [UPDATE_TICKET_APARTMENT_VIEWED] (_, { requestId, apartmentViewed }) {
    await TicketsService.viewedApartment(requestId, apartmentViewed);
  },

  async [DELETE_USER_TICKET_LIVING] ({ dispatch }, payload) {
    await TicketsService.deleteTicketLiving(payload);

    dispatch(GET_USER_TICKETS_LIVING);
  },

  async [CREATE_USER_TICKET_LIVING] (_, payload) {
    const { data } = await TicketsService.createTicketLiving(payload);

    return data;
  },

  async [ADD_USER_TICKET_FILE_LIVING] (_, { id, payload }) {
    await TicketsService.addTicketLivingFile(id, payload);
  },

  async [ADD_USER_TICKET_NEIGHBOR] ({ rootGetters }, { ticketId, payload }) {
    const { documents, ...neighbor } = payload;
    const { data: { id } } = await TicketsService.addTicketLivingNeighbor(ticketId, neighbor);
    const awaits: any = [];
    Object.entries(documents).forEach(([key, val]: any) => {
      val.forEach((file: any) => {
        if (!file.id) {
          const type = rootGetters["references/getDocTypeByName"](key);
          const payload = new FormData();
          payload.append("file", file);
          payload.append("typeId", type.id);
          awaits.push(payload);
        }
      });
    });
    await Promise.all(awaits.map((f: any) => TicketsService.addTicketLivingNeighborFile(id, ticketId, f)));
  },

  [REQUEST_APPROVAL_LIVING] ({ dispatch }, id) {
    return TicketsService.requestApprovalLiving(id)
      .then(() => dispatch(GET_USER_TICKETS_LIVING));
  }
};

const getters: GetterTree<IUserTicketsState, TRootState> = {
  tableData (state) {
    const { data } = state;

    if (data) {
      return {
        items: data.items
      };
    }
  },

  tablePagination (state) {
    const { pagination, data } = state;

    if (data) {
      return {
        rowsPerPage: pagination.limit,
        page: pagination.offset,
        rowsNumber: data.count
      };
    }
  }
};

const living: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default living;
