<template lang="pug">
  q-form(ref="form")
    .row.q-col-gutter-md
      q-input(v-model="model.last" @input="onInput()" :rules="isNameValid" :label="$t('user.lastName')" clearable).col-12.col-sm-6.col-md-4
      q-input(v-model="model.first" @input="onInput()" :rules="rules" :label="$t('user.firstName')" clearable).col-12.col-sm-6.col-md-4
      q-input(v-model="model.patronymic" @input="onInput()" :rules="isNameValid" :label="$t('user.patronymic')" clearable).col-12.col-sm-6.col-md-4
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "FormName",
    props: {
      value: {
        type: Object,
        default: () => ({})
      }
    },
    created () {
      const unwatch = this.$watch("value", () => {
        this.model = this.defaultModel();
      }, { immediate: true });
      unwatch();
      this.$emit("input", this.model);
    },
    data () {
      return {
        model: {}
      };
    },
    computed: {
      ...mapGetters(["getAccount"]),

      name () {
        return this.getAccount.name;
      },

      rules () {
        return [
          val => !!val || this.$t("common.error.validation.required"),
          val => !new RegExp(/[<>"'%;()&\d*+]/g).test(val) || this.$t("common.error.validation.invalid")
        ];
      },

      isNameValid () {
        return [
          val => !new RegExp(/[<>"'%;()&\d*+]/g).test(val) || this.$t("common.error.validation.invalid")
        ];
      }
    },
    methods: {
      defaultModel () {
        return {
          last: this.name.last || "",
          first: this.name.first || "",
          patronymic: this.name.patronymic || ""
        };
      },
      onInput () {
        this.$emit("input", this.model);
      }
    }
  };
</script>
