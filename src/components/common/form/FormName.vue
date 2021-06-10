<template lang="pug">
  .row.q-col-gutter-md
    q-input(v-model.trim="model.last" :rules="rules" :label="$t('user.lastName')").col-12.col-sm-6.col-md-4
    q-input(v-model.trim="model.first" :rules="rules" :label="$t('user.firstName')").col-12.col-sm-6.col-md-4
    q-input(v-model.trim="model.patronymic" :label="$t('user.patronymic')").col-12.col-sm-6.col-md-4
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
    mounted () {
      this.model = this.defaultModel();
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
          val => !!val || this.$t("common.error.validation.required")
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
      }
    },
    watch: {
      model: {
        deep: true,
        immediate: true,
        handler (val) {
          this.$emit("input", val);
        }
      }
    }
  };
</script>
