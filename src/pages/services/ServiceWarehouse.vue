<template lang="pug">
  q-page.q-pa-lg.bg-white
    q-dialog(v-model="failVisible")
      q-card
        q-card-section.row.items-center.q-pb-none
          .text-primary.text-medium
            | {{ $t("common.error.response.oops") }}
          q-space
          q-btn(icon="close" flat round dense v-close-popup)
        q-card-section
          | {{ $t('common.error.response.tryLater') }}
    q-dialog(v-model="successVisible")
      q-card
        q-card-section.row.items-center.q-pb-none
          .text-primary.text-medium
            | {{ $t('user.tickets.messages.create.success.title') }}
          q-space
          q-btn(icon="close" flat round dense v-close-popup)
        q-card-section
          | {{ $t('user.tickets.messages.create.success.label') }}
          q-separator.q-my-md
          | {{ $t('user.tickets.messages.create.success.caption') }}
        q-card-actions(align="right").q-pa-md
          q-btn(outline color="primary" :label="$t('action.toProfile')")
    .row.q-gutter-lg.justify-center
      q-btn(color="primary" label="Шины" @click="showTiresModal()")
      q-btn(color="primary" label="Велосипед" @click="showBikeModal()")
    NewTiresTicket(v-model="tiresVisible" @success="showSuccessPopup" @fail="showFailPopup()")
</template>

<script>
  import NewTiresTicket from "components/services/warehouse/NewTiresTicket";

  export default {
    name: "ServiceWarehouse",
    components: { NewTiresTicket },
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
