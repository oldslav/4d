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
          | Заявка на коммерческую недвижимость
        q-space
        q-btn(icon="close" flat round dense v-close-popup)
      q-separator.q-mt-sm
      q-card-section
        .text-medium.q-mb-sm
          | {{ $t("entity.services.mainInfo") }}
        q-input(readonly borderless :value="getCurrentTicket.companyName" :label="$t('user.companyName')")
        .row.q-col-gutter-sm
          .col-12.col-md-4
            q-input(readonly :label="$t('user.lastName')" :value="getCurrentTicket.name.last" v-if="!!getCurrentTicket.name.last" borderless)
          .col-12.col-md-4
            q-input(readonly :label="$t('user.firstName')" :value="getCurrentTicket.name.first" borderless)
          .col-12.col-md-4
            q-input(readonly :label="$t('user.patronymic')" :value="getCurrentTicket.name.patronymic" v-if="!!getCurrentTicket.name.patronymic" borderless)
        q-input(readonly borderless :value="getCurrentTicket.jobPosition" :label="$t('common.position')")
      q-separator
      q-card-section
        .text-medium.q-mb-sm
          | {{ $t("entity.documents.title") }}
        div(v-for="(type, i) in Object.keys(getCurrentTicket.documents)" :key="i")
          DownloaderInput(v-for="(file, j) in getCurrentTicket.documents[type]" :value="file" :key="j" :label="$t(`entity.files.${type}`)").q-mb-sm
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
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import { GET_COMPANY_COMMERCE_TICKET } from "@/store/constants/action-constants";
  import BaseModal from "components/common/BaseModal";
  import DownloaderInput from "components/common/DownloaderInput";

  export default {
    name: "CommerceTicketDetailsModal",
    components: { DownloaderInput, BaseModal },
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
        await this.GET_COMPANY_COMMERCE_TICKET(this.id);
      } catch (e) {
        this.$q.notify({
          type: "negative",
          message: "Ошибка при получении заявки"
        });
        this.toggleModal(false);
      }
    },
    computed: {
      ...mapGetters("user/tickets/commerce", ["getCurrentTicket"]),
      ...mapGetters(["isEmployee"]),
      loadingTicket () {
        return this.$store.state.wait[`user/tickets/commerce/${ GET_COMPANY_COMMERCE_TICKET }`];
      },
      contactsPresent () {
        return !!this.getCurrentTicket.contacts.phones.length || this.getCurrentTicket.contacts.telegramAlias;
      }
    },
    methods: {
      ...mapActions("user/tickets/commerce", [GET_COMPANY_COMMERCE_TICKET]),
      toggleModal (val) {
        this.$emit("input", val);
        this.$emit("update:id", null);
      },
      onReject () {
      },
      onApprove () {
      }
    }
  };
</script>
