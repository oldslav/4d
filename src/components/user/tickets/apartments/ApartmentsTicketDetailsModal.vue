<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
    :loading="loadingTicket"
  )
    q-card.full-width(v-if="getCurrentTicket")
      q-card-section.row.items-center.q-pb-none
        .text-medium
          | Заявка на аренду квартиры
        q-space
        q-btn(icon="close" flat round dense v-close-popup)
      q-card-section
        .text-medium.q-mb-sm
          | {{ $t("entity.services.mainInfo") }}
        .row.q-col-gutter-sm
          .col-12.col-md-4
            q-input(readonly :label="$t('user.lastName')" :value="getCurrentTicket.name.last" borderless)
          .col-12.col-md-4
            q-input(readonly :label="$t('user.firstName')" :value="getCurrentTicket.name.first" borderless)
          .col-12.col-md-4
            q-input(readonly :label="$t('user.patronymic')" :value="getCurrentTicket.name.patronymic" v-if="!!getCurrentTicket.name.patronymic" borderless)

      q-card-section(v-if="isUserLegal")
        .row.q-col-gutter-sm
          .col-12
            q-expansion-item(dense)
              template(#header)
                .flex.full-width.q-pl-none.items-center
                  | Документы юридического лица
              .q-pt-sm
                .q-mb-sm(v-for="(type, i) in Object.keys(legalDocuments)" :key="i")
                  .text-small.text-primary-light(v-if="!!legalDocuments[type].length")
                    | {{ $t(`entity.files.${type}`) }}
                  DownloaderInput(v-for="(file, j) in legalDocuments[type]" :value="file" :key="j" v-if="!!legalDocuments[type].length")
          .col-12
            q-expansion-item(dense)
              template(#header)
                .flex.full-width.q-pl-none.items-center
                  | Документы жителя
              .q-pt-sm
                .q-mb-sm(v-for="(type, i) in Object.keys(residentDocuments)" :key="i")
                  .text-small.text-primary-light(v-if="!!residentDocuments[type].length")
                    | {{ $t(`entity.files.${type}`) }}
                  DownloaderInput(v-for="(file, j) in residentDocuments[type]" :value="file" :key="j" v-if="!!residentDocuments[type].length")
      q-card-section(v-else)
        .q-mb-sm(v-for="(type, i) in Object.keys(getCurrentTicket.documents)" :key="i")
          .text-small.text-primary-light(v-if="!!getCurrentTicket.documents[type].length")
            | {{ $t(`entity.files.${type}`) }}
          DownloaderInput(v-for="(file, j) in getCurrentTicket.documents[type]" :value="file" :key="j" v-if="!!getCurrentTicket.documents[type].length")
      q-separator

      q-card-section(v-if="getCurrentTicket.neighbors.length > 0")
        .text-medium.q-mb-sm
          | {{ $t("entity.neighbors.data") }}
        div(v-for="(neighbor, index) in getCurrentTicket.neighbors")
          .row.q-col-gutter-sm
            .col-12.col-md-4(v-if="!!neighbor.name.last")
              q-input(readonly :label="$t('user.lastName')" :value="neighbor.name.last" borderless)
            .col-12.col-md-4
              q-input(readonly :label="$t('user.firstName')" :value="neighbor.name.first" borderless)
            .col-12.col-md-4(v-if="!!neighbor.name.patronymic")
              q-input(readonly :label="$t('user.patronymic')" :value="neighbor.name.patronymic" borderless)
            .col-12(v-if="Object.keys(neighbor.documents).length > 0")
              q-expansion-item(dense)
                template(#header)
                  .flex.full-width.q-pl-none.items-center
                    | {{ $t("common.documents") }}
                .q-pt-sm
                  .q-mb-sm(v-for="(type, i) in Object.keys(neighbor.documents)" :key="i")
                    .text-small.text-primary-light
                      | {{ $t(`entity.files.${type}`) }}
                    DownloaderInput(v-for="(file, j) in neighbor.documents[type]" :value="file" :key="j")
      q-separator(v-if="getCurrentTicket.neighbors.length > 0")

      q-card-section
        .text-medium.q-mb-sm
          | {{ $t("entity.services.living.roomsAmount") }}
        div(v-for="(room, index) in getCurrentTicket.rooms" :key="index").q-mb-sm
          | {{ $tc("entity.services.living.info.rooms", +room) }}
      q-separator

      q-card-section(v-if="contactsPresent")
        .text-medium.q-mb-sm
          | {{ $t("entity.contacts.title") }}
        .row
          .col
            q-input(
              readonly
              :label="$t('entity.contacts.phone')"
              v-for="(phone, index) in getCurrentTicket.contacts.phones"
              :value="phone"
              borderless
              v-if="getCurrentTicket.contacts.phones.length"
              :key="index"
            )
            q-input(readonly :label="$t('entity.contacts.telegram')" :value="getCurrentTicket.contacts.telegramAlias" borderless v-if="getCurrentTicket.contacts.telegramAlias")
      q-card-actions(v-if="getCurrentTicket.status.id === 2 && isEmployee" align="right")
        q-btn(v-close-popup flat color="red" :label="$t('action.reject')" @click="onReject()")
        q-btn(v-close-popup color="primary" :label="$t('action.accept')" @click="onApprove()").q-px-md
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import BaseModal from "components/common/BaseModal";
  import { GET_LEGAL_TICKET, GET_USER_TICKET } from "@/store/constants/action-constants";
  import DownloaderInput from "components/common/DownloaderInput";

  export default {
    name: "ApartmentsTicketDetailsModal",
    components: { BaseModal, DownloaderInput },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      id: {
        type: [Number, String],
        default: null
      }
    },
    async created () {
      try {
        const action = this.isUserLegal ? this.GET_LEGAL_TICKET : this.GET_USER_TICKET;
        await action.call(this, this.id);
      } catch (e) {
        this.$q.notify({
          type: "negative",
          message: "Ошибка при получении заявки"
        });
      }
    },
    computed: {
      ...mapGetters("user/tickets/living", ["getCurrentTicket"]),
      ...mapGetters(["isEmployee", "isUserLegal"]),
      contactsPresent () {
        return !!this.getCurrentTicket.contacts.phones.length || this.getCurrentTicket.contacts.telegramAlias;
      },
      loadingTicket () {
        return this.$store.state.wait[`user/tickets/living/${ GET_USER_TICKET }`];
      },
      legalDocuments () {
        const { inn_jur, ogrn, egrjul, partner_card } = this.getCurrentTicket.documents;
        return { inn_jur, ogrn, egrjul, partner_card };
      },
      residentDocuments () {
        const { passport, inn, consent_processing_personal_data, job_petition } = this.getCurrentTicket.documents;
        return { passport, inn, consent_processing_personal_data, job_petition };
      }
    },
    methods: {
      ...mapActions("user/tickets/living", [GET_USER_TICKET, GET_LEGAL_TICKET]),
      toggleModal (val) {
        this.$emit("input", val);
        this.$emit("update:id", null);
      },
      onReject () {
        this.$emit("reject", this.getCurrentTicket.id);
      },
      onApprove () {
        this.$emit("approve", this.getCurrentTicket.id);
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .q-expansion-item {
    .q-item {
      padding-left 0 !important
    }
  }
</style>
