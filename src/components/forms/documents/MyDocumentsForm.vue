<template lang="pug">
  q-form.text-right(@submit="onSubmit" ref="form")
    file-picker.q-mt-sm(:max-files="5" v-model="passport" :label="$t('user.profile.documents.passportCopy')")
    file-picker.q-mt-sm(v-model="snils" :label="$t('user.profile.documents.snilsCopy')")
    file-picker.q-mt-sm(v-model="inn" :label="$t('user.profile.documents.innCopy')")
    file-picker.q-mt-sm(v-model="job" :label="$t('user.profile.documents.workCertificate')")
    q-btn.q-mt-md(color="primary" label="Сохранить" v-show="isChanged" type="submit")
</template>

<script>
  import { mapGetters, mapMutations } from "vuex";
  import { SET_PASSPORT, SET_INN, SET_SNILS, SET_WORK_CERTIFICATE } from "@/store/constants/mutation-constants";
  import FilePicker from "components/common/FilePicker";

  export default {
    name: "MyDocumentsForm",
    components: { FilePicker },
    props: {
      value: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      ...mapGetters("user/documents", ["isChanged", "getDocuments"]),
      passport: {
        get () {
          return this.getDocuments.passport;
        },
        set (val) {
          this.setPassport(val);
        }
      },
      snils: {
        get () {
          return this.getDocuments.snils;
        },
        set (val) {
          this.setSnils(val);
        }
      },
      inn: {
        get () {
          return this.getDocuments.inn;
        },
        set (val) {
          this.setInn(val);
        }
      },
      job: {
        get () {
          return this.getDocuments.job;
        },
        set (val) {
          this.setWorkCertificate(val);
        }
      }
    },
    methods: {
      ...mapMutations("user/documents", {
        setPassport: SET_PASSPORT,
        setSnils: SET_SNILS,
        setInn: SET_INN,
        setWorkCertificate: SET_WORK_CERTIFICATE
      }),
      onInput (val) {
        this.$emit("input", val);
      },
      onSubmit () {
        // this.$emit("save");
        // call action?
      }
    }
  };
</script>
