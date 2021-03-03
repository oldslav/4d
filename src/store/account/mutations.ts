import { MutationTree } from 'vuex'

import { IAccount, ILoginResponse } from './models'
import { IAccountState } from './state'

const mutation: MutationTree<IAccountState> = {
  setAccessToken (state:IAccountState, data: ILoginResponse) {
    state.accessToken = { token: data.access_token, expiresIn: Date.now() + (data.expires_in * 1000) }
  },

  clearAccount (state:IAccountState) {
    state.accessToken = null
    state.account = null
  },

  setAccount (state:IAccountState, account: IAccount) {
    state.account = account
  }
}

export default mutation
