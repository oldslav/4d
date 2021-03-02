import { GetterTree } from 'vuex'

import { IRootState } from '../root/state'
import { IAccountState } from './state'

const getters: GetterTree<IAccountState, IRootState> = {
  getAccessToken (state: IAccountState) {
    return state.accessToken
  },

  isAuthenticated (state: IAccountState) {
    return state.account !== null
  },

  getAccount (state: IAccountState) {
    return state.account
  }
}

export default getters
