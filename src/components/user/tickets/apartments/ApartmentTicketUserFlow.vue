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
            DownloadTemplate(name="Образец договора" :path="templatePath" style="max-width: 50%")
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
            | Вы можете ознакомиться с образцом договора.
            DownloadTemplate(name="Образец договора" :path="templatePath" style="max-width: 50%")
          .col-6.text-body1.text-wrap
            | Для осмотра квартиры вы можете связаться с сотрудниками “Фонда развития города Иннополис”<br><br>По телефону +7xxxxxxxxxxxx или в телеграмме @алиас.<br><br>Осмотр квартиры является необязательным, вы можете сразу перейти к оплате.<br><br>Фонд развития города Иннополис
            div.text-right.q-mt-lg
              q-btn(color="primary" label="Квартира осмотрена" @click="onApartmentViewed")
      q-step(
        title="Оплата"
        :done="stepThreeDone"
        :name="3"
      )
        .row
          .col-6
            | Вы можете ознакомиться с образцом договора.
            DownloadTemplate(name="Образец договора" :path="templatePath" style="max-width: 50%")
          .col-6.text-body1.text-wrap
            | Уважаемый {{name}}.<br>
            | Для вас  сформирована задолженность в размере обеспечительного платежа и стоимости одного месяца аренды.<br>
            | Перед оплатой задолженности ознакомьтесь с публичной офертой и примите ее.<br>
            | Обращаем ваше внимание, что согласно публичной оферте действие договора начинается в момент оплаты.<br>
            | Фонд развития города Иннополис
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
          .col-6.text-body1
            | Вы можете ознакомиться с образцом договора.
            DownloadTemplate(name="Образец договора" :path="templatePath" style="max-width: 50%")
          .col-6.text-body1.text-wrap
            | Ваш договор готов к подписанию!<br>
            | Вам необходимо подойти в “Фонд развития города Иннополис” для подписания договора и получения ключей.
            div.q-col-gutter-sm.q-mt-md
              .text-primary-light
                | Адрес
              div
                | г. Иннополис, ул. Спортивная, 112
              .text-primary-light
                | Время работы
              .flex.items-center.justify-between
                div
                  | понедельник - четверг
                div
                  | 9:00 - 18:00
              .flex.items-center.justify-between
                div
                  | пятница
                div
                  | 9:00 - 17:00
              div
                | Если вы хотите отменить заявку, свяжитесь с сотрудниками “Фонда развития города Иннополис” по телефону +7xxxxxxxxxxxx или в телеграмме @алиас<br>
                | Фонд развития города Иннополис
</template>

<script>
  import { mapGetters } from "vuex";
  import DownloadTemplate from "components/user/tickets/DownloadTemplate";

  export default {
    name: "ApartmentTicketUserFlow",
    components: { DownloadTemplate },
    props: {
      value: {
        type: Object,
        default: () => ({})
      },
      name: {
        type: String,
        default: ""
      }
    },
    computed: {
      ...mapGetters(["isUserLegal"]),
      templatePath () {
        return this.isUserLegal ? "/uploads/templates/living_contract_jur_template.pdf" : "/uploads/templates/living_contract_template.pdf";
      },
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
