import { boot } from "quasar/wrappers";

export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  if (!process.env.SERVER) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const VueCesium = require("vue-cesium");

    Vue.use(VueCesium,{
      cesiumPath: "https://cdn.jsdelivr.net/npm/cesium@1.85.0/Build/Cesium/Cesium.js"
    });
  }
});
