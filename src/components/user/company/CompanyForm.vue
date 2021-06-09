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
        AvatarUploadable(:src="null" @input="onUploadLogo")
      .col-12
        .text-caption.text-primary-light.q-mb-sm Описание
        q-input(type="textarea" v-model="model.profile_description" outlined)
    div.text-right.q-gutter-md.q-mt-md
      q-btn(flat :label="this.$t('action.cancel')" @click="onCancel()" :disable="!isChanged")
      q-btn(color="primary" :label="this.$t('action.save')" type="submit" :disable="!isChanged")
</template>

<script>
  import { isEqual } from "lodash";
  import AvatarUploadable from "components/common/AvatarUploadable";
  import { mapGetters, mapActions } from "vuex";
  import { UPDATE_COMPANY_LOGO, UPDATE_COMPANY_PROFILE } from "@/store/constants/action-constants";

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
    components: { AvatarUploadable },
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
      ...mapActions("user/company", [UPDATE_COMPANY_PROFILE, UPDATE_COMPANY_LOGO]),
      assignModel () {
        this.model = Object.assign(defaultModel(), this.getCompanyProfile);
      },
      onCancel () {
        this.assignModel();
      },
      onUploadLogo (image) {
        return this.UPDATE_COMPANY_LOGO(image)
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: this.$t("entity.companyProfile.messages.logoUpdate.success")
            });
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: this.$t("entity.companyProfile.messages.logoUpdate.fail")
            });
          });
      },
      onSubmit () {
        return this.UPDATE_COMPANY_PROFILE(this.model)
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: this.$t("entity.companyProfile.messages.update.success")
            });
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: this.$t("entity.companyProfile.messages.update.fail")
            });
          });
      }
    },
    watch: {
      getCompanyProfile: "assignModel"
    }
  };
</script>

<style lang="stylus" scoped>
  .avatar-uploadable__input
    ::v-deep .q-field
      width: 10rem
    ::v-deep .q-field__control-container
      justify-content: center
    ::v-deep .q-field__native
      display: none
    .avatar-uploadable__image
      object-fit: cover
</style>
