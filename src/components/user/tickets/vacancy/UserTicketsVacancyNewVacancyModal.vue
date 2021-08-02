<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    persistent
    @input="toggleModal"
  )
    q-card.full-width.new-vacancy-card
      q-card-section.row.items-center
        .text-medium
          | {{ $t('user.tickets.vacancies.modals.create.title') }}
        q-space
        q-btn(icon="close" flat round dense v-close-popup)

      q-separator

      q-card-section
        VacancyForm(:is-valid.sync="isValidForm" ref="form" @submit="onSubmit")

      q-card-actions(align="right")
        q-btn(
          :disabled="!isValidForm"
          :label="$t('user.tickets.vacancies.modals.create.submit')"
          color="primary"
          size="md"
          @click="onSubmit()"
        )
</template>

<script>
  import { mapActions } from "vuex";
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
      }
    },
    data (){
      return {
        isValidForm: false
      };
    },
    computed: {
      isVisibleLoading () {
        return this.$store.state.wait[`services/vacancy/${ CREATE_VACANCY }`];
      }
    },
    methods: {
      ...mapActions("services/vacancy", {
        createVacancy: CREATE_VACANCY
      }),
      toggleModal (val) {
        this.$emit("input", val);
      },

      onSubmit () {
        if (this.isValidForm) {
          this.submit();
        }
      },

      async submit (){
        const values = this.$refs.form.getValues();
        const notifyEnd = this.$q.notify({
          type: "ongoing",
          message: this.$t("user.tickets.vacancies.modals.create.progress")
        });

        try {
          const vacancy = await this.createVacancy(values);
          this.$emit("done", vacancy);
          notifyEnd({ type: "positive", message: this.$t("user.tickets.vacancies.modals.create.success") });
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: this.$t("user.tickets.vacancies.modals.create.error")
          });
        }
      }
    }
  };
</script>

<style scoped>
.new-vacancy-card {
  max-width: 1070px;
}
</style>
