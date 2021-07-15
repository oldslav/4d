<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
  )
    q-card.full-width
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
            q-input(readonly :label="$t('user.lastName')" :value="info.name.last" borderless)
          .col-12.col-md-4
            q-input(readonly :label="$t('user.firstName')" :value="info.name.first" borderless)
          .col-12.col-md-4
            q-input(readonly :label="$t('user.patronymic')" :value="info.name.patronymic" v-if="!!info.name.patronymic" borderless)
      q-separator
      q-card-section
        .text-medium.q-mb-sm
          | Данные об автомобиле
        .row.q-col-gutter-sm
          .col-12.col-md-4
            q-input(readonly :label="$t('vehicle.type')" :value="info.vehicle.type.name" borderless)
          .col-12.col-md-4
            q-input(readonly :label="$t('vehicle.brand')" :value="info.vehicle.brand.name" borderless)
          .col-12.col-md-4
            q-input(readonly :label="$t('vehicle.model')" :value="info.vehicle.model.name" borderless)
        .row.q-col-gutter-sm
          .col-12.col-md-4
            q-input(readonly :label="$t('vehicle.plates')" :value="info.vehicle.number" borderless)
      q-separator
      q-card-section
        .text-medium.q-mb-sm
          | Тип аренды
        .row.q-col-gutter-sm
          .col-12.col-md-10
            q-input(readonly :value="info.price.name" borderless)
          .col-12.col-md-2.row.justify-end
            q-input.text-primary(readonly :value="ticketPrice" borderless)
      q-separator
      q-card-section(v-if="contactsPresent")
        .text-medium.q-mb-sm
          | {{ $t("entity.contacts.title") }}
        .row
          .col
            q-input(readonly :label="$t('entity.contacts.phone')" :value="info.contacts.phones[0]" borderless v-if="info.contacts.phones.length")
            q-input(readonly :label="$t('entity.contacts.telegram')" :value="info.contacts.telegramAlias" borderless v-if="info.contacts.telegramAlias")
</template>

<script>
  import BaseModal from "components/common/BaseModal";

  export default {
    name: "TicketDetailsModal",
    components: { BaseModal },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      info: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      contactsPresent () {
        return !!this.info.contacts.phones.length || this.info.contacts.telegramAlias;
      },
      ticketPrice () {
        if (this.info && this.info.parkingPlace.type.id === 2) {
          return $t("services.parking.rentTypes.social.price.title");
        }
        return `${ this.info.price.price }, руб.`;
      }
    },
    methods: {
      toggleModal (val) {
        this.$emit("input", val);
      },
      onReject () {
        this.$emit("reject", this.info.id);
      },
      onApprove () {
        this.$emit("approve", this.info.id);
      }
    }
  };
</script>
