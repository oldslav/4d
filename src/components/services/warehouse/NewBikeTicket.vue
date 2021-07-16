<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal()"
  )
    q-card.modal-container
      q-stepper(
        keep-alive
        ref="stepper"
        v-model="step"
        color="primary"
        contracted
        flat
        animated
      )
        q-step(
          title="Основная информация"
          :done="step > 1"
          :error="!mainInfoDone && step > 1"
          :name="1"
          icon="edit"
        )
          FormName(v-model="name")
          MyDocumentsForm(v-model="documents" is-local)
          q-stepper-navigation
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Тип аренды"
          :done="step > 2"
          :error="!optionsDone && step > 2"
          :name="2"
          icon="pedal_bike"
        )
          .text-medium.q-mb-sm
            | {{ $t("entity.services.warehouse.bikeType") }}
          q-option-group(
            v-model="serviceOption.serviceTypeId"
            color="primary"
            inline
            :options="bikesOptions"
          )
          .text-medium.q-mb-sm.q-mt-md
            | {{ $t("entity.services.warehouse.storageTypes.title") }}
          .text-small
            | {{ $t("entity.services.warehouse.storageTypes.subtitle.top") }}
            br
            | {{ $t("entity.services.warehouse.storageTypes.subtitle.bottom") }}
          q-list.q-mt-md
            q-item(tag="label" v-ripple).q-px-none
              q-item-section(avatar)
                q-radio(v-model="serviceOption.storagePeriod" val="1" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label {{ $t("entity.services.warehouse.month.one") }}
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.short}) }}
              template(v-else)
                q-item-section
                  q-item-label {{ $t("entity.services.warehouse.month.one") }}
                q-item-section(side)
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.short}) }}
            q-item(tag="label" v-ripple).q-px-none
              q-item-section(avatar)
                q-radio(v-model="serviceOption.storagePeriod" val="6" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label {{ $t("entity.services.warehouse.month.six") }}
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.mid}) }}
              template(v-else)
                q-item-section
                  q-item-label {{ $t("entity.services.warehouse.month.six") }}
                q-item-section(side)
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.mid}) }}
            q-item(tag="label" v-ripple).q-px-none
              q-item-section(avatar)
                q-radio(v-model="serviceOption.storagePeriod" val="12" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label {{ $t("entity.services.warehouse.month.twelve") }}
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.long}) }}
              template(v-else)
                q-item-section
                  q-item-label {{ $t("entity.services.warehouse.month.twelve") }}
                q-item-section(side)
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.long}) }}

          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="red" :label="$t('action.back')")
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Контакты"
          :name="3"
          icon="call"
        )
          FormContacts(v-model="contacts")
          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="red" :label="$t('action.back')")
            q-btn(@click="onSubmit()" color="primary" :disable="!formDone" :label="$t('action.submit')")
      q-inner-loading(:showing="isLoading")
        q-spinner(size="50px" color="primary")
</template>

<script>
  import WarehouseTicketMixin from "components/services/warehouse/WarehouseTicketMixin";
  import BaseModal from "components/common/BaseModal";
  import FormContacts from "components/common/form/FormContacts";
  import FilePicker from "components/common/FilePicker";
  import FormName from "components/common/form/FormName";
  import MyDocumentsForm from "components/forms/documents/MyDocumentsForm";

  export default {
    name: "NewBikeTicket",
    mixins: [WarehouseTicketMixin],
    components: { MyDocumentsForm, FormName, BaseModal, FormContacts, FilePicker },
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
        if (this.serviceOption.serviceTypeId === 5) {
          return this.adultPrices;
        } else if (this.serviceOption.serviceTypeId === 6) {
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
