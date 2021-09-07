<template lang="pug">
  div#q-app
    q-no-ssr
      q-ajax-bar(ref="progress" position="top" color="primary" size="3px" skip-hijack)
    q-layout(view="hHh Lpr lFf")
      template(v-if="isMobile")
        q-drawer(
          v-show="isComponentPassed('asideLeft')"
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
                  v-model="darkMode"
                  unchecked-icon="dark_mode"
                  checked-icon="light_mode"
                  color="dark"
                  icon-color="yellow"
                  keep-color
                  size="md"
                  dense
                )

        q-drawer(:value="isComponentPassed('asideRight')" side="right" elevated)
          transition(name="fade" mode="out-in")
            router-view(name="asideRight")
        q-page-container(:value="isComponentPassed('default')")
          transition(name="fade" mode="out-in")
            router-view
        q-footer(:value="meta.toolbar" elevated)
          transition(name="fade" mode="out-in")
            BaseToolbar

      template(v-else)
        q-header(:value="meta.toolbar" elevated)
          transition(name="fade" mode="out-in")
            BaseToolbar(@auth="toAuth()")
        q-drawer(:value="isComponentPassed('asideLeft')" side="left" :width="400" elevated)
          transition(name="fade" mode="out-in")
            router-view(name="asideLeft")
        q-drawer(:value="isComponentPassed('asideRight')" side="right" elevated)
          transition(name="fade" mode="out-in")
            router-view(name="asideRight")
        q-page-container(:value="isComponentPassed('default')")
          transition(name="fade" mode="out-in")
            router-view

      transition(name="fade" mode="out-in")
        AuthModal(v-model="auth")
    
      MailConfirmedModal(v-model="showMailConfirmedModal" @show-auth="showAuthAfterConfirmation")
</template>

<script>
  import moment from "moment";
  import { mapActions, mapGetters } from "vuex";
  import AsideProfile from "./components/aside/AsideProfile";
  import AuthModal from "./components/auth/AuthModal";
  import MailConfirmedModal from "./components/auth/MailConfirmedModal";
  import BaseToolbar from "./components/common/ui/BaseToolbar";
  import LoginForm from "./components/forms/auth/LoginForm";
  import { GET_REFERENCES } from "./store/constants/action-constants";
  import { DEFAULT_COOKIE_OPTIONS } from "./constaints";

  export default {
    name: "App",
    components: { AuthModal, LoginForm, AsideProfile, BaseToolbar, MailConfirmedModal },
    created () {
      moment.locale(this.$i18n.locale);
      if (!this.isAuthenticated) {
        this.checkForMailConfirmed();
      }
      if (!this.showMailConfirmedModal) this.auth = !this.isAuthenticated;
    },
    mounted () {
      this.$q.dark.set(this.$q.cookies.get("darkMode") === true);

      this.$router.onReady(() => {
        this.$router.beforeEach(this.onRouteChangedBegin.bind(this));
        this.$router.afterEach(this.onRouteChangedDone.bind(this));
        this.mounted = true;
      });
    },
    data () {
      return {
        auth: false,
        isStartedLoading: false,
        showMailConfirmedModal: false
      };
    },
    computed: {
      ...mapGetters(["isAuthenticated"]),
      meta () {
        return this.$route.meta;
      },

      components () {
        return this.$route.matched.length ? this.$route.matched[0].components : {};
      },

      isMobile () {
        return !this.$q.platform.is.desktop;
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
      ...mapActions("references", [GET_REFERENCES]),

      isComponentPassed (viewName) {
        return Boolean(this.components[viewName]);
      },

      toAuth () {
        this.auth = true;
      },

      onRouteChangedBegin (from ,to ,next) {
        if (this.isStartedLoading) {
          this.$refs.progress.stop();
        }

        if(from.path !== to.path) {
          this.$refs.progress.start();
          this.isStartedLoading = true;
        }
        next();
      },

      onRouteChangedDone () {
        this.$refs.progress.stop();
        this.isStartedLoading = false;
      },

      checkForMailConfirmed () {
        if (this.$route.query.mailConfirmed === "true") {
          this.showMailConfirmedModal = true;
        }
      },

      showAuthAfterConfirmation () {
        this.showMailConfirmedModal = false;
        this.auth = true;
      }
    }
  };
</script>
