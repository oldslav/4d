<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    persistent
    @input="toggleModal"
  )
    q-card.full-width.candidate-details-card
      q-card-section.row.items-center
        .text-medium Детали отклика
        q-space
        q-btn(icon="close" flat round dense v-close-popup)

      q-separator

      q-card-section(v-if="candidate")
        div.row.q-mb-lg
          div.col-md-6
            div.text-caption.text-grey-8 Ф.И.О. кандидата
            div.text-body1.q-mt-sm {{ candidate.name.full }}

          div.col-md-6(v-if="candidate.resumeLink")
            div.text-caption.text-grey-8 Резюме
            div.text-body1.q-mt-sm
              a.text-blue.no-text-decoration(:href="candidate.resumeLink" target="_blank") Открыть ссылку

        div.q-mb-lg-lg
          div.text-caption.text-grey-8 Файл резюме
          div.text-body1.q-mt-sm Resume.pdf

        div
          div.text-body1.q-mt-sm Сопроводительное письмо
          q-field(outlined)
            template(v-slot:control)
              div.rich-text {{ candidate.text }}

        div.q-mt-lg
          div.text-body1.q-mb-md.text-grey-9 Контакты

          div(v-for="(phone, i) in candidate.contacts.phones" :key="i")
            div.text-caption.text-grey-8 Телефон
            div.text-body1.q-mt-xs {{ phone }}

          div.q-mt-md(v-if="candidate.contacts.telegramAlias")
            div.text-caption.text-grey-8 Telegram (алиас)
            div.text-body1.q-mt-xs @{{ candidate.contacts.telegramAlias }}

      q-separator(v-if="candidate" v-show="candidate.status.id === vacancyStatuses.not_viewed")
      q-card-actions.q-pa-md(
        v-if="candidate"
        v-show="candidate.status.id === vacancyStatuses.not_viewed"
        align="right"
      )
        q-btn(
          @click="onClickReject"
          flat
          color="red"
        ) Отклонить
        q-btn(
          @click="onClickAccept"
          color="primary"
          unelevated
        ) Пригласить на собеседование
</template>

<script>
  import BaseModal from "../../../common/BaseModal";
  import VacancyForm from "../../../forms/tickets/VacancyForm";
  import { VacancyStatusesEnum } from "../../../../store/types/vacancy";

  export default {
    name: "CandidateDetailsModal",
    components: { BaseModal, VacancyForm },
    props: {
      value: { type: Boolean, default: false },
      candidate: { type: Object, default: null }
    },
    data (){
      return {
        vacancyStatuses: VacancyStatusesEnum
      };
    },
    methods: {
      toggleModal (val) {
        this.$emit("input", val);
      },

      onClickReject (){
        this.$emit("candidate:reject", this.candidate.id);
      },

      onClickAccept (){
        this.$emit("candidate:accept", this.candidate.id);
      }
    }
  };
</script>

<style scoped>
.candidate-details-card {
  max-width: 816px;
}
</style>
