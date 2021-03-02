import { ActionTree } from 'vuex'
import { IRootState } from './state'

const actions: ActionTree<IRootState, IRootState> = {
  serverInit (/* context */) {
    // console.log('serverInit')
    // your code
  },

  browserInit (/* context */) {
    // console.log('browserInit')
    // your code
  }
}

export default actions
