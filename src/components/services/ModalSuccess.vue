<template lang="pug">
  q-dialog(:value="value" @input="onInput")
    q-card
      q-card-section.row.items-center.q-pb-none
        .text-primary.text-medium
          | {{ $t("user.tickets.messages.create.success.title") }}
        q-space
        q-btn(icon="close" flat round dense v-close-popup)
      q-card-section
        | {{ $t('user.tickets.messages.create.success.label') }}
        q-separator.q-my-md
        | {{ $t('user.tickets.messages.create.success.caption') }}
      q-card-actions(align="right").q-pa-md
        q-btn(outline color="primary" :label="$t('action.toProfile')" @click="toProfile")
</template>

<script>
  export default {
    name: "ModalSuccess",
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onInput (value) {
        this.$emit("input", value);
      },

      toProfile () {
        this.$router.push({ name: "user-profile" });
      }
    }
  };
</script>
