<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
  )
    q-card.full-width
      q-card-section.row.items-center.q-pb-none
        .text-primary.text-medium
          | Одобрение заявки
        q-space
        q-btn(icon="close" flat round dense v-close-popup)
      q-card-section
        .text-caption.text-primary-light.q-mb-sm
          | Выберите тип договора
        q-option-group(
          v-model="fixedTermContract"
          color="primary"
          inline
          :options="termOptions"
        )
        q-separator.q-my-md
        .text-caption.text-primary-light.q-mb-sm
          | Количество комнат
        div.q-gutter-sm
          q-checkbox(v-model="rooms" val="1" label="1 комната")
          q-checkbox(v-model="rooms" val="2" label="2 комнаты")
          q-checkbox(v-model="rooms" val="3" label="3 комнаты")
        q-separator.q-my-md
        .text-caption.q-mb-sm
          | Статус заявки обновится автоматически.
        q-input(type="textarea" v-model="text" label="Сообщение" outlined)
      q-card-actions(align="right").q-gutter-sm
        q-btn(flat size="md" :label="$t('action.cancel')" @click="toggleModal(false)")
        q-btn(color="primary" size="md" label="Отправить" @click="onApprove()" :disable="!isValid").q-px-md
</template>

<script>
  import BaseModal from "components/common/BaseModal";

  export default {
    name: "ApproveTicketModal",
    components: { BaseModal },
    props: {
      value: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    data () {
      return {
        fixedTermContract: true,
        text: "",
        rooms: []
      };
    },
    computed: {
      isValid () {
        return !!this.text && !!this.rooms.length;
      },
      termOptions () {
        return [
          {
            label: "Срочный",
            value: true
          },
          {
            label: "Бессрочный",
            value: false
          }
        ];
      }
    },
    methods: {
      toggleModal (val) {
        this.$emit("input", val);
        Object.assign(this.$data, this.$options.data.apply(this));
      },
      onApprove () {
        const { fixedTermContract, text, rooms } = this;
        this.$emit("approve", { fixedTermContract, text, rooms });
        this.toggleModal(false);
      }
    }
  };
</script>
