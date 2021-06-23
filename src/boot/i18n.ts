import { boot } from "quasar/wrappers";
import messages from "src/i18n";
import Vue from "vue";
import VueI18n from "vue-i18n";

declare module "vue/types/vue" {
  interface Vue {
    i18n: VueI18n
  }
}

Vue.use(VueI18n);

const pluralizationRules = {
  ru: (choice: number, choiceLength: number) => {
    const teen = choice > 10 && choice < 20;
    const endsWithOne = choice % 10 === 1;

    if (!teen && endsWithOne && choice % 100 !== 11) {
      return 0;
    }
    if (!teen && choice % 10 >= 2 && choice % 10 <= 4 && (choice % 100 < 12 || choice % 100 > 14)) {
      return 1;
    }
    // eslint-disable-next-line no-mixed-operators
    if (choice === 0 || choice % 10 >= 5 && choice % 10 <= 9 && (choice % 100 >= 11 && choice % 100 <= 14)) {
      return 2;
    }

    return choiceLength - 1;
  },
  en: (choice: number, choiceLength: number) => choice === 1 ? 0 : choiceLength - 1
};

export const i18n = new VueI18n({
  locale: "ru",
  fallbackLocale: "en-us",
  messages,
  pluralizationRules
});

export default boot(({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n;
});
