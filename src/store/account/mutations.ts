import { MutationTree } from 'vuex'

import { IAccount, ILoginResponse } from './models'
import { IAccountState } from './state'

const atob = (value: string) => process.env.SERVER ? Buffer.from(value, 'base64').toString('binary') : window.atob(value)

const mutation: MutationTree<IAccountState> = {
  setAccessToken (state:IAccountState, data: ILoginResponse) {
    state.accessToken = { token: data.access_token, expiresIn: Date.now() + (data.expires_in * 1000) }

    try {
      const payload = atob(data.refresh_token.split('.')[1])
      const { exp } = JSON.parse(payload) as {exp: number}

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.$cookies.set('session', data.refresh_token, {
        path: '/',
        expires: new Date(exp * 1000)
      })
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.$cookies.remove('session')
    }
  },

  clearAccount (state:IAccountState) {
    state.accessToken = null
    state.account = null
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.$cookies.remove('session')
  },

  setAccount (state:IAccountState, account: IAccount) {
    state.account = account
  }
}

export default mutation
