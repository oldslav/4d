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
</template>

<script>
  import AsideProfile from "./components/aside/AsideProfile";
  import BaseToolbar from "./components/common/ui/BaseToolbar";

  export default {
    name: "App",
    components: { AsideProfile, BaseToolbar },
    created () {
      this.$q.dark.set(false);
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
