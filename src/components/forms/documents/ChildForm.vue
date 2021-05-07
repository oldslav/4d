<template lang="pug">
  q-form(@submit="onSubmit()")
    .row.q-col-gutter-sm
      .col-12.col-md-4
        q-input(:label="$t('user.lastName')" v-model="neighbor.name.last")
      .col-12.col-md-4
        q-input(:label="$t('user.firstName')" v-model="neighbor.name.first" :rules="nameRules")
      .col-12.col-md-4
        q-input(:label="$t('user.patronymic')" v-model="neighbor.name.patronymic")
    q-expansion-item.q-mt-sm.full-width(:label="$t('entity.documents.title')" header-class="q-px-none text-subtitle")
      file-picker(:label="this.$t('entity.files.birthCertificate')" @remove="onRemove" v-model="neighbor.documents.birth")
      file-picker(:label="this.$t('entity.files.registrationCopy')" @remove="onRemove" v-model="neighbor.documents.children_registration")
      file-picker(:label="this.$t('entity.files.passportCopy')" @remove="onRemove" :max-files="5" v-model="neighbor.documents.passport")
      file-picker(:label="this.$t('entity.files.personalAgreement')" @remove="onRemove" v-model="neighbor.documents.consent_processing_personal_data")
    div.text-right.q-mt-md(v-show="isChanged")
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
