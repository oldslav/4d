<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
  )
    q-card.full-width(v-if="getCurrentTicket")
      q-card-section.row.items-center.q-pb-none
        .text-medium
          | Заявка на хранение
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
          | {{ $t("entity.documents.title") }}
        div(v-for="(type, i) in Object.keys(getCurrentTicket.documents)" :key="i")
          .text-small.text-primary-light
            | {{ $t(`entity.files.${type}`) }}
          DownloaderInput(v-for="(file, j) in getCurrentTicket.documents[type]" :value="file" :key="j")
      q-separator
      q-card-section(v-if="getCurrentTicket.serviceOption.service.id === 1")
        .text-medium.q-mb-sm
          | {{ $t("entity.services.warehouse.radius") }}
        div.text-uppercase
          | {{ getCurrentTicket.serviceOption.serviceType.name }}
      q-card-section(v-else-if="getCurrentTicket.serviceOption.service.id === 2")
        .text-medium.q-mb-sm
          | {{ $t("entity.services.warehouse.storageTypes.rentType") }}
        div.text-capitalize
          | {{ getCurrentTicket.serviceOption.serviceType.name }}
      q-separator
      q-card-section
        .text-medium.q-mb-sm
          | {{ $t("entity.services.warehouse.storageTypes.title") }}
        .flex.full-width.items-center.justify-between
          div
            | {{ $tc("entity.services.warehouse.storageTypes.duration", getCurrentTicket.serviceOption.storagePeriod) }}
          .text-primary
            | {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: getCurrentTicket.serviceOption.price}) }}
      q-separator
      q-card-section(v-if="contactsPresent")
        .text-medium.q-mb-sm
          | {{ $t("entity.contacts.title") }}
        .row
          .col
            q-input(readonly :label="$t('entity.contacts.phone')" :value="getCurrentTicket.contacts.phones[0]" borderless v-if="getCurrentTicket.contacts.phones.length")
            q-input(readonly :label="$t('entity.contacts.telegram')" :value="getCurrentTicket.contacts.telegramAlias" borderless v-if="getCurrentTicket.contacts.telegramAlias")
      q-card-actions(align="right" v-if="isEmployee")
        q-btn(v-close-popup flat color="red" :label="$t('action.reject')" @click="onReject()")
        q-btn(v-close-popup color="primary" :label="$t('action.accept')" @click="onApprove()").q-px-md

    div
      q-inner-loading(:showing="loadingTicket")
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import BaseModal from "components/common/BaseModal";
  import { GET_USER_TICKET } from "@/store/constants/action-constants";
  import DownloaderInput from "components/common/DownloaderInput";

  export default {
    name: "TicketWarehouseDetailsModal",
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
          message: "Ошибка при получении заявки"
        });
      }
    },
    computed: {
      ...mapGetters("user/tickets/warehouse", ["getCurrentTicket"]),
      ...mapGetters(["isEmployee"]),
      contactsPresent () {
        return !!this.getCurrentTicket.contacts.phones.length || this.getCurrentTicket.contacts.telegramAlias;
      },
      loadingTicket () {
        return this.$store.state.wait[`user/tickets/warehouse/${ GET_USER_TICKET }`];
      }
    },
    methods: {
      ...mapActions("user/tickets/warehouse", [GET_USER_TICKET]),
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
