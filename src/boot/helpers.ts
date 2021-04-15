import { matArrowDropDown } from "@quasar/extras/material-icons";

import { boot } from "quasar/wrappers";

export default boot(({ Vue }) => {
  Vue.mixin({
    methods: {
      matArrowDropDown () {
        return matArrowDropDown;
      }
    }
  });
});
