<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    persistent
    @input="toggleModal"
  )
    q-card.full-width.candidate-details-card
      q-card-section.row.items-center
        .text-medium {{ $t('user.tickets.responds.modals.details.title') }}
        q-space
        q-btn(icon="close" flat round dense v-close-popup)

      q-separator

      q-card-section(v-if="candidate")
        div.row.q-mb-lg
          div.col-md-6
            div.text-caption.text-grey-8 {{ $t('user.tickets.responds.modals.details.name') }}
            div.text-body1.q-mt-sm {{ candidate.name.full }}

          div.col-md-6(v-if="candidate.resumeLink")
            div.text-caption.text-grey-8 {{ $t('entity.services.vacancies.respondForm.resume') }}
            div.text-body1.q-mt-sm
              a.text-blue.no-text-decoration(:href="candidate.resumeLink" target="_blank")
                | {{ $t('user.tickets.responds.modals.details.resumeLink') }}

        div.q-hoverable.cursor-pointer.q-mb-lg-lg(v-if="candidate.resumeFile" @click="onClickDownloadResume")
          div.text-caption.text-grey-8 {{ $t('user.tickets.responds.modals.details.resume') }}
          div.text-body1.q-mt-sm.text-blue
            | {{ candidate.resumeFileName }}

        div
          div.text-body1.q-mt-sm {{ $t('user.tickets.responds.modals.details.respondText') }}
          q-field(outlined)
            template(v-slot:control)
              div.rich-text.break-word {{ candidate.text }}

        div.q-mt-lg
          div.text-body1.q-mb-md.text-grey-9 {{ $t('user.tickets.responds.modals.details.contacts') }}

          div(v-for="(phone, i) in candidate.contacts.phones" :key="i")
            div.text-caption.text-grey-8 {{ $t('user.profile.mainForm.phone') }}
            div.text-body1.q-mt-xs {{ phone }}

          div.q-mt-md(v-if="candidate.contacts.telegramAlias")
            div.text-caption.text-grey-8 {{ $t('user.profile.mainForm.telegramAlias') }}
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
        ) {{ $t('action.reject') }}
        q-btn(
          @click="onClickAccept"
          color="primary"
          unelevated
        ) {{ $t('user.tickets.responds.modals.details.sendInvite') }}
</template>

<script>
  import { mapActions } from "vuex";
  import BaseModal from "../../../common/BaseModal";
  import VacancyForm from "../../../forms/tickets/VacancyForm";
  import { VacancyStatusesEnum } from "../../../../store/types/vacancy";
  import { DOWNLOAD_FILE } from "../../../../store/constants/action-constants";

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
      ...mapActions({
        downloadFile: DOWNLOAD_FILE
      }),
      toggleModal (val) {
        this.$emit("input", val);
      },

      onClickReject (){
        this.$emit("candidate:reject", this.candidate.id);
      },

      onClickAccept (){
        this.$emit("candidate:accept", this.candidate.id);
      },

      onClickDownloadResume (){
        this.downloadFile(this.candidate.resumeFile);
      }
    }
  };
</script>

<style scoped>
.candidate-details-card {
  max-width: 816px;
}
</style>
