import { boot } from "quasar/wrappers";
import { SERVER_INIT } from "src/store/constants/action-constants";

export default boot(async ({ store, app, redirect }) => {
 const application = app as any;
 const darkMode = application.$q.cookies.get("darkMode");
 application.$q.dark.set(darkMode);

 await store.dispatch(SERVER_INIT);

 if (!store.getters.isAuthenticated) {
   return redirect({ name:"main" });
 }
});
