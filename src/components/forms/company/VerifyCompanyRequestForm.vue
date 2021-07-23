<template lang="pug">
  q-form(ref="form" @submit="onSubmitForm")
    div.text-medium.q-mb-sm {{ $t('user.verifyCompany.form.commonInfo') }}

    q-input.q-mb-md(
      v-model="model.fullName"
      :rules="[requiredString]"
      :label="$t('entity.companyDocuments.fullCompanyName')"
      lazy-rules
    )
    q-input.q-mb-md(
      v-model="model.legalAddress"
      :rules="[requiredString]"
      :label="$t('entity.companyDocuments.legalAddress')"
      lazy-rules
    )
    q-input.q-mb-md(
      v-model="model.realAddress"
      :rules="[requiredString]"
      :label="$t('entity.companyDocuments.realAddress')"
      lazy-rules
    )
    q-input.q-mb-md(
      v-model="model.okved"
      :rules="[requiredString]"
      :label="$t('entity.companyDocuments.okved')"
      lazy-rules
    )
</template>
<script>
  import { mapGetters } from "vuex";

  export default {
    props: {
      value: { type: Object, default: () => ({}) }
    },

    created () {
      this.reloadValue();
    },

    data () {
      return {
        model: {
          "fullName": "",
          "legalAddress": "",
          "realAddress": "",
          "okved": ""
        }
      };
    },

    computed:{
      ...mapGetters("user/company",["getCompanyCard"])
    },

    methods: {
      requiredString (val) {
        return val && val.length > 0 || this.$t("common.error.validation.required");
      },

      validate () {
        return this.$refs.form.validate();
      },

      reloadValue () {
        const card = this.getCompanyCard || {};
        this.model.fullName = card.fullName || "";
        this.model.legalAddress = card.legalAddress || "";
        this.model.realAddress = card.realAddress || "";
        this.model.okved = card.okved || "";
      },

      onSubmitForm () {
        this.$emit("submit");
      }
    },

    watch: {
      model: {
        deep: true,
        handler (val) {
          this.$emit("input", { ...val });
        }
      }
    }
  };
</script>
