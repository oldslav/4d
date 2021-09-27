<template lang="pug">
  div.full-width
    vacancy-card(
      v-model="getVacancy"
      :readonly="isReadonly"
      :editor-mode.sync="isEnableEditorMode"
      @submit="onSubmitVacancy"
    )
</template>
<script>
  import { mapActions, mapGetters } from "vuex";
  import VacancyCard from "../../../components/user/tickets/vacancy/VacancyCard";
  import { UPDATE_VACANCY } from "../../../store/constants/action-constants";
  import { SET_USER_VACANCY } from "../../../store/constants/mutation-constants";

  export default {
    components: { VacancyCard },
    data () {
      return {
        isEnableEditorMode: false
      };
    },
    computed: {
      ...mapGetters([ "getAccount" ]),
      ...mapGetters("user/tickets/vacancy", [
        "getVacancy"
      ]),
      isReadonly (){
        return this.getVacancy.author.id !== this.getAccount.id;
      }
    },
    methods: {
      ...mapActions("services/vacancy", { updateVacancy: UPDATE_VACANCY }),
      async onSubmitVacancy (update) {
        const notifyEnd = this.$q.notify({
          type: "ongoing",
          message: this.$t("user.tickets.vacancies.forms.update.progress")
        });

        try {
          const updatedVacancy = await this.updateVacancy({
            id: this.getVacancy.id,
            update
          });
          this.isEnableEditorMode = false;
          notifyEnd({
            type: "positive",
            message: this.$t("user.tickets.vacancies.forms.update.success")
          });
          this.$store.commit(`user/tickets/vacancy/${ SET_USER_VACANCY }`, updatedVacancy);
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: this.$t("user.tickets.vacancies.forms.update.error")
          });
        }
      }
    }
  };
</script>
