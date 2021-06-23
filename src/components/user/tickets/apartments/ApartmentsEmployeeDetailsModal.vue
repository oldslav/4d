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
          | Основная информация
        .row.q-col-gutter-sm
          .col-12.col-md-4
            q-input(readonly label="Фамилия" :value="info.name.last" borderless)
          .col-12.col-md-4
            q-input(readonly label="Имя" :value="info.name.first" borderless)
          .col-12.col-md-4
            q-input(readonly label="Отчество" :value="info.name.patronymic" v-if="!!info.name.patronymic" borderless)
      q-separator
      q-card-section
        .text-medium.q-mb-sm
          | Количество комнат
        div(v-for="(room, index) in info.rooms.length" :key="index").q-mb-sm
          | {{ $tc("entity.services.living.info.rooms", +room) }}
      q-separator
      q-card-section(v-if="contactsPresent")
        .text-medium.q-mb-sm
          | Контакты
        .row
          .col
            q-input(readonly label="Телефон" :value="info.contacts.phones[0]" borderless v-if="info.contacts.phones.length")
            q-input(readonly label="Телеграм" :value="info.contacts.telegramAlias" borderless v-if="info.contacts.telegramAlias")
      q-card-actions(align="right")
        q-btn(v-close-popup flat color="red" label="Отклонить" @click="onReject()")
        q-btn(v-close-popup color="primary" label="Принять" @click="onApprove()").q-px-md
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
        this.$emit("reject", this.value.id);
      },
      onApprove () {
        this.$emit("approve", this.value.id);
      }
    }
  };
</script>
