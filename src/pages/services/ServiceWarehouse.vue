<template lang="pug">
  q-page.q-pa-lg.bg-white
    q-dialog(v-model="failVisible")
      q-card
        q-card-section.row.items-center.q-pb-none
          .text-primary.text-medium
            | Упс! Произошла ошибка
          q-space
          q-btn(icon="close" flat round dense v-close-popup)
        q-card-section
          | Пожалуйста, повторите попытку позже
    q-dialog(v-model="successVisible")
      q-card
        q-card-section.row.items-center.q-pb-none
          .text-primary.text-medium
            | Спасибо! Ваша заявка успешно отправлена
          q-space
          q-btn(icon="close" flat round dense v-close-popup)
        q-card-section
          | В ближайшее время с вами свяжется представитель фонда развития города Иннополис для уточнения деталей.
          q-separator.q-my-md
          | Отследить статус заявки можно в личном кабинете
        q-card-actions(align="right").q-pa-md
          q-btn(outline color="primary" label="Перейти в личный кабинет")
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
