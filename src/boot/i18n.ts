import { boot } from "quasar/wrappers";
import Quasar from "quasar";
import messages, { quasarLangMapping } from "src/i18n";
import Vue from "vue";
import VueI18n from "vue-i18n";

declare module "vue/types/vue" {
  interface Vue {
    i18n: VueI18n
  }
}

Vue.use(VueI18n);

const numberFormats = {
  "EN": {
    currency: {
      style: "currency",
      currency: "USD"
    }
  },
  "RU": {
    currency: {
      style: "currency",
      currency: "RUB",
      currencyDisplay: "symbol"
    }
  }
};

const pluralizationRules = {
  RU: (choice: number, choiceLength: number) => {
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
  EN: (choice: number, choiceLength: number) => choice === 1 ? 0 : choiceLength - 1
};

export const i18n = new VueI18n({
  locale: "RU",
  fallbackLocale: "EN",
  messages,
  pluralizationRules,
  numberFormats
});

export default boot(({ app }) => {
  const application = app as any;

  // Set i18n instance on app
  i18n.locale = application.$cookies.get("locale") || "RU";
  app.i18n = i18n;

  if (!process.env.SERVER) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    i18n.vm.$watch("locale", function (val) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const quasarLang = quasarLangMapping[val];

      import(`quasar/lang/${ quasarLang }`).then((language) => {
        Quasar.lang.set(language.default);
      });

    }, { immediate: true });
  }
});
