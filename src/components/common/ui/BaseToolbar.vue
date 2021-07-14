<template lang="pug">
  q-toolbar
    template(v-if="isMobile")
      BaseTabs(v-model="tab" isFullWidth :dense="false")
        q-route-tab(
          v-for="(route, index) in tabs"
          :key="index"
          :to="{name: route.name}"
          :name="route.name"
          :label="route.label"
        ).col

    template(v-else)
      BaseTabs(v-model="tab" :dense="false")
        q-route-tab(
          v-for="(route, index) in tabs"
          :key="index"
          :to="{name: route.name}"
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
      ...mapGetters(["getAccount", "isUserAdmin", "isAuthenticated"]),

      isMobile () {
        return this.$q.platform.is.mobile;
      },

      tabs () {
        return [
          {
            name: "about",
            label: this.$t("entity.about.title")
          },
          {
            name: "map",
            label: this.$t("entity.maps")
          },
          {
            name: "data",
            label: this.$t("entity.data")
          },
          {
            name: "design",
            label: this.$t("entity.design")
          },
          {
            name: "services",
            label: this.$t("entity.services.title"),
            hide: !this.isAuthenticated || this.isUserAdmin
          },
          {
            name: "users",
            label: this.$t("entity.users.title"),
            hide: !this.isUserAdmin
          }
        ];
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
    },
    methods: {
      ...mapActions([ACCOUNT_LOGOUT]),
      onLogout () {
        this.ACCOUNT_LOGOUT();
        this.$router.push({ name: "main" });
      },
      onAuth () {
        this.$emit("auth");
      }
    }
  };
</script>

<style scoped>

</style>
