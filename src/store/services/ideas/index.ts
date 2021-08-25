import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import {
  SET_CURRENT,
  SET_DATA,
  SET_EMPTY, SET_REFERENCES,
  UPDATE_PAGINATION
} from "src/store/constants/mutation-constants";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import {
  CREATE_IDEA,
  DELETE_ITEM,
  GET_CURRENT,
  GET_DATA, GET_REFERENCES,
  UPDATE_LIKE,
  UPDATE_STATUS, UPDATE_VOTE
} from "src/store/constants/action-constants";

const initialState = (): IUserTicketsState => {
  return {
    filters: {
      statusId: null,
      typeId: null
    },
    pagination: {
      limit: 10,
      offset: 1
    },
    data: null,
    current: null,
    references: null
  };
};

const state = initialState;

const mutations: MutationTree<IUserTicketsState> = {
  [SET_EMPTY]: state => Object.assign(state, initialState()),
  [SET_DATA]: (state, payload) => state.data = payload,
  [SET_CURRENT]: (state, payload) => state.current = payload,
  [SET_REFERENCES]: (state, payload) => state.references = payload,
  [UPDATE_PAGINATION] (state, pagination) {
    state.pagination = { ...state.pagination, ...pagination };
  }
};

const actions: ActionTree<IUserTicketsState, TRootState> = {
  async [GET_DATA] ({ state, commit }) {
    const { data } = await this.service.services.ideas.getIdeas({
      ...state.filters,
      limit: state.pagination.limit,
      offset: state.pagination.offset - 1
    });

    commit(SET_DATA, data);
    commit(UPDATE_PAGINATION, { rowsNumber: data.count });
  },

  async [CREATE_IDEA] (_, payload) {
    await this.service.services.ideas.createIdea(payload);
  },

  async [GET_CURRENT] ({ commit }, id) {
    const { data } = await this.service.services.ideas.getIdea(id);

    commit(SET_CURRENT, data);
  },

  async [UPDATE_LIKE] (_, id) {
    await this.service.services.ideas.likeIdea(id);
  },

  async [UPDATE_STATUS] (_, { id, statusId }) {
    await this.service.services.ideas.changeIdeaStatus(id, statusId);
  },

  async [UPDATE_VOTE] (_, { id, answerId }) {
    await this.service.services.ideas.voteIdea(id, answerId);
  },

  async [DELETE_ITEM] (_, id) {
    await this.service.services.ideas.cancelIdea(id);
  },

  async [GET_REFERENCES] ({ commit }) {
    const type = ["crowdSourcingTypes", "crowdSourcingVoteAnswers", "crowdSourcingStatuses", "crowdfundingCategories"].toString();
    const { data } = await this.service.references.getReferences(type);
    commit(SET_REFERENCES, data);
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

const ideas: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default ideas;
