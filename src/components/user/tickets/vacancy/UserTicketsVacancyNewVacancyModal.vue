<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    persistent
    @input="toggleModal"
  )
    q-card.full-width.new-vacancy-card
      q-card-section.row.items-center.q-pb-none
        .text-medium
          | Заявка на аренду парковки
        q-space
        q-btn(icon="close" flat round dense v-close-popup)
      q-card-section
        VacancyForm(@done="onCreateVacancy")
      q-inner-loading(v-if="isVisibleLoading" showing color="primary" )
</template>

<script>
  import BaseModal from "../../../common/BaseModal";
  import VacancyForm from "../../../forms/tickets/VacancyForm";
  import { CREATE_VACANCY } from "../../../../store/constants/action-constants";

  export default {
    name: "UserTicketsVacancyNewVacancyModal",
    components: { BaseModal, VacancyForm },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object,
        default: null
      }
    },
    computed: {
      isVisibleLoading () {
        return this.$store.state.wait[`services/vacancy/${ CREATE_VACANCY }`];
      }
    },
    methods: {
      toggleModal (val) {
        this.$emit("input", val);
      },

      onCreateVacancy (val) {
        this.$emit("done", val);
      }
    }
  };
</script>

<style scoped>
.new-vacancy-card {
  max-width: 1070px;
}
</style>
