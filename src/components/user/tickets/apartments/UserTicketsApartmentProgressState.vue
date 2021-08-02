<template lang="pug">
  div
    q-stepper(
      :value="stepsValue"
      color="primary"
      flat
      animated
    )
      q-step(
        title="Выбор квартиры"
        :done="stepOneDone"
        :name="1"
      )
        .row
          .col-6
            | Вы можете ознакомиться с образцом договора.
          .col-6
            div.text-body1.text-wrap
              | Поздравляем, ваша заявка одобрена!<br><br>Для начала оформления договора выберите квартиру. Обратите внимание, что после бронирования у вас будет 24 часа для осмотра помещения и оплаты. В случае отсутствия оплаты через 24 часа заявка будет отменена автоматически.<br><br>Фонд развития города Иннополис
            div.text-right.q-mt-lg
              q-btn(color="primary" label="Перейти к выбору квартиры" @click="onApartmentChoose")
      q-step(
        title="Осмотр квартиры"
        :done="stepTwoDone"
        :name="2"
      )
        .row
          .col-6
            | Осмотр квартиры
          .col-6
            div.text-right.q-mt-lg
              q-btn(color="primary" label="Квартира осмотрена" @click="onApartmentViewed")
      q-step(
        title="Оплата"
        :done="stepThreeDone"
        :name="3"
      )
        div.text-body1.text-wrap
          | Поздравляем, ваша заявка одобрена!
          | Для начала оформления договора на аренду парковочного места вам нужно внести оплату. В случае, если вы захотите отменить заявку, оплата вернется вам в полном размере.
          | Перед оплатой ознакомьтесь с публичной офертой и примите ее.
          | Обращаем ваше внимание, что согласно публичной оферте действие договора начинается в момент оплаты.
          | Фонд развития города Иннополис.
        div.text-right
          q-btn(
            color="primary"
            label="Перейти к оплате"
            @click="onPay()"
          )
      q-step(
        title="Подписание договора"
        :done="stepFourDone"
        :name="4"
      )
        .row
          .col-6.offset-6.text-wrap
            | Ваш договор готов к подписанию!
            | Вам необходимо подойти в “Фонд развития города Иннополис” для подписания договора и получения ключей.
</template>

<script>
  export default {
    name: "UserTicketsApartmentProgressState",
    props: {
      value: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      stepsValue () {
        if (this.value.id === 11) return 1;
        if (this.value.id === 12) return 2;
        if (this.value.id === 3) return 3;
        if ([5, 6, 7].includes(this.value.id)) return 4;
      },
      stepOneDone () {
        return this.value.id === 12 || this.stepTwoDone;
      },
      stepTwoDone () {
        return this.value.id === 3 || this.stepThreeDone;
      },
      stepThreeDone () {
        return [5, 6, 7].includes(this.value.id) || this.stepFourDone;
      },
      stepFourDone () {
        return this.value.id === 8;
      }
    },
    methods: {
      onApartmentChoose () {
        this.$emit("choose");
      },

      onApartmentViewed () {
        this.$emit("viewed");
      },

      onPay () {
        this.$emit("pay");
      }
    }
  };
</script>
