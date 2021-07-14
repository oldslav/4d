import { boot } from "quasar/wrappers";
import { Cookies, LooseDictionary } from "quasar";

declare module "vuex/types/index" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $cookies: Cookies
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default boot(({ app, ssrContext }) => {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext as LooseDictionary) : Cookies;
  const application = app as any;

  application.$cookies = cookies;

  if (app.store) {
    app.store.$cookies = cookies;
  }
});
