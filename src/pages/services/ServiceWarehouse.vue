<template lang="pug">
  q-page.q-pa-lg.bg-white
    ModalFail(v-model="failVisible")
    ModalSuccess(v-model="successVisible")
    .row.q-gutter-lg.justify-center
      q-btn(color="primary" label="Шины" @click="showTiresModal()")
      q-btn(color="primary" label="Велосипед" @click="showBikeModal()")
    NewTiresTicket(v-model="tiresVisible" @success="showSuccessPopup" @fail="showFailPopup()")
    NewBikeTicket(v-model="bikeVisible" @success="showSuccessPopup" @fail="showFailPopup()")
</template>

<script>
  import ModalFail from "components/services/ModalFail";
  import ModalSuccess from "components/services/ModalSuccess";
  import NewTiresTicket from "components/services/warehouse/NewTiresTicket";
  import NewBikeTicket from "components/services/warehouse/NewBikeTicket";

  export default {
    name: "ServiceWarehouse",
    components: { NewTiresTicket, NewBikeTicket, ModalFail, ModalSuccess },
    data () {
      return {
        tiresVisible: false,
        bikeVisible: false,
        successVisible: false,
        failVisible: false
      };
    },
    methods: {
      showTiresModal () {
        this.tiresVisible = true;
      },
      showBikeModal () {
        this.bikeVisible = true;
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

<style lang="stylus">

</style>
