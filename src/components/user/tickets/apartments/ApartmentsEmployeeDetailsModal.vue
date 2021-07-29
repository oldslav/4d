<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
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

      q-card-section
        div(v-for="(type, i) in Object.keys(getCurrentTicket.documents)" :key="i")
          .text-small.text-primary-light
            | {{ $t(`entity.files.${type}`) }}
          DownloaderInput(v-for="(file, j) in getCurrentTicket.documents[type]" :value="file" :key="j")
      q-separator
      q-card-section
        .text-medium.q-mb-sm
          | {{ $t("entity.services.living.roomsAmount") }}
        div(v-for="(room, index) in getCurrentTicket.apartment.rooms" :key="index").q-mb-sm
          | {{ $tc("entity.services.living.info.rooms", +room) }}
      q-separator
      q-card-section(v-if="contactsPresent")
        .text-medium.q-mb-sm
          | {{ $t("entity.contacts.title") }}
        .row
          .col
            q-input(readonly :label="$t('entity.contacts.phone')" :value="getCurrentTicket.contacts.phones[0]" borderless v-if="getCurrentTicket.contacts.phones.length")
            q-input(readonly :label="$t('entity.contacts.telegram')" :value="getCurrentTicket.contacts.telegramAlias" borderless v-if="getCurrentTicket.contacts.telegramAlias")
      q-card-actions(align="right")
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
    name: "ApartmentsEmployeeDetailsModal",
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
      ...mapGetters("user/tickets/living", ["getCurrentTicket"]),
      contactsPresent () {
        return !!this.getCurrentTicket.contacts.phones.length || this.getCurrentTicket.contacts.telegramAlias;
      },
      loadingTicket () {
        return this.$store.state.wait[`user/tickets/living/${ GET_USER_TICKET }`];
      },
      passport () {
        return this.getCurrentTicket.images.find(image => image.docType && image.docType.name === "passport") || null;
      }
    },
    methods: {
      ...mapActions("user/tickets/living", [GET_USER_TICKET]),
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
