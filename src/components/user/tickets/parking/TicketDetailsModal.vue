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
          | Заявка на аренду парковки
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
      q-separator
      q-card-section
        .text-medium.q-mb-sm
          | Данные об автомобиле
        .row.q-col-gutter-sm
          .col-12.col-md-4
            q-input(readonly :label="$t('entity.vehicles.type')" :value="getCurrentTicket.vehicle.type.name" borderless)
          .col-12.col-md-4
            q-input(readonly :label="$t('entity.vehicles.brand')" :value="getCurrentTicket.vehicle.brand.name" borderless)
          .col-12.col-md-4
            q-input(readonly :label="$t('entity.vehicles.model')" :value="getCurrentTicket.vehicle.model.name" borderless)
        .row.q-col-gutter-sm
          .col-12.col-md-4
            q-input(readonly :label="$t('entity.vehicles.plates')" :value="getCurrentTicket.vehicle.number" borderless)
      q-separator
      q-card-section
        .text-medium.q-mb-sm
          | {{ $t("entity.documents.title") }}
        div(v-for="(type, i) in Object.keys(getCurrentTicket.documents)" :key="i")
          .text-small.text-primary-light
            | {{ $t(`entity.files.${type}`) }}
          DownloaderInput(v-for="(file, j) in getCurrentTicket.documents[type]" :value="file" :key="j")
      q-separator
      q-card-section
        .text-medium.q-mb-sm
          | Тип аренды
        .row.q-col-gutter-sm
          template(v-if="getCurrentTicket.price")
            .col-12.col-md-10
              q-input(readonly :value="getCurrentTicket.price.name" borderless)
            .col-12.col-md-2.row.justify-end
              q-input.text-primary(readonly :value="ticketPrice" borderless)
          template(v-else)
            .col-12.col-md-10
              q-input(readonly :value="getCurrentTicket.parkingPlace.type.description" borderless)
            .col-12.col-md-2.row.justify-end
              q-input.text-primary(readonly :value="ticketPrice" borderless)
      q-separator
      q-card-section(v-if="contactsPresent")
        .text-medium.q-mb-sm
          | {{ $t("entity.contacts.title") }}
        .row
          .col
            q-input(readonly :label="$t('entity.contacts.phone')" :value="getCurrentTicket.contacts.phones[0]" borderless v-if="getCurrentTicket.contacts.phones.length")
            q-input(readonly :label="$t('entity.contacts.telegram')" :value="getCurrentTicket.contacts.telegramAlias" borderless v-if="getCurrentTicket.contacts.telegramAlias")
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import BaseModal from "components/common/BaseModal";
  import { GET_USER_TICKET } from "@/store/constants/action-constants";
  import DownloaderInput from "components/common/DownloaderInput";

  export default {
    name: "TicketDetailsModal",
    components: { BaseModal, DownloaderInput },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      id: {
        type: Number,
        default: null
      }
    },
    async created () {
      try {
        await this.GET_USER_TICKET(this.id);
      } catch (e) {
        this.$q.notify({
          type: "negative",
          message: this.$t("common.error.response.getTicketFail")
        });
        this.toggleModal(false);
      }
    },
    computed: {
      ...mapGetters("user/tickets/parking", ["getCurrentTicket"]),
      ...mapGetters(["isEmployee"]),

      contactsPresent () {
        return !!this.getCurrentTicket.contacts.phones.length || this.getCurrentTicket.contacts.telegramAlias;
      },

      loadingTicket () {
        return this.$store.state.wait[`user/tickets/parking/${ GET_USER_TICKET }`];
      },

      ticketPrice () {
        if (this.getCurrentTicket && this.getCurrentTicket.parkingPlace.type.id === 2) {
          return this.$t("entity.services.parking.rentTypes.social.price.title");
        }
        return this.getCurrentTicket.price && `${ this.getCurrentTicket.price.price }, руб.`;
      }
    },
    methods: {
      ...mapActions("user/tickets/parking", [GET_USER_TICKET]),
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
