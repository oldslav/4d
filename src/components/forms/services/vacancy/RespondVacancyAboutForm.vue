<template lang="pug">
  q-form(ref="form")
    div
      form-name(v-model="model.name")

    div.q-mt-md
      div.text-h6 {{ $t('entity.services.vacancies.respondForm.resume') }}
      div.text-body1 {{ $t('entity.services.vacancies.respondForm.resumeHint') }}

      div.text-negative(v-if="visibleResumeError")
        | {{ $t('entity.services.vacancies.respondForm.resumeError') }}

      div.q-mt-md
        file-picker(
          v-model="resumeFilesModel"
          @input="onChangeResumeFiles"
          accept=".pdf, .doc, .docx"
          :max-files="5"
          :label="$t('entity.services.vacancies.respondForm.resumeFile')"
          :description="$t('entity.services.vacancies.respondForm.resumeFileFormat')"
        )

      div.q-mt-md
        q-input(
          v-model="model.resumeLink"
          :label="$t('entity.services.vacancies.respondForm.resumeLink')"
          :rules="[validateURL]"
          ref="resumeLink"
        )

      div.q-mt-md
        div.text-body1 {{ $t('entity.services.vacancies.respondForm.textHint') }}
        q-input(
          v-model="model.text"
          :rules="[requiredString]"
          :label="$t('entity.services.vacancies.respondForm.textPlaceholder')"
          maxlength="1000"
          type="textarea"
          lazy-rules
          outlined
        )
</template>
<script>
  import { mapGetters } from "vuex";
  import { isEqual } from "lodash";
  import FilePicker from "../../../common/FilePicker";
  import FormName from "../../../common/form/FormName";

  const defaults = () => ({
    name: {},
    resumeFiles: [],
    resumeLink: "",
    text: ""
  });

  export default {
    components: { FormName, FilePicker },

    props: {
      value: {
        type: Object,
        default: () => ({})
      },
      isValid:{
        type: Boolean
      }
    },

    data () {
      return {
        model: {},
        isValidate: false,
        visibleResumeError: false,
        resumeFilesModel: []
      };
    },

    computed: {
      ...mapGetters(["getAccount"]),
      requiredString (){
        return val => val && val.length > 0 || this.$t("common.error.validation.required");
      }
    },

    methods: {
      validate () {
        this.isValidate = true;

        return this.validateAll();
      },

      async validateAll (){
        const isValidForm = await this.$refs.form.validate();
        const isValidResume = this.validateResume();

        this.visibleResumeError = !isValidResume;
        return isValidForm && isValidResume;
      },

      validateResume (){
        return this.model.resumeLink !== "" || this.model.resumeFiles.length;
      },

      validateURL (value){
        try {
          // eslint-disable-next-line no-new
          new URL(value);
        } catch (e) {
          if (value === "") {
            return;
          }
          return this.$t("entity.services.vacancies.respondForm.resumeLinkInvalid");
        }
      },

      onChangeResumeFiles (){
        this.model.resumeFiles = this.resumeFilesModel;

        if (this.model.resumeFiles.length) {
          this.$refs.resumeLink.resetValidation();
        }
      }
    },

    watch: {
      value: {
        immediate: true,
        handler (val) {
          this.model = { ...defaults(), ...val };
        }
      },
      model: {
        deep: true,
        handler (val) {
          if (!isEqual(val, this.value)) {
            this.$emit("input", { ...val });
          }
        }
      }
    }
  };
</script>
