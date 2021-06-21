import { boot } from "quasar/wrappers";

export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const VueCesium = require("vue-cesium");
  
  Vue.use(VueCesium);
});
