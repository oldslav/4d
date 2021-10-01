<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
  )
    q-card.modal-container
      q-form(@submit.stop.prevent="onSubmit()")
        q-card-section.row.items-center.q-pb-none
          .text-medium
            | Расторжение договора
          q-space
          q-btn(icon="close" flat round dense v-close-popup)
        q-card-section
          BaseInput(type="textarea" :label="$t('common.reason')" v-model="reason" outlined)
        q-card-actions(align="right")
          q-btn(:label="$t('action.submit')" type="submit" color="primary")
</template>

<script>
  import BaseModal from "components/common/BaseModal";
  import BaseInput from "components/common/BaseInput";

  export default {
    name: "TerminateContractModal",
    components: { BaseInput, BaseModal },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      ticketId: {
        type: [Number, String],
        default: null
      }
    },
    data () {
      return {
        reason: null
      };
    },
    methods: {
      toggleModal (val) {
        this.$emit("input", val);
        this.$emit("update:ticketId", null);
        Object.assign(this.$data, this.$options.data.apply(this));
      },
      onSubmit () {
        const { ticketId, reason } = this;
        this.$emit("submit", { ticketId, reason });
        this.toggleModal(false);
      }
    }
  };
</script>
