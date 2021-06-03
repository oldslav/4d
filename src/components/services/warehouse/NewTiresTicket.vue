<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal()"
  )
    q-card.modal-container
      q-stepper(
        ref="stepper"
        v-model="step"
        color="primary"
        contracted
        flat
        animated
        header-class="modal-header"
      )
        q-step(
          title="Основная информация"
          :done="step > 1"
          :name="1"
          icon="edit"
        )
          .text-medium.q-mb-sm
            | Основная информация
          .row.q-col-gutter-md
            q-input(v-model="lastname" :label="$t('user.lastName')").col-12.col-sm-6.col-md-4
            q-input(v-model="firstname" :label="$t('user.firstName')").col-12.col-sm-6.col-md-4
            q-input(v-model="patronymic" :label="$t('user.patronymic')").col-12.col-sm-6.col-md-4
          q-separator.q-my-lg
          FilePicker(v-model="passport" :label="$t('entity.files.passportCopy')" :max-files="5")
          q-stepper-navigation
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Тип хранения"
          :done="step > 2"
          :name="2"
          icon="edit"
        )
          .text-medium.q-mb-sm
            | Радиус колеса
          q-option-group(
            v-model="tireType"
            color="primary"
            inline
            :options="tiresOptions"
            dense
          ).q-mt-md
          q-separator.q-my-lg
          .text-medium.q-mb-sm
            | Тип хранения
          .text-small
            | Выберите один из предложенных типов хранения.
            br
            | От типа хранения зависит только периодичность оплаты сервиса.
          q-list.q-mt-md
            q-item(tag="label" v-ripple).q-px-none
              q-item-section(avatar)
                q-radio(v-model="storeOption" val="1" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label {{ $t("entity.services.warehouse.storagePrice.tires.short.label") }}
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.short}) }}
              template(v-else)
                q-item-section
                  q-item-label {{ $t("entity.services.warehouse.storagePrice.tires.short.label") }}
                q-item-section(side)
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.short}) }}

            q-item(tag="label" v-ripple).q-px-none
              q-item-section(avatar)
                q-radio(v-model="storeOption" val="2" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label {{ $t("entity.services.warehouse.storagePrice.tires.mid.label") }}
                  q-item-label(caption) Платеж осуществляется 1 раз в 6 месяцев
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.mid}) }}
              template(v-else)
                q-item-section
                  q-item-label {{ $t("entity.services.warehouse.storagePrice.tires.mid.label") }}
                  q-item-label(caption) Платеж осуществляется 1 раз в 6 месяцев
                q-item-section(side)
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.mid}) }}

            q-item(tag="label" v-ripple).q-px-none
              q-item-section(avatar)
                q-radio(v-model="storeOption" val="3" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label {{ $t("entity.services.warehouse.storagePrice.tires.long.label") }}
                  q-item-label(caption) Платеж осуществляется 1 раз в 12 месяцев
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.long}) }}
              template(v-else)
                q-item-section
                  q-item-label {{ $t("entity.services.warehouse.storagePrice.tires.long.label") }}
                  q-item-label(caption) Платеж осуществляется 1 раз в 12 месяцев
                q-item-section(side)
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.long}) }}

          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="red" :label="$t('action.back')")
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Контакты"
          :name="3"
          icon="edit"
        )
          .text-medium.q-mb-sm
            | Контакты
          FormContacts(v-model="contacts")
          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="red" :label="$t('action.back')")
            q-btn(@click="onSubmit()" color="primary" :label="$t('action.submit')")
</template>

<script>
  import BaseModal from "components/common/BaseModal";
  import FilePicker from "components/common/FilePicker";
  import FormContacts from "components/common/form/FormContacts";

  export default {
    name: "NewTiresTicket",
    components: { FilePicker, BaseModal, FormContacts },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        step: 1,
        firstname: "",
        lastname: "",
        patronymic: "",
        passport: null,
        tireType: 0,
        storeOption: null,
        contacts: {
          phone: null
        }
      };
    },
    computed: {
      isMobile () {
        return this.$q.platform.is.mobile;
      },
      tiresOptions () {
        return [
          {
            label: "R10 - R14",
            value: 0
          },
          {
            label: "R15 - R17",
            value: 1
          },
          {
            label: "R18+",
            value: 2
          }
        ];
      },
      prices () {
        if (this.tireType === 1) {
          return this.mediumPrices;
        } else if (this.tireType === 2) {
          return this.largePrices;
        }
        return this.smallPrices;
      },
      smallPrices () {
        return {
          short: 200,
          mid: 1000,
          long: 2000
        };
      },
      mediumPrices () {
        return {
          short: 250,
          mid: 1250,
          long: 2500
        };
      },
      largePrices () {
        return {
          short: 300,
          mid: 1500,
          long: 3000
        };
      }
    },
    methods: {
      toggleModal (value) {
        this.$emit("input", value);
      },
      onSubmit () {
      }
    }
  };
</script>
