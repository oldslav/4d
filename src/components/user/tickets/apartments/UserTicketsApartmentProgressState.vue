<template lang="pug">
  q-stepper(
    :value="stepsValue"
    color="primary"
    flat
    animated
  )
    q-step(
      title="Выбор квартиры"
      :done="value.id === 12"
      :name="1"
    )
      .row
        .col-6
          | Вы можете ознакомиться с образцом договора.
        .col-6
          div.text-body1.text-wrap
            | Поздравляем, ваша заявка одобрена!<br><br>Для начала оформления договора выберите квартиру. Обратите внимание, что после бронирования у вас будет 24 часа для осмотра помещения и оплаты. В случае отсутствия оплаты через 24 часа заявка будет отменена автоматически.<br><br>Фонд развития города Иннополис
          div.text-right.q-mt-lg
            q-btn(color="primary" label="Перейти к выбору квартиры" @click="onChooseApartment")
    q-step(
      title="Осмотр квартиры"
      :done="value.id === 6"
      :name="2"
    )
      | Осмотр квартиры
    q-step(
      title="Оплата"
      :done="value.id === 6"
      :name="3"
    )
      | Оплата
    q-step(
      title="Подписание договора"
      :done="value.id === 8"
      :name="4"
    )
      | Договор
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
      }
    },
    methods: {
      onChooseApartment () {
        this.$emit("choose");
      }
    }
  };
</script>
