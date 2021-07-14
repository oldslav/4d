<template lang="pug">
  div
    vacancy-card(
      v-model="getVacancy"
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
        isEnableEditorMode: false,
        isLoading: false
      };
    },
    computed: {
      ...mapGetters("user/tickets/vacancy", [
        "getVacancy"
      ])
    },
    methods: {
      ...mapActions("services/vacancy", {
        updateVacancy: UPDATE_VACANCY
      }),
      async onSubmitVacancy (update) {
        const notifyEnd = this.$q.notify({
          type: "ongoing",
          message: "Обновляем вакансию"
        });

        try {
          const updatedVacancy = await this.updateVacancy({
            id: this.getVacancy.id,
            update
          });
          this.isEnableEditorMode = false;
          notifyEnd({ type: "positive", message: "Вакансия успешно обновлена" });
          this.$store.commit(`user/tickets/vacancy/${ SET_USER_VACANCY }`, updatedVacancy);
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: "При обновлении вакансии произошла ошибка, пожалуйста попробуйте позже"
          });
        }
      }
    }
  };
</script>
