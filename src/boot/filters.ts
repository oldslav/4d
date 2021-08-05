import { boot } from "quasar/wrappers";
import moment from "moment";

const fromNow = (date: any) => moment(date).fromNow();
const formatDate = (date: any) => moment(date).format("DD.MM.YYYY");
const ticketDate = (date: any) => moment().isSame(moment(date), "day") ? fromNow(date) : formatDate(date);

export default boot(({ Vue }) => {
  Vue.filter("fromNow", fromNow);
  Vue.filter("formatDate", formatDate);
  Vue.filter("ticketDate", ticketDate);
});
