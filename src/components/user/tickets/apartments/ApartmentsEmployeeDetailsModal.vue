<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
  )
    q-card.full-width
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
            q-input(readonly :label="$t('user.lastName')" :value="info.name.last" borderless)
          .col-12.col-md-4
            q-input(readonly :label="$t('user.firstName')" :value="info.name.first" borderless)
          .col-12.col-md-4
            q-input(readonly :label="$t('user.patronymic')" :value="info.name.patronymic" v-if="!!info.name.patronymic" borderless)
      q-separator
      q-card-section
        .text-medium.q-mb-sm
          | {{ $t("entity.services.living.roomsAmount") }}
        div(v-for="(room, index) in info.rooms" :key="index").q-mb-sm
          | {{ $tc("entity.services.living.info.rooms", +room) }}
      q-separator
      q-card-section(v-if="contactsPresent")
        .text-medium.q-mb-sm
          | {{ $t("entity.contacts.title") }}
        .row
          .col
            q-input(readonly :label="$t('entity.contacts.phone')" :value="info.contacts.phones[0]" borderless v-if="info.contacts.phones.length")
            q-input(readonly :label="$t('entity.contacts.telegram')" :value="info.contacts.telegramAlias" borderless v-if="info.contacts.telegramAlias")
      q-card-actions(align="right")
        q-btn(v-close-popup flat color="red" :label="$t('action.reject')" @click="onReject()")
        q-btn(v-close-popup color="primary" :label="$t('action.accept')" @click="onApprove()").q-px-md
</template>

<script>
  import BaseModal from "components/common/BaseModal";

  export default {
    name: "ApartmentsEmployeeDetailsModal",
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
