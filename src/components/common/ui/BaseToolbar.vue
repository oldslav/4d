<template lang="pug">
  q-toolbar
    template(v-if="isMobile")
      BaseTabs(v-model="tab" isFullWidth :dense="false")
        q-route-tab(:to="{ name: 'about' }" name="main" :label="$t('entity.about.title')").col
        q-route-tab(:to="{ name: 'playground' }" name="playground" :label="$t('entity.maps')").col
        q-route-tab(:to="{ name: 'data' }" name="data" :label="$t('entity.data')").col
        q-route-tab(:to="{ name: 'user-profile' }" name="profile"  :label="$t('entity.design')").col
        q-route-tab(:to="{ name: 'services' }" name="services" :label="$t('entity.services.title')").col

    template(v-else)
      BaseTabs(v-model="tab" :dense="false")
        q-route-tab(:to="{ name: 'about' }" name="main" :label="$t('entity.about.title')")
        q-route-tab(:to="{ name: 'playground' }" name="playground" :label="$t('entity.maps')")
        q-route-tab(:to="{ name: 'data' }" name="data" :label="$t('entity.data')")
        q-route-tab(:to="{ name: 'user-profile' }" name="profile"  :label="$t('entity.design')")
        q-route-tab(:to="{ name: 'services' }" name="services" :label="$t('entity.services.title')")
      q-space
      q-btn(round dense icon="o_account_circle" text-color="primary")
        q-menu
          q-list(dense)
            q-item(:to="{ name: 'user-profile' }" exact)
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

        set (value) {
          this.$q.localStorage.set("darkMode", value);
          this.$q.dark.set(value);
        }
      },

      locale: {
        get () {
          return this.locales.find(locale => this.$i18n.locale === locale.value);
        },

        set (value) {
          this.$q.localStorage.set("locale", value);
          this.$i18n.locale = value.value;
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
