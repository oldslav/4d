<template lang="pug">
  q-list
    q-item.q-py-lg.text-subtitle(clickable @click="$router.back()")
      q-item-section.list-item-avatar(avatar)
        q-icon.text-primary(name="arrow_back")
      q-item-section(avatar)
        | {{ $t("action.back") }}
    q-separator

    NewCrowdfundingTicket(:is-visible="newTicketVisible" @success="showSuccessPopup" @fail="showFailPopup()")

    .row.q-ma-lg
      q-btn.col-12(v-if="!newTicketVisible" color="primary" label="Создать заявку" @click="showNewTicketForm()")
      
    ModalFail(v-model="failVisible")
    ModalSuccess(v-model="successVisible")
</template>

<script>
  import ModalFail from "components/services/ModalFail";
  import ModalSuccess from "components/services/ModalSuccess";
  import NewCrowdfundingTicket from "components/forms/services/crowdfunding/NewCrowdfundingTicket";

  export default {
    name: "AsideServicesCrowdfunding",
    components: { NewCrowdfundingTicket, ModalFail, ModalSuccess },
    created () {
      if (this.$route.params.newProject) this.showNewTicketForm();
    },
    data () {
      return {
        newTicketVisible: false,
        successVisible: false,
        failVisible: false
      };
    },
    methods: {
      showNewTicketForm () {
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
