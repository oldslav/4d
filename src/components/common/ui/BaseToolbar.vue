<template lang="pug">
  q-toolbar
    template(v-if="isMobile")
      BaseTabs(v-model="tab" isFullWidth)
        q-route-tab(:to="{ name: 'main' }" name="main" icon="o_account_circle" :label="$t('entity.main')").col
        q-route-tab(:to="{ name: 'playground' }" name="playground" icon="o_account_circle" :label="$t('entity.playground')").col
        q-route-tab(:to="{ name: 'user-profile' }" name="profile" icon="o_account_circle"  :label="$t('entity.profile')").col
        q-route-tab(:to="{ name: 'error-page' }" name="error-page" icon="o_account_circle" label="Ошибка").col

    template(v-else)
      BaseTabs(v-model="tab")
        q-route-tab(:to="{ name: 'main' }" name="main" icon="o_account_circle" :label="$t('entity.main')")
        q-route-tab(:to="{ name: 'playground' }" name="playground" icon="o_account_circle" :label="$t('entity.playground')")
        q-route-tab(:to="{ name: 'user-profile' }" name="profile" icon="o_account_circle"  :label="$t('entity.profile')")
        q-route-tab(:to="{ name: 'error-page' }" name="error-page" icon="o_account_circle" label="Ошибка")
      q-space
      q-btn(round dense icon="o_account_circle" text-color="primary")
        q-menu
          q-list(dense)
            q-item(:to="{ name: 'profile' }" exact)
              q-item-section(avatar)
                q-icon(name="o_account_circle")
              q-item-section
                | {{ $t("entity.profile") }}

            q-separator(spaced)

            q-item(tag="label" v-ripple)
              q-item-section
                q-select(v-model="locale" color="primary" :options="locales" option-label="label" option-value="value" filled flat dense)
            q-item(tag="label" v-ripple)
              q-item-section(avatar)
                q-toggle(
                  v-model="darkMode" unchecked-icon="dark_mode" checked-icon="light_mode"
                  color="dark" icon-color="yellow" keep-color :label="$t('common.theme')" )
</template>

<script>
  import BaseTabs from "components/common/BaseTabs";

  export default {
    name: "BaseToolbar",
    components: { BaseTabs },
    data () {
      return {
        isMenuOpened: false,
        tab: "main"
      };
    },
    computed: {
      isMobile () {
        return this.$q.platform.is.mobile;
      },

      darkMode: {
        get () {
          return this.$q.dark.isActive;
        },

        set () {
          this.$q.dark.toggle();
        }
      },

      locale: {
        get () {
          return this.locales.find(locale => this.$i18n.locale === locale.value);
        },

        set ({ value }) {
          this.$i18n.locale = value;
        }
      },

      locales () {
        return [
          {
            value: "ru",
            label: this.$t("common.locales.ru.alias")
          },
          {
            value: "en-us",
            label: this.$t("common.locales.en-us.alias")
          }
        ];
      }
    }
  };
</script>

<style scoped>

</style>
