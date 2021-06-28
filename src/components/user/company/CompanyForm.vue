<template lang="pug">
  q-form(@submit="onSubmit()" greedy)
    .row.q-col-gutter-md
      .col-12.col-md-6
        q-input(
          v-model="model.name"
          label="Название"
          :rules="fieldRequired"
        )
        q-input(v-model="model.address" label="Адрес")
        q-input(
          v-model="model.phone"
          mask="# (###) ### - ####"
          unmasked-value
          type="tel"
          label="Телефон"
          :rules="validatePhone"
        )
        q-input(v-model="model.site" label="Сайт")
        q-input(v-model="model.workTime" label="Рабочее время")
      .col-12.col-md-6.text-center
        AvatarUploadable(:src="avatarUrl" @input="onUploadLogo")
      .col-12
        .text-caption.text-primary-light.q-mb-sm Описание
        q-input(type="textarea" v-model="model.description" outlined)
    div.text-right.q-gutter-md.q-mt-md
      q-btn(flat :label="this.$t('action.cancel')" @click="assignModel()" :disable="!isChanged")
      q-btn(color="primary" :label="this.$t('action.save')" type="submit" :disable="!isChanged")
</template>

<script>
  import { isEqual } from "lodash";
  import AvatarUploadable from "components/common/AvatarUploadable";
  import { mapGetters, mapActions } from "vuex";
  import { UPDATE_COMPANY_LOGO, UPDATE_COMPANY_PROFILE } from "@/store/constants/action-constants";

  const defaultModel = () => ({
    address: "",
    description: "",
    logo: "",
    name: "",
    phone: "",
    site: "",
    workTime: ""
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
      validatePhone () {
        return [
          ...this.fieldRequired,
          val => val && val.length === 11
        ];
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
      getCompanyProfile: {
        deep: true,
        handler: "assignModel"
      }
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
