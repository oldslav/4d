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
        :name="1"
        :done="value.id === 12"
      )
        .text-right.text-body1.text-wrap
          | Для подолжения оформления документов дождитесь, пока заявитель выберет квартиру
      q-step(
        title="Осмотр квартиры"
        :done="value.id === 6"
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
        :done="value.id === 6"
        :name="3"
      )
        .text-right.text-body1.text-wrap
          | Для продолжения оформления документов дождитесь оплаты.
      q-step(
        title="Подписание договора"
        :done="value.id === 8"
        :name="4"
      )
        .row.text-body1
          .col-6
          .col-6
            .q-col-gutter-md
              div
                | Договор подписан.
              div
                | Введите данные договора.
            .q-col-gutter-md
              q-form(@submit.stop.prevent="sendContract()")
                q-input(
                  v-model="contractInfo.number"
                  :rules="[ val => val !== null && val !== '' || '']"
                  :label="$t('user.bills.contractNumber')"
                )
                .row.q-col-gutter-sm
                  .col-6
                    q-input(
                      ref="date"
                      filled
                      v-model="contractInfo.startDate"
                      :label="$t('user.bills.dateContractConcluded')"
                      lazy-rules
                      :rules="[ val => val !== null && val !== '' || '']"
                      @click="$refs.qDateConcludedProxy.show()"
                    )
                      template(v-slot:append)
                        q-icon(name="event" class="cursor-pointer")
                          q-popup-proxy(ref="qDateConcludedProxy")
                            q-date(
                              v-model="contractInfo.startDate"
                              :mask="'YYYY-MM-DD'"
                              @input="$refs.qDateConcludedProxy.hide()"
                            )
                  .col-6
                    q-input(
                      ref="date"
                      filled
                      v-model="contractInfo.endDate"
                      :label="$t('user.bills.dateContractExpire')"
                      lazy-rules
                      :rules="[ val => val !== null && val !== '' || '']"
                      @click="$refs.qDateExpireProxy.show()"
                    )
                      template(v-slot:append)
                        q-icon(name="event" class="cursor-pointer")
                          q-popup-proxy(ref="qDateExpireProxy")
                            q-date(
                              v-model="contractInfo.endDate"
                              :mask="'YYYY-MM-DD'"
                              @input="$refs.qDateExpireProxy.hide()"
                            )
                .text-right
                  q-btn(color="primary" label="Далее" type="submit" :disabled="!contractValid")
</template>

<script>
  export default {
    name: "ApartmentTicketEmployeeFlow",
    props: {
      value: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        contractInfo: {
          number: null,
          startDate: null,
          endDate: null
        }
      };
    },
    computed: {
      stepsValue () {
        if (this.value.id === 11) return 1;
        if (this.value.id === 12) return 2;
        if (this.value.id === 3) return 3;
        if ([5, 6, 7].includes(this.value.id)) return 4;
      },
      contractValid () {
        return Object.values(this.contractInfo).every((v) => !!v);
      }
    },
    methods: {
      sendContract () {
        this.$emit("contract", this.contractInfo);
      }
    }
  };
</script>
