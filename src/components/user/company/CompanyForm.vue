<template lang="pug">
  q-form(@submit="onSubmit()" greedy)
    .row.q-col-gutter-md
      .col-12.col-md-6
        q-input(v-model="model.profile_name" label="Название" :rules="fieldRequired")
        q-input(v-model="model.profile_address" label="Адрес")
        q-input(v-model="model.profile_phone" label="Телефон" :rules="fieldRequired")
        q-input(v-model="model.profile_site" label="Сайт")
        q-input(v-model="model.profile_work_time" label="Рабочее время")
      .col-12.col-md-6.text-center
        q-avatar(size="185px" icon="o_person" color="teal")
      .col-12
        .text-caption.text-primary-light.q-mb-sm Описание
        q-input(type="textarea" v-model="model.profile_description" outlined)
    div.text-right.q-gutter-md.q-mt-md(v-if="isChanged")
      q-btn(flat :label="this.$t('action.cancel')" @click="onCancel()")
      q-btn(color="primary" :label="this.$t('action.save')" type="submit")
</template>

<script>
  import { isEqual } from "lodash";
  import { mapGetters, mapActions } from "vuex";
  import { UPDATE_COMPANY_PROFILE } from "@/store/constants/action-constants";

  const defaultModel = () => ({
    profile_address: "",
    profile_description: "",
    profile_logo: "",
    profile_name: "",
    profile_phone: "",
    profile_site: "",
    profile_work_time: ""
  });

  export default {
    name: "CompanyForm",
    created () {
      this.assignModel();
    },
    data () {
      return {
        model: defaultModel()
      };
    },
    computed: {
      ...mapGetters("user/company", ["getCompanyProfile"]),
      fieldRequired () {
        return [val => !!val || this.$t("common.error.validation.required")];
      },
      avatarUrl () {
        return require("@/assets/svg/avatar-placeholder.svg");
      },
      isChanged () {
        return !isEqual(this.getCompanyProfile, this.model);
      }
    },
    methods: {
      ...mapActions("user/company", [UPDATE_COMPANY_PROFILE]),
      assignModel () {
        this.model = Object.assign(defaultModel(), this.getCompanyProfile);
      },
      onCancel () {
        this.assignModel();
      },
      onSubmit () {
        return this.UPDATE_COMPANY_PROFILE(this.model)
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: "Company profile updated"
            });
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: "Update error"
            });
          });
      }
    },
    watch: {
      getCompanyProfile: "assignModel"
    }
  };
</script>
