<template lang="pug">
  q-page.q-pa-lg.bg-white
    ModalFail(v-model="failVisible")
    ModalSuccess(v-model="successVisible")
    .row.q-gutter-lg.justify-center
      q-btn(color="primary" label="Создать заявку" @click="showNewTicketModal()")
    NewCrowdfundingTicket(v-model="newTicketVisible" @success="showSuccessPopup" @fail="showFailPopup()")
</template>

<script>
  import ModalFail from "components/services/ModalFail";
  import ModalSuccess from "components/services/ModalSuccess";
  import NewCrowdfundingTicket from "components/services/crowdfunding/NewCrowdfundingTicket";

  export default {
    name: "ServiceCrowdfunding",
    components: { NewCrowdfundingTicket, ModalFail, ModalSuccess },
    data () {
      return {
        newTicketVisible: false,
        successVisible: false,
        failVisible: false
      };
    },
    methods: {
      showNewTicketModal () {
        this.newTicketVisible = true;
      },
      showSuccessPopup () {
        this.successVisible = true;
      },
      showFailPopup () {
        this.failVisible = true;
      }
    }
  };
</script>
