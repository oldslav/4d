<template lang="pug">
  div
    q-stepper.bg-blue(
      :value="stepsValue"
      color="primary"
      flat
      animated
    )
      q-step(
        title="Выбор квартиры"
        :name="1"
        :done="stepOneDone"
      )
        .text-right.text-body1.text-wrap
          | Для подолжения оформления документов дождитесь, пока заявитель выберет квартиру
      q-step(
        title="Осмотр квартиры"
        :done="stepTwoDone"
        :name="2"
      )
        .row.text-body1.text-wrap
          .col-6
          .col-6.text-left.q-col-gutter-md
            div
              | Заявитель выбрал квартиру
            div
              | Для продолжения оформления документов дождитесь ответа заявителя.
      q-step(
        title="Оплата"
        :done="stepThreeDone"
        :name="3"
      )
        .text-right.text-body1.text-wrap
          | Для продолжения оформления документов дождитесь оплаты.
      q-step(
        title="Подписание договора"
        :done="stepFourDone"
        :name="4"
      )
        .row
          .col-6.offset-6
            .q-col-gutter-md.text-body1
              div
                | Договор подписан.
              div
                | Введите данные договора.
              FormContract(
                @submit="sendContract"
                :start="value.updated"
                :termless="!value.fixedTermContract"
              )
</template>

<script>
  import FormContract from "components/common/form/FormContract";

  export default {
    name: "ApartmentTicketEmployeeFlow",
    components: { FormContract },
    props: {
      value: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      stepsValue () {
        if (this.value.status.id === 11) return 1;
        if (this.value.status.id === 12) return 2;
        if (this.value.status.id === 3) return 3;
        if ([5, 6, 7].includes(this.value.status.id)) return 4;
      },
      stepOneDone () {
        return this.value.status.id === 12 || this.stepTwoDone;
      },
      stepTwoDone () {
        return this.value.status.id === 3 || this.stepThreeDone;
      },
      stepThreeDone () {
        return [5, 6, 7].includes(this.value.status.id) || this.stepFourDone;
      },
      stepFourDone () {
        return this.value.status.id === 8;
      }
    },
    methods: {
      sendContract (contract) {
        this.$emit("contract", contract);
      }
    }
  };
</script>
