<template lang="pug">
  q-form(@submit="onSubmit()")
    .row.q-col-gutter-sm
      .col-12.col-md-4
        q-input(:label="$t('user.lastName')" v-model.trim="neighbor.name.last" maxlength="20" :rules="nameMask")
      .col-12.col-md-4
        q-input(:label="$t('user.firstName')" v-model.trim="neighbor.name.first" :rules="nameRules" maxlength="20")
      .col-12.col-md-4
        q-input(:label="$t('user.patronymic')" v-model.trim="neighbor.name.patronymic" maxlength="20" :rules="nameMask")
    .text-subtitle.q-my-sm {{ $t("entity.documents.title") }}
      file-picker(:max-files="5" :label="this.$t(`entity.files.passportCopy`)" @remove="onRemove" v-model="neighbor.documents.passport")
      file-picker(:label="this.$t(`entity.files.snilsCopy`)" @remove="onRemove" v-model="neighbor.documents.snils")
      file-picker(:label="this.$t(`entity.files.innCopy`)" @remove="onRemove" v-model="neighbor.documents.inn")
      file-picker(:label="this.$t(`entity.files.marriageCertificate`)" @remove="onRemove" v-model="neighbor.documents.marriage")
      file-picker(:label="this.$t(`entity.files.personalAgreement`)" @remove="onRemove" v-model="neighbor.documents.consent_processing_personal_data")
    div.text-right.q-mt-md(v-show="isChanged")
      q-btn.q-mr-md(flat @click="onCancel()" :label="this.$t('action.cancel')")
      q-btn(color="primary" :label="this.$t('action.save')" type="submit")
</template>

<script>
  import FilePicker from "components/common/FilePicker";
  import NeighborMixin from "components/user/documents/NeighborMixin";

  export default {
    name: "SpouseForm",
    mixins: [NeighborMixin],
    components: { FilePicker }
  };
</script>
