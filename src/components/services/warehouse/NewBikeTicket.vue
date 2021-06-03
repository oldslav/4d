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
          title="Тип аренды"
          :done="step > 2"
          :name="2"
          icon="edit"
        )
          .text-medium.q-mb-sm
            | Тип велосипеда
          q-option-group(
            v-model="bikeType"
            color="primary"
            inline
            :options="bikesOptions"
          )
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
                q-radio(v-model="storeOption" val="0" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label 1 месяц
                  q-item-label.text-primary {{ prices.short }} рублей
              template(v-else)
                q-item-section
                  q-item-label 1 месяц
                q-item-section(side)
                  q-item-label.text-primary {{ prices.short }} рублей
            q-item(tag="label" v-ripple).q-px-none
              q-item-section(avatar)
                q-radio(v-model="storeOption" val="1" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label 6 месяцев
                  q-item-label.text-primary {{ prices.mid }} рублей
              template(v-else)
                q-item-section
                  q-item-label 6 месяцев
                q-item-section(side)
                  q-item-label.text-primary {{ prices.mid }} рублей
            q-item(tag="label" v-ripple).q-px-none
              q-item-section(avatar)
                q-radio(v-model="storeOption" val="2" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label 12 месяцев
                  q-item-label.text-primary {{ prices.long }} рублей
              template(v-else)
                q-item-section
                  q-item-label 12 месяцев
                q-item-section(side)
                  q-item-label.text-primary {{ prices.long }} рублей

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
            q-btn(@click="onSubmit()" color="primary" :label="$t('action.submit')")
</template>

<script>
  import BaseModal from "components/common/BaseModal";
  import FormContacts from "components/common/form/FormContacts";
  import FilePicker from "components/common/FilePicker";

  export default {
    name: "NewBikeTicket",
    components: { BaseModal, FormContacts, FilePicker },
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
        bikeType: 0,
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
      bikesOptions () {
        return [
          {
            label: this.$t("entity.services.warehouse.storagePrice.bikes.child.label"),
            value: 0
          },
          {
            label: this.$t("entity.services.warehouse.storagePrice.bikes.adult.label"),
            value: 1
          },
          {
            label: this.$t("entity.services.warehouse.storagePrice.bikes.tandem.label"),
            value: 2
          }
        ];
      },
      prices () {
        if (this.bikeType === 1) {
          return this.adultPrices;
        } else if (this.bikeType === 2) {
          return this.tandemPrices;
        }
        return this.childPrices;
      },
      childPrices () {
        return {
          short: "130",
          mid: "650",
          long: "1300"
        };
      },
      adultPrices () {
        return {
          short: "160",
          mid: "800",
          long: "1600"
        };
      },
      tandemPrices () {
        return {
          short: "200",
          mid: "1000",
          long: "2000"
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
