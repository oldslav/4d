<template lang="pug">
  q-form(@submit="onSubmit()")
    .row.q-col-gutter-sm
      .col-12.col-md-4
        q-input(:label="$t('user.lastName')" :readonly="readonly" v-model.trim="neighbor.name.last" maxlength="20" :rules="nameMask")
      .col-12.col-md-4
        q-input(:label="$t('user.firstName')" :readonly="readonly" v-model.trim="neighbor.name.first" :rules="nameRules" maxlength="20")
      .col-12.col-md-4
        q-input(:label="$t('user.patronymic')" :readonly="readonly" v-model.trim="neighbor.name.patronymic" maxlength="20" :rules="nameMask")
    .text-subtitle.q-my-sm {{ $t("entity.documents.title") }}
      file-picker(:label="this.$t('entity.files.birthCertificate')" @remove="onRemove" v-model="neighbor.documents.birth" :readonly="readonly")
      file-picker(:label="this.$t('entity.files.registrationCopy')" @remove="onRemove" v-model="neighbor.documents.children_registration" :readonly="readonly")
      file-picker(:label="this.$t('entity.files.passport')" @remove="onRemove" :max-files="5" v-model="neighbor.documents.passport" :readonly="readonly")
      file-picker(:label="this.$t('entity.files.personalAgreement')" @remove="onRemove" v-model="neighbor.documents.consent_processing_personal_data" :readonly="readonly")
    div.text-right.q-mt-md(v-show="isChanged && !readonly")
      q-btn.q-mr-md(flat @click="onCancel()" :label="this.$t('action.cancel')")
      q-btn(color="primary" :label="this.$t('action.save')" type="submit")
</template>

<script>
  import FilePicker from "components/common/FilePicker";
  import NeighborMixin from "components/user/documents/NeighborMixin";

  export default {
    name: "ChildForm",
    mixins: [NeighborMixin],
    components: { FilePicker }
  };
</script>
