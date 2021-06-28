<template lang="pug">
  q-form(@submit="onSubmit()" greedy)
    .row.q-col-gutter-sm
      .col-12
        q-input(:label="$t('entity.companyDocuments.bank')" :rules="requiredRule" v-model="model.name")
      .col-12.col-md-4
        q-input(:label="$t('entity.companyDocuments.account')" :rules="account" type="number" v-model="model.account")
      .col-12.col-md-8
        q-input(:label="$t('entity.companyDocuments.corAccount')" :rules="account" v-model="model.corAccount")
      .col-12.col-md-4
        q-input(:label="$t('entity.companyDocuments.inn')" :rules="inn" type="number" v-model="model.inn")
      .col-12.col-md-4
        q-input(:label="$t('entity.companyDocuments.kpp')" :rules="bik" type="number" v-model="model.kpp")
      .col-12.col-md-4
        q-input(:label="$t('entity.companyDocuments.bik')" :rules="bik" type="number" v-model="model.bik")
      .col-12
        q-input(:label="$t('entity.companyDocuments.realAddress')" :rules="requiredRule" v-model="model.realAddress")
    div.text-right.q-gutter-md.q-mt-md(v-show="isChanged")
      q-btn(flat :label="this.$t('action.cancel')" @click="assignModel()")
      q-btn(color="primary" :label="this.$t('action.save')" type="submit")
</template>

<script>
  import { isEqual } from "lodash";
  import { mapActions, mapGetters } from "vuex";
  import { UPDATE_COMPANY_BANK } from "@/store/constants/action-constants";

  const defaultModel = () => ({
    account: "",
    bik: "",
    corAccount: "",
    inn: "",
    kpp: "",
    name: "",
    realAddress: ""
  });

  export default {
    name: "BankDetailsForm",
    created () {
      this.assignModel();
    },
    data () {
      return {
        model: defaultModel()
      };
    },
    computed: {
      ...mapGetters("user/company", ["getCompanyBankDetails"]),
      isChanged () {
        return !isEqual(this.getCompanyBankDetails, this.model);
      },
      requiredRule () {
        return [
          val => !!val || this.$t("common.error.validation.required")
        ];
      },
      account () {
        return [
          ...this.requiredRule,
          val => String(val).length === 20 || this.$t("common.error.validation.length", { length: 20 })
        ];
      },
      bik () {
        return [
          ...this.requiredRule,
          val => String(val).length === 9 || this.$t("common.error.validation.length", { length: 9 })
        ];
      },
      inn () {
        return [
          ...this.requiredRule,
          val => String(val).length === 10 || this.$t("common.error.validation.length", { length: 10 })
        ];
      }
    },
    methods: {
      ...mapActions("user/company", [UPDATE_COMPANY_BANK]),
      assignModel () {
        this.model = Object.assign(defaultModel(), this.getCompanyBankDetails);
      },
      onSubmit () {
        return this.UPDATE_COMPANY_BANK(this.model)
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: this.$t("entity.companyDocuments.messages.bankUpdate.success")
            });
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: this.$t("entity.companyDocuments.messages.bankUpdate.fail")
            });
          });
      }
    },
    watch: {
      getCompanyBankDetails: {
        deep: true,
        handler: "assignModel"
      }
    }
  };
</script>
