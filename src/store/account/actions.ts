import { ActionContext, ActionTree } from 'vuex'

import { IRootState } from '../root/state'
import { IAccountState } from './state'
import { ILoginPayload, ILoginResponse, IAccount, IAccessToken } from './models'

const formUrlEncoded = (x: { [key: string]: string | number; }) =>
  Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')

const actions: ActionTree<IAccountState, IRootState> = {
  async localLogin ({ commit, dispatch }: ActionContext<IAccountState, IRootState>, { username, password }: ILoginPayload) {
    const { data } = await this.$axios.post<ILoginResponse>(
      '/oauth/token',
      formUrlEncoded({
        username,
        password,
        grant_type: 'password'
      }),
      { skipAuth: true }
    )

    commit('setAccessToken', data)

    return dispatch('fetchAccount')
  },

  refreshToken ({ commit }: ActionContext<IAccountState, IRootState>) {
    const refreshToken = this.$cookies.get('session')

    if (refreshToken && this.REFRESH_PROMISE === null) {
      this.REFRESH_PROMISE = this.$axios.post<ILoginResponse>(
        '/oauth/token',
        formUrlEncoded({
          refresh_token: refreshToken,
          grant_type: 'refresh_token'
        }),
        { skipAuth: true }
      )
        .then((res) => {
          commit('setAccessToken', res.data)
          return Promise.resolve()
        })
        .catch(() => {
          commit('clearAccount')
        })
        .finally(() => {
          this.REFRESH_PROMISE = null
        })

      return this.REFRESH_PROMISE
    } else if (this.REFRESH_PROMISE !== null) {
      return this.REFRESH_PROMISE
    } else {
      commit('clearAccount')
    }
  },

  async getAccessToken ({ getters, dispatch }: ActionContext<IAccountState, IRootState>) {
    const _getters = getters as {getAccessToken: IAccessToken}

    if (_getters.getAccessToken !== null && _getters.getAccessToken.expiresIn > Date.now() + 3600) {
      return _getters.getAccessToken.token
    }

    try {
      await dispatch('refreshToken')
      return _getters.getAccessToken ? _getters.getAccessToken.token : null
    } catch (e) {
      return null
    }
  },

  getAccount () {
    return this.$axios.get<IAccount>('/api/v1/account')
      .then((res) => res.data)
  },

  async fetchAccount ({ dispatch, commit }: ActionContext<IAccountState, IRootState>) {
    try {
      commit('setAccount', await dispatch('getAccount'))
    } catch (e) {
      // Do nothing
    }
  }
}

export default actions
