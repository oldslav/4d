import moment from "moment";
import { IVueI18n } from "vue-i18n";

import { boot } from "quasar/wrappers";
import { I18nNameLike, I18nNameLikeProps, I18nNamePropertyByLang } from "src/store/types/common";


const fromNow = (date: any) => moment(date).fromNow();
const formatDate = (date: any) => moment(date).format("DD.MM.YYYY");
const ticketDate = (date: any) => moment().isSame(moment(date), "day") ? fromNow(date) : formatDate(date);
const i18nName = (i18n: IVueI18n) => (value: I18nNameLike) => {
  const locale = i18n.locale as I18nNameLikeProps;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const property = I18nNamePropertyByLang[locale] as I18nNameLikeProps;

  return value[property as I18nNameLikeProps];
};

export default boot(({ Vue,app }) => {
  Vue.filter("fromNow", fromNow);
  Vue.filter("formatDate", formatDate);
  Vue.filter("ticketDate", ticketDate);
  Vue.filter("i18nName", i18nName(app.i18n as IVueI18n));
});
