<template lang="pug">
  q-toolbar
    q-toolbar-title
      Title
    div.col-1
      q-select(v-model="locale" color="primary" :options="locales" option-label="label" option-value="value" filled flat)

    q-toggle(
      v-model="darkMode" unchecked-icon="dark_mode" checked-icon="light_mode"
      color="dark" size="lg" icon-color="yellow" keep-color)
</template>

<script>
  export default {
    name: "Toolbar",
    computed: {
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
            label: this.$t("common.locales.ru")
          },
          {
            value: "en-us",
            label: this.$t("common.locales.en-us")
          }
        ];
      }
    }
  };
</script>

<style scoped>

</style>
