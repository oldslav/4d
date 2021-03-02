import { boot } from 'quasar/wrappers'
import { Cookies, LooseDictionary } from 'quasar'

declare module 'vuex/types/index' {
  interface Store<S> {
    $cookies: Cookies
  }
}

export default boot(({ app, ssrContext }) => {
  if (app.store) {
    app.store.$cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext as LooseDictionary) : Cookies
  }
})
