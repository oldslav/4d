<template lang="pug">
  BaseModal(
    :value="value"
    ref="auth-modal"
    square
    position="standard"
    @toggleModal="(value) => $emit('input', value)"
  )
    q-card.modal-container
      q-card-section.row.justify-between.items-center.text-h6
        | {{ $t("user.profile.mailConfirmedModal.title") }}
        q-icon.cursor-pointer(name="o_close" @click="$emit('input', false)")

      q-separator.q-mb-sm

      q-card-section
        | {{ $t("user.profile.mailConfirmedModal.message") }}

      q-card-actions(align="right")
        q-btn(
          v-close-popup
          :label="$t('action.login')"
          color="primary"
          @click="$emit('show-auth')"
        )
</template>

<script>
  import BaseModal from "../common/BaseModal";

  export default {
    name: "MailConfirmedModal",
    components: { BaseModal },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    }
  };
</script>