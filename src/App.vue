<template lang="pug">
  div#q-app
    q-layout(view="hHh Lpr lFf")
      template(v-if="isMobile")
        q-drawer(
          v-show="meta.asideLeft"
          :width="300"
          :breakpoint="500"
          overlay
          elevated
        )
          transition(name="fade" mode="out-in")
            router-view(name="asideLeft")
              AsideProfile
          q-list
            q-item(dense)
              q-item-section
                q-select(
                  v-model="locale" color="primary" :options="locales"
                  option-label="label" option-value="value" filled dense
                )
              q-item-section(side)
                q-toggle(
                  v-model="darkMode" unchecked-icon="dark_mode" checked-icon="light_mode"
                  color="dark" icon-color="yellow" keep-color size="md" dense
                )

        q-drawer(:value="meta.asideRight" side="right" elevated)
          transition(name="fade" mode="out-in")
            router-view(name="asideRight")
        q-page-container(:value="meta.content")
          transition(name="fade" mode="out-in")
            router-view
        q-footer(:value="meta.toolbar" elevated)
          transition(name="fade" mode="out-in")
            BaseToolbar

      template(v-else)
        q-header(:value="meta.toolbar" elevated)
          transition(name="fade" mode="out-in")
            BaseToolbar
        q-drawer(:value="meta.asideLeft" side="left" elevated)
          transition(name="fade" mode="out-in")
            router-view(name="asideLeft")
        q-drawer(:value="meta.asideRight" side="right" elevated)
          transition(name="fade" mode="out-in")
            router-view(name="asideRight")
        q-page-container(:value="meta.content")
          transition(name="fade" mode="out-in")
            router-view

      transition(name="fade" mode="out-in")
        AuthModal(v-model="auth")
</template>

<script>
  import moment from "moment";
  import { mapActions } from "vuex";
  import AsideProfile from "./components/aside/AsideProfile";
  import AuthModal from "./components/auth/AuthModal";
  import BaseToolbar from "./components/common/ui/BaseToolbar";
  import LoginForm from "./components/forms/auth/LoginForm";
  import { GET_ACCOUNT, GET_REFERENCES } from "./store/constants/action-constants";

  export default {
    name: "App",
    components: { AuthModal, LoginForm, AsideProfile, BaseToolbar },
    async created () {
      await moment.locale(this.$i18n.locale);

      const darkMode = this.$q.localStorage.getItem("darkMode");
      const locale = this.$q.localStorage.getItem("locale");

      if (darkMode) {
        this.darkMode = darkMode;
      }

      if (locale) {
        this.locale = locale;
      }

      try {
        await this.GET_ACCOUNT();
        await this.GET_REFERENCES();
      } catch (e) {
        if (e.response) {
          this.auth = true;
        }
      }
    },
    data () {
      return {
        auth: false
      };
    },
    computed: {
      meta () {
        return this.$route.meta;
      },

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
    },
    methods: {
      ...mapActions([
        GET_ACCOUNT
      ]),
      ...mapActions("references", [GET_REFERENCES])
    }
  };
</script>
