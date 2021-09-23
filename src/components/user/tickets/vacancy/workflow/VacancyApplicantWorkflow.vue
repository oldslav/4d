<template lang="pug">
  div(:class="{'respond-candidate-workflow_complete':isComplete}")
    q-stepper.user-tickets-vacancy-workflow(
      :value="currentStep"
      active-icon="pending"
      done-icon="done"
      done-color="primary"
      flat
    )
      q-step(
        :name="1"
        :done="currentStep > 1"
        :title="$t('user.tickets.vacancies.workflow.applicant.first.title')"
        prefix="1"
      )
        div.rich-text {{ value.invitationText }}

      q-step(
        :name="2"
        :done="currentStep > 2"
        :title="$t('user.tickets.vacancies.workflow.applicant.second.title')"
        prefix="2"
        active-icon="question_answer"
      )
        div.rich-text {{ $t('user.tickets.vacancies.workflow.applicant.second.text') }}

      q-step(
        :name="3"
        :done="currentStep > 3"
        :title="$t('user.tickets.vacancies.workflow.applicant.third.title')"
        prefix="3"
      )
        div.rich-text(v-show="isReject") {{ value.rejectionText }}
        div.rich-text(v-show="!isReject") {{ $t('user.tickets.vacancies.workflow.applicant.third.successDescription') }}
</template>
<script>
  import { RespondStatusesEnum } from "../../../../../store/types/vacancy";

  export default {
    props: {
      value: { type: Object, default: () => ({}) }
    },
    computed: {
      currentStep () {
        if (this.value.status.id === RespondStatusesEnum.invite) {
          return 1;
        }

        if (
          this.value.status.id === RespondStatusesEnum.job_offer ||
          this.value.status.id === RespondStatusesEnum.reject
        ) {
          return 3;
        }

        return 2;
      },

      isComplete () {
        return this.value.status.id === RespondStatusesEnum.job_offer ||
          this.value.status.id === RespondStatusesEnum.reject;
      },

      isReject (){
        return this.value.status.id === RespondStatusesEnum.reject;
      }
    }
  };
</script>
<style>
.user-tickets-vacancy-workflow {
  background-color: #DEEFFE !important;
}

.respond-candidate-workflow_complete .q-stepper__header {
  display: none;
}
</style>
