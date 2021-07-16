import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUsersState } from "src/store/types/users";
import {
  SET_DATA,
  SET_EMPTY,
  SET_FILTERS,
  UPDATE_PAGINATION
} from "src/store/constants/mutation-constants";
import { ACCOUNT_BLOCK, ACCOUNT_SET_ROLES, ACCOUNT_UNBLOCK, GET_DATA } from "src/store/constants/action-constants";
import { UsersService } from "src/api/users";

const initialState = (): IUsersState => {
  return {
    data: null,
    filters: null,
    pagination: {
      limit: 10,
      offset: 0
    }
  };
};

const state: () => IUsersState = initialState;

const mutations: MutationTree<IUsersState> = {
  [SET_EMPTY]: state => Object.assign(state, initialState()),
  [SET_DATA]: (state, payload) => state.data = payload,
  [SET_FILTERS]: (state, payload) => state.filters = payload,
  [UPDATE_PAGINATION] (state, pagination) {
    state.pagination = { ...state.pagination, ...pagination };
  }
};

const actions: ActionTree<IUsersState, TRootState> = {
  async [GET_DATA] ({ commit, state }) {
    const { data } = await UsersService.getUsers({
      ...state.pagination
    });

    commit(SET_DATA, data);
  },

  async [ACCOUNT_BLOCK] (_, id) {
    await UsersService.blockUser(id);
  },

  async [ACCOUNT_UNBLOCK] (_, id) {
    await UsersService.unblockUser(id);
  },

  async [ACCOUNT_SET_ROLES] (_, { id, roles }) {
    await UsersService.changeUserRoles(id, roles);
  }
};

const getters: GetterTree<IUsersState, TRootState> = {
  tableData (state) {
    const { data } = state;

    if (data) {
      const items = data.items.map(i => ({
        ...i,
        roles: i.roles.map((role: any) => role.name)
      }));

      return {
        items: items
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

const users: Module<IUsersState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default users;
