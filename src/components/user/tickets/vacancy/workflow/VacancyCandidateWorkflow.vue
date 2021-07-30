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
        :title="$t('user.tickets.vacancies.userSteps.first.title')"
        prefix="1"
      )
        | Вы пригласили кандидата на собседование!
        br
        | После проведения собеседования, пожалуйста, не забудьте сообщить кандидату о своем решении.
        div.row.q-mt-lg.items-center.justify-end
          q-btn.q-mr-md(flat color="red" @click="onClickReject") Отклонить
          q-btn(color="primary" size="s" unelevated  @click="onClickSuccessInterview") Собеседование пройдено

      q-step(
        :name="2"
        :done="currentStep > 2"
        :title="$t('user.tickets.vacancies.userSteps.second.title')"
        prefix="2"
        active-icon="question_answer"
      )
        | Этап собеседования пройден, пожалуйста, не забудьте
        br
        | сообщить кандидату о своем решении принятие на работу.

        div.row.q-mt-lg.items-center.justify-end
          q-btn.q-mr-md(flat color="red" @click="onClickReject") Отклонить
          q-btn(color="primary" size="s" unelevated  @click="onClickJobOffer") Принять на работу

      q-step(
        :name="3"
        :done="currentStep === 3"
        :title="$t('user.tickets.vacancies.userSteps.third.title')"
        prefix="3"
      )
        div.row.q-mt-lg.items-center.justify-end
          q-btn.q-mr-md(flat color="red" @click="onClickReject") Отклонить
          q-btn(color="primary" size="s" unelevated  @click="onClickJobOffer") Принять на работу
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
