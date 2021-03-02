import { ActionTree } from 'vuex'

import { IRootState } from '../root/state'
import { IAccountState } from './state'

const actions: ActionTree<IAccountState, IRootState> = {
  localLogin (ctx, { username, password }) {
    console.log(this, username, password)
    // username: tchalov.pyotr@yandex.ru
    // password: 12345678
    // your code
  }
}

export default actions
