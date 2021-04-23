<template lang="pug">
  q-page.documents.q-pa-lg.column.q-gutter-y-lg
    q-card
      q-card-section.q-pa-lg
        .text-medium.text-weight-bold
          | Паспортные данные
        file-picker.q-mt-sm(label="Скан-копия паспорта" :max-files="2" v-model="passport")
    q-card
      q-card-section.q-pa-lg
        .text-medium.text-weight-bold
          | Страховой номер индивидуального лицевого счёта (СНИЛС)
        file-picker.q-mt-sm(label="Скан-копия СНИЛС" v-model="snils")
    q-card
      q-card-section.q-pa-lg
        .text-medium.text-weight-bold
          | Идентификационный номер налогоплательщика (ИНН)
        file-picker.q-mt-sm(label="Скан-копия ИНН" v-model="inn")
    q-card
      q-card-section.q-pa-lg
        .text-medium.text-weight-bold
          | Данные о месте работы
        file-picker.q-mt-sm(label="Справка с места работы" v-model="job")
</template>

<script>
  import FilePicker from "components/common/FilePicker";

  export default {
    name: "Documents",
    components: { FilePicker },
    data () {
      return {
        passport: null,
        snils: null,
        inn: null,
        job: null
      };
    },
    computed: {
      buttonVisible () {
        return true;
      }
    }
  };
</script>
