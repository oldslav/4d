<template lang="pug">
  q-form(@submit="onSubmit" ref="form")
    file-picker.q-mt-sm(:max-files="5" v-model="passport" @remove="onRemove" :label="$t('entity.files.passportCopy')")
    file-picker.q-mt-sm(v-model="snils" @remove="onRemove" :label="$t('entity.files.snilsCopy')")
    file-picker.q-mt-sm(v-model="inn" @remove="onRemove" :label="$t('entity.files.innCopy')")
    file-picker.q-mt-sm(v-model="job" @remove="onRemove" :label="$t('entity.files.workCertificate')")
    div.text-right.q-mt-md(v-show="isChanged")
      q-btn.q-mr-md(flat @click="onCancel()" :label="this.$t('action.cancel')")
      q-btn(color="primary" :label="this.$t('action.save')" type="submit")
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from "vuex";
  import {
    SET_PASSPORT,
    SET_INN,
    SET_SNILS,
    SET_JOB,
    SET_DELETED_ID,
    SET_STATE_DEFAULT
  } from "@/store/constants/mutation-constants";
  import FilePicker from "components/common/FilePicker";
  import { UPDATE_USER_DOCUMENTS } from "@/store/constants/action-constants";

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
          this.SET_PASSPORT(val);
        }
      },
      snils: {
        get () {
          return this.getDocuments.snils;
        },
        set (val) {
          this.SET_SNILS(val);
        }
      },
      inn: {
        get () {
          return this.getDocuments.inn;
        },
        set (val) {
          this.SET_INN(val);
        }
      },
      job: {
        get () {
          return this.getDocuments.job;
        },
        set (val) {
          this.SET_JOB(val);
        }
      }
    },
    methods: {
      ...mapMutations("user/documents", [
        SET_PASSPORT,
        SET_SNILS,
        SET_INN,
        SET_JOB,
        SET_DELETED_ID,
        SET_STATE_DEFAULT
      ]),
      ...mapActions("user/documents", [UPDATE_USER_DOCUMENTS]),
      onInput (val) {
        this.$emit("input", val);
      },
      onRemove (id) {
        this.SET_DELETED_ID(id);
      },
      onSubmit () {
        this.UPDATE_USER_DOCUMENTS();
      },
      onCancel () {
        this.defaultState();
      }
    }
  };
</script>
