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
            q-input(v-model="name.lastname" :label="$t('user.lastName')").col-12.col-sm-6.col-md-4
            q-input(v-model="name.firstname" :label="$t('user.firstName')").col-12.col-sm-6.col-md-4
            q-input(v-model="name.patronymic" :label="$t('user.patronymic')").col-12.col-sm-6.col-md-4
          q-separator.q-my-lg
          FilePicker(v-model="documents.passport" :label="$t('entity.files.passportCopy')" :max-files="5")
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
            v-model="serviceOption.serviceTypeId"
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
                q-radio(v-model="serviceOption.storagePeriod" val="1" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label 1 месяц
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.short}) }}
              template(v-else)
                q-item-section
                  q-item-label 1 месяц
                q-item-section(side)
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.short}) }}
            q-item(tag="label" v-ripple).q-px-none
              q-item-section(avatar)
                q-radio(v-model="serviceOption.storagePeriod" val="6" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label 6 месяцев
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.mid}) }}
              template(v-else)
                q-item-section
                  q-item-label 6 месяцев
                q-item-section(side)
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.mid}) }}
            q-item(tag="label" v-ripple).q-px-none
              q-item-section(avatar)
                q-radio(v-model="serviceOption.storagePeriod" val="12" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label 12 месяцев
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.long}) }}
              template(v-else)
                q-item-section
                  q-item-label 12 месяцев
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
            q-btn(@click="onSubmit()" color="primary" :label="$t('action.submit')")
      q-inner-loading(:showing="isLoading")
        q-spinner(size="50px" color="primary")
</template>

<script>
  import WarehouseMixin from "components/services/warehouse/WarehouseMixin";
  import BaseModal from "components/common/BaseModal";
  import FormContacts from "components/common/form/FormContacts";
  import FilePicker from "components/common/FilePicker";

  export default {
    name: "NewBikeTicket",
    mixins: [WarehouseMixin],
    components: { BaseModal, FormContacts, FilePicker },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        serviceOption: {
          serviceId: 2,
          serviceTypeId: 4,
          storagePeriod: null
        }
      };
    },
    computed: {
      bikesOptions () {
        return [
          {
            label: this.$t("entity.services.warehouse.storagePrice.bikes.child.label"),
            value: 4
          },
          {
            label: this.$t("entity.services.warehouse.storagePrice.bikes.adult.label"),
            value: 5
          },
          {
            label: this.$t("entity.services.warehouse.storagePrice.bikes.tandem.label"),
            value: 6
          }
        ];
      },
      prices () {
        if (this.serviceTypeId === 1) {
          return this.adultPrices;
        } else if (this.serviceTypeId === 2) {
          return this.tandemPrices;
        }
        return this.childPrices;
      },
      childPrices () {
        return {
          short: 130,
          mid: 650,
          long: 1300
        };
      },
      adultPrices () {
        return {
          short: 160,
          mid: 800,
          long: 1600
        };
      },
      tandemPrices () {
        return {
          short: 200,
          mid: 1000,
          long: 2000
        };
      }
    }
  };
</script>
