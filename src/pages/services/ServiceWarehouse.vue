<template lang="pug">
  q-page.q-pa-lg.bg-white
    q-btn(color="primary" label="Шины" @click="showTiresModal()")
    q-btn(color="primary" label="Велосипед" @click="showBikeModal()")
    NewTiresTicket(v-model="tiresVisible")
    NewBikeTicket(v-model="bikeVisible")
</template>

<script>
  import NewTiresTicket from "components/services/warehouse/NewTiresTicket";
  import NewBikeTicket from "components/services/warehouse/NewBikeTicket";

  export default {
    name: "ServiceWarehouse",
    components: { NewTiresTicket, NewBikeTicket },
    data () {
      return {
        tiresVisible: false,
        bikeVisible: false
      };
    },
    methods: {
      showTiresModal () {
        this.tiresVisible = true;
      },
      showBikeModal () {
        this.bikeVisible = true;
      }
    }
  };
</script>

<style lang="stylus" scoped>

</style>
