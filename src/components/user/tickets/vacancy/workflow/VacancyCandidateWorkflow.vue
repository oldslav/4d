<template lang="pug">
  div
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
        div.rich-text {{ $t('user.tickets.responds.companyWorkflow.steps.first.description') }}
        div.row.q-mt-lg.items-center.justify-end
          q-btn.q-mr-md(flat color="red" @click="onClickReject")
            | {{ $t('user.tickets.responds.companyWorkflow.steps.first.reject') }}
          q-btn(color="primary" size="s" unelevated  @click="onClickSuccessInterview")
            | {{ $t('user.tickets.responds.companyWorkflow.steps.first.approve') }}

      q-step(
        :name="2"
        :done="currentStep > 2"
        :title="$t('user.tickets.vacancies.workflow.applicant.second.title')"
        prefix="2"
        active-icon="question_answer"
      )
        div.rich-text {{ $t('user.tickets.responds.companyWorkflow.steps.second.description') }}

        div.row.q-mt-lg.items-center.justify-end
          q-btn.q-mr-md(flat color="red" @click="onClickReject")
            | {{ $t('user.tickets.responds.companyWorkflow.steps.first.reject') }}
          q-btn(color="primary" size="s" unelevated  @click="onClickJobOffer")
            | {{ $t('user.tickets.responds.companyWorkflow.steps.second.approve') }}

      q-step(
        :name="3"
        :done="currentStep === 3"
        :title="$t('user.tickets.vacancies.workflow.applicant.third.title')"
        prefix="3"
      )
        div.row.q-mt-lg.items-center.justify-end
          q-btn.q-mr-md(flat color="red" @click="onClickReject")
            | {{ $t('user.tickets.responds.companyWorkflow.steps.first.reject') }}
          q-btn(color="primary" size="s" unelevated  @click="onClickJobOffer")
            | {{ $t('user.tickets.responds.companyWorkflow.steps.second.approve') }}
</template>
<script>
  import { RespondStatusesEnum } from "../../../../../store/types/vacancy";

  export default {
    props: {
      value: { type: Object, default: () => ({}) }
    },
    computed:{
      currentStep (){
        if (this.value.status.id === RespondStatusesEnum.invite) {
          return 1;
        }

        if (this.value.status.id === RespondStatusesEnum.interview_success) {
          return 2;
        }

        return 1;
      }
    },
    methods:{
      onClickReject (){
        this.$emit("candidate:reject");
      },

      onClickSuccessInterview (){
        this.$emit("candidate:interview-success");
      },

      onClickJobOffer (){
        this.$emit("candidate:offer");
      }
    }
  };
</script>
<style>
.user-tickets-vacancy-workflow {
  background-color: #DEEFFE !important;
}
</style>
