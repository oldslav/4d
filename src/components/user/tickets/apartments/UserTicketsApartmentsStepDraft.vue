<template lang="pug">
  div.column
    div.text-body1.text-wrap
      | Для подачи заявки продолжите заполнение формы.
    div.text-right
      q-btn(color="primary" label="Отправить на рассмотрение" @click="onSend()")
</template>

<script>
  export default {
    name: "UserTicketsApartmentsStepDraft",
    methods: {
      onSend () {
        this.$emit("send");
      }
    }
  };
</script>

<style scoped>

</style>
