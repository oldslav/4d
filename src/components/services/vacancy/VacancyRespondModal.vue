<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    persistent
    @input="toggleModal"
  )
    q-card.full-width.vacancy-respond-card
      q-card-section.row.items-center
        .text-medium
          | {{ $t("entity.services.vacancies.respondModalTitle") }}
        q-space
        q-btn(icon="close" flat round dense v-close-popup)

      q-separator

      q-card-section.no-padding
        respond-vacancy-form(@submit="onSubmitRespond")
</template>

<script>
  import BaseModal from "../../common/BaseModal";
  import RespondVacancyForm from "../../forms/services/vacancy/RespondVacancyForm";
  import { mapActions } from "vuex";
  import { RESPOND_VACANCY } from "../../../store/constants/action-constants";

  export default {
    name: "VacancyRespondModal",
    components: { RespondVacancyForm, BaseModal },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      vacancyId: {
        type: Number,
        default: null
      }
    },
    data () {
      return {
        isValidForm: false
      };
    },
    methods: {
      ...mapActions("services/vacancy", {
        respondVacancy: RESPOND_VACANCY
      }),

      toggleModal (val) {
        this.$emit("input", val);
      },

      close (){
        this.toggleModal(false);
      },

      async onSubmitRespond (payload) {
        const notifyEnd = this.$q.notify({
          type: "ongoing",
          message: this.$t("entity.services.vacancies.respondForm.respondProgress")
        });
        try {
          await this.respondVacancy({ id: this.vacancyId, payload });
          notifyEnd({ timeout: 1 });
          this.close();
          this.showSuccessDialog();
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: this.$t("entity.services.vacancies.respondForm.respondError")
          });
        }
      },

      showSuccessDialog () {
        this.$q.dialog({
          title: this.$t("entity.services.vacancies.respondForm.respondSuccessTitle"),
          message: this.$t("entity.services.vacancies.respondForm.respondSuccessMessage"),
          ok: {
            label: this.$t("action.toProfile")
          }
        }).onOk(() => {
          this.$router.push({ name: "user-tickets-vacancy" });
        });
      }
    }
  };
</script>

<style scoped>
.vacancy-respond-card {
  max-width: 816px;
}
</style>
