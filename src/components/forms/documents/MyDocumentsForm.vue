<template lang="pug">
  q-form(@submit="onSubmit" ref="form")
    template(v-if="value")
      file-picker.q-mt-sm(
        :value="documents[type]"
        v-for="(type, i) in Object.keys(value)"
        :key="i"
        :max-files="type === 'passport' ? 5 : 1"
        @input="setDocuments(type, $event)"
        @remove="isLocal || onRemove"
        :label="$t(`entity.files.${ type }`)"
        :rules="allRequired ? documentRequired : null"
      )
    template(v-else)
      file-picker.q-mt-sm(
        :max-files="5"
        :value="documents.passport"
        @input="setDocuments('passport', $event)"
        @remove="onRemove"
        :label="$t('entity.files.passport')"
        :rules="allRequired ? documentRequired : null"
        )
      file-picker.q-mt-sm(
        :value="documents.snils"
        @input="setDocuments('snils', $event)"
        @remove="onRemove"
        :label="$t('entity.files.snils')"
        :rules="allRequired ? documentRequired : null"
        )
      file-picker.q-mt-sm(
        :value="documents.inn"
        @input="setDocuments('inn', $event)"
        @remove="onRemove"
        :label="$t('entity.files.inn')"
        :rules="allRequired ? documentRequired : null"
        )
      file-picker.q-mt-sm(
        :value="documents.job"
        @input="setDocuments('job', $event)"
        @remove="onRemove"
        :label="$t('entity.files.job')"
        :rules="allRequired ? documentRequired : null"
        )
    div.text-right.q-mt-md(v-show="isChanged && !isLocal")
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
    SET_STATE_DEFAULT,
    SET_DOCUMENTS
  } from "@/store/constants/mutation-constants";
  import { UPDATE_USER_DOCUMENTS, GET_USER_DOCUMENTS } from "@/store/constants/action-constants";
  import { isDocumentPresent } from "@/util/validators";
  import FilePicker from "components/common/FilePicker";

  export default {
    name: "MyDocumentsForm",
    components: { FilePicker },
    props: {
      isLocal: {
        type: Boolean,
        default: false
      },
      attachedDocuments: {
        type: Boolean,
        default: false
      },
      value: {
        type: Object,
        default: null
      },
      allRequired: {
        type: Boolean,
        default: false
      }
    },
    async created () {
      if (this.attachedDocuments && this.isLocal) {
        await this.GET_USER_DOCUMENTS();
        Object.keys(this.documents).forEach(type => {
          if (this.getDocuments[type]) {
            this.setDocuments(type, this.getDocuments[type]);
          }
        });
      }
    },
    computed: {
      ...mapGetters("user/documents", ["isChanged", "getDocuments"]),
      documentRequired () {
        return [
          isDocumentPresent
        ];
      },
      documents () {
        if (this.value) {
          return this.value;
        } else {
          return this.getDocuments;
        }
      }
    },
    methods: {
      ...mapMutations("user/documents", [
        SET_DOCUMENTS,
        SET_PASSPORT,
        SET_SNILS,
        SET_INN,
        SET_JOB,
        SET_DELETED_ID,
        SET_STATE_DEFAULT
      ]),

      ...mapActions("user/documents", [
        UPDATE_USER_DOCUMENTS,
        GET_USER_DOCUMENTS
      ]),

      setDocuments (type, val) {
        if (this.isLocal) {
          this.value[type] = val;
        } else {
          this.SET_DOCUMENTS({ [type]: val });
        }
      },

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
