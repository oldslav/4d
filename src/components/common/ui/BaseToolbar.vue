<template lang="pug">
  q-toolbar
    template(v-if="isMobile")
      BaseTabs(v-model="tab" isFullWidth :dense="false")
        q-route-tab(
          v-for="(route, index) in tabs"
          :key="index"
          :to="{ name: route.name }"
          :name="route.name"
          :icon="route.icon"
          v-if="!route.hide"
        ).col
    template(v-else)
      BaseTabs(v-model="tab" :dense="false")
        q-route-tab(
          v-for="(route, index) in tabs"
          :key="index"
          :to="{ name: route.name }"
          :name="route.name"
          :label="route.label"
          v-if="!route.hide"
        )
      q-space
      q-btn(round dense icon="o_account_circle" text-color="primary")
        q-menu
          q-list
            q-item(:to="{ name: 'user' }" v-if="isAuthenticated")
              q-item-section(avatar)
                q-icon(name="o_account_circle")
              q-item-section
                | {{ $t("entity.profile") }}

            q-separator()

            q-item(tag="label" v-ripple)
              q-item-section
                q-select(v-model="locale" color="primary" :options="locales" option-label="label" option-value="value" filled flat dense)
            q-item(tag="label" v-ripple)
              q-item-section(avatar)
                q-toggle(
                  v-model="darkMode" unchecked-icon="dark_mode" checked-icon="light_mode"
                  color="dark" icon-color="yellow" keep-color :label="$t('common.theme')" )
            q-item(clickable @click="onLogout()" v-if="isAuthenticated")
              q-item-section(avatar)
                q-icon(name="logout")
              q-item-section
                | Выход
            q-item(clickable @click="onAuth()" v-else)
              q-item-section(avatar)
                q-icon(name="login")
              q-item-section
                | Войти
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import BaseTabs from "components/common/BaseTabs";
  import { ACCOUNT_LOGOUT } from "@/store/constants/action-constants";
  import { DEFAULT_COOKIE_OPTIONS } from "../../../constaints";

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
      ...mapGetters(["getAccount", "isUserAdmin", "isAuthenticated", "isDev"]),

      isMobile () {
        return this.$q.platform.is.mobile;
      },

      tabs () {
        return [
          {
            name: "about",
            label: this.$t("entity.about.title"),
            icon: "help_outline"
          },
          {
            name: "map",
            label: this.$t("entity.maps.title"),
            icon: "map"
          },
          {
            name: "data",
            label: this.$t("entity.data"),
            icon: "bar_chart"
          },
          {
            name: "design",
            label: this.$t("entity.design"),
            icon: "list_alt"
          },
          {
            name: "services",
            label: this.$t("entity.services.title"),
            hide: !this.isAuthenticated || this.isUserAdmin,
            icon: "ballot"
          },
          {
            name: "users",
            label: this.$t("entity.users.title"),
            hide: !this.isUserAdmin,
            icon: "o_account_circle"
          },
          {
            name: "user-profile",
            label: this.$t("entity.profile"),
            hide: !this.isAuthenticated || !this.isMobile,
            icon: "o_account_circle"
          }
        ];
      },

      darkMode: {
        get () {
          return this.$q.dark.isActive;
        },

        set (value) {
          this.$q.cookies.set("darkMode", value, DEFAULT_COOKIE_OPTIONS);
          this.$q.dark.set(value);
        }
      },

      locale: {
        get () {
          return this.locales.find(locale => this.$i18n.locale === locale.value);
        },

        set (value) {
          this.$q.cookies.set("locale", value.value, DEFAULT_COOKIE_OPTIONS);
          this.$i18n.locale = value.value;
        }
      },

      locales () {
        return [
          {
            value: "RU",
            label: this.$t("common.locales.RU.alias")
          },
          {
            value: "EN",
            label: this.$t("common.locales.EN.alias")
          }
        ];
      }
    },
    methods: {
      ...mapActions([ACCOUNT_LOGOUT]),
      onLogout () {
        this.ACCOUNT_LOGOUT();

        if (this.$route.name !== "main") {
          this.$router.push({ name: "main" });
        }
      },
      onAuth () {
        this.$emit("auth");
      }
    }
  };
</script>

<style scoped>

</style>
