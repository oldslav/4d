<template lang="pug">
  q-form(@submit="onSubmit()" greedy).q-col-gutter-sm
    q-input(v-model="model.name" :rules="required" :label="$t('user.companyName')")
    q-input(v-model="model.fullName" :rules="required" :label="$t('entity.companyDocuments.fullCompanyName')")
    q-input(v-model="model.legalAddress" :rules="required" :label="$t('entity.companyDocuments.legalAddress')")
    q-input(v-model="model.realAddress" :rules="required" :label="$t('entity.companyDocuments.realAddress')")
    q-input(v-model="model.okpo" :rules="okpo" :label="$t('entity.companyDocuments.okpo')")
    FilePicker(v-model="model.documents.inn_jur" @remove="onRemoveFile" :rules="requiredDocument" :label="this.$t('entity.files.inn')")
    FilePicker(v-model="model.documents.ogrn" @remove="onRemoveFile" :rules="requiredDocument" :label="this.$t('entity.files.ogrn')")
    FilePicker(v-model="model.documents.egrjul" @remove="onRemoveFile" :rules="requiredDocument" :label="this.$t('entity.files.egrjul')")
    FilePicker(v-model="model.documents.partner_card" @remove="onRemoveFile" :rules="requiredDocument" :label="this.$t('entity.files.partner_card')")
    q-input(v-model="model.okved" :rules="required" :label="$t('entity.companyDocuments.okved')")
    .row.q-col-gutter-sm
      .col-12.col-md-4
        q-input(v-model="model.email" :label="$t('entity.contacts.email')")
      .col-12.col-md-8
        q-input(v-model="model.site" :label="$t('entity.companyProfile.site')")
    FormPhones(v-model="model.phones")
    div.text-right.q-gutter-md.q-mt-md(v-show="isChanged")
      q-btn(flat :label="this.$t('action.cancel')" @click="assignModel()")
      q-btn(color="primary" :label="this.$t('action.save')" type="submit")
</template>

<script>
  import { isEqual, cloneDeep } from "lodash";
  import { mapActions, mapGetters } from "vuex";
  import FilePicker from "components/common/FilePicker";
  import FormPhones from "components/common/form/FormPhones";
  import { UPDATE_COMPANY_CARD } from "@/store/constants/action-constants";

  const defaultModel = () => ({
    name: null,
    fullName: null,
    legalAddress: null,
    realAddress: null,
    documents: {
      partner_card: [],
      inn_jur: [],
      ogrn: [],
      egrjul: []
    },
    email: null,
    site: null,
    phones: [null],
    okpo: null,
    okved: null
  });

  export default {
    name: "CompanyCardForm",
    components: { FilePicker, FormPhones },
    created () {
      this.assignModel();
    },
    data () {
      return {
        deletedIds: [],
        model: defaultModel()
      };
    },
    computed: {
      ...mapGetters("user/company", ["getCompanyCard"]),
      isChanged () {
        return !isEqual(this.model, this.getCompanyCard);
      },
      requiredDocument () {
        return [
          val => val.length || this.$t("common.error.validation.required")
        ];
      },
      required () {
        return [
          val => !!val || this.$t("common.error.validation.required")
        ];
      },
      okpo () {
        return [
          ...this.required,
          val => String(val).length === 8 || this.$t("common.error.validation.length", { length: 8 })
        ];
      }
    },
    methods: {
      ...mapActions("user/company", [UPDATE_COMPANY_CARD]),
      assignModel () {
        this.deletedIds = [];
        this.model = Object.assign(defaultModel(), cloneDeep(this.getCompanyCard));
      },
      onRemoveFile (id) {
        this.deletedIds.push(id);
      },
      onSubmit () {
        const { model, deletedIds } = this;
        return this.UPDATE_COMPANY_CARD({ card: model, deletedIds })
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: this.$t("entity.companyDocuments.messages.cardUpdate.success")
            });
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: this.$t("entity.companyDocuments.messages.cardUpdate.fail")
            });
          });
      }
    },
    watch: {
      getCompanyCard: {
        deep: true,
        handler: "assignModel"
      }
    }
  };
</script>
