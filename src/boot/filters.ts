import { boot } from "quasar/wrappers";
import moment from "moment";

export default boot(({ Vue }) => {
  Vue.filter("fromNow", (date: any) => moment(date).fromNow());
  Vue.filter("formatDate", (date: any) => moment(date).format("DD.MM.YYYY"));
});
