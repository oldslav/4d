import { ActionTree, Module, MutationTree } from "vuex";
import {
  SET_DATA,
  SET_EMPTY
} from "src/store/constants/mutation-constants";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import { GET_DATA, CREATE_COMMENT } from "src/store/constants/action-constants";

const initialState = (): IUserTicketsState => {
  return {
    filters: {
      statusId: null,
      typeId: null,
      authorId: null,
      query: null
    },
    pagination: {
      limit: 10,
      offset: 1
    },
    data: null
  };
};

const state = initialState;

const mutations: MutationTree<IUserTicketsState> = {
  [SET_EMPTY]: state => Object.assign(state, initialState()),
  [SET_DATA]: (state, payload) => state.data = payload
};

const actions: ActionTree<IUserTicketsState, TRootState> = {
  async [GET_DATA] ({ commit }, { id }) {
    const { data } = await this.service.services.ideas.getComments(id, {});

    commit(SET_DATA, data);
  },

  async [CREATE_COMMENT] (_, { id, payload }) {
    await this.service.services.ideas.createComment(id, payload);
  }
};

const comments: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default comments;
