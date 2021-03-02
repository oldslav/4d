import { GetterTree } from 'vuex'

import { IRootState } from '../root/state'
import { IAccountState } from './state'

const getters: GetterTree<IAccountState, IRootState> = {
  getAccount (/* context */) {
    // your code
  },

  isAuthenticated (/* context */) {
    // your code
  }
}

export default getters
