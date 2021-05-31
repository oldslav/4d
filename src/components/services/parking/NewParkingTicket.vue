<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
  )
    q-card.modal-container
      q-stepper(
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
          :error="!isUserInfo && step > 1"
          :name="1"
          icon="edit"
        )
          div.row.q-col-gutter-md
            BaseInput(v-model="lastname" :label="$t('user.lastName')" clearable).col-12.col-sm-6.col-md-4
            BaseInput(v-model="firstname" :label="$t('user.firstName')" clearable).col-12.col-sm-6.col-md-4
            BaseInput(v-model="patronymic" :label="$t('user.patronymic')" clearable).col-12.col-sm-6.col-md-4
          FilePicker(:max-files="5" v-model="passport" :label="$t('entity.files.passportCopy')").q-mt-sm
          FilePicker(v-model="snils" :label="$t('entity.files.snilsCopy')").q-mt-sm

          q-stepper-navigation
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Данные об авто"
          :done="step > 2"
          :error="!isUserInfo && step > 2"
          :name="2"
          icon="directions_car"
        )
          VehicleForm(v-model="auto" unmanaged)
          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="red" :label="$t('action.back')")
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Срок аренды"
          :done="step > 3"
          :error="!isUserInfo && step > 3"
          :name="3"
          icon="schedule"
        )
          p
            | {{ $t("entity.services.parking.rentTypes.description") }}

          q-list
            q-item(tag="label" v-ripple)
              q-item-section(avatar)
                q-radio(v-model="rentOption" val="1" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label {{ $t("entity.services.parking.rentTypes.short.title") }}
                  q-item-label.text-primary {{ $t("entity.services.parking.rentTypes.short.price.title") }}
              template(v-else)
                q-item-section
                 q-item-label {{ $t("entity.services.parking.rentTypes.short.title") }}
                q-item-section(side)
                  q-item-label.text-primary {{ $t("entity.services.parking.rentTypes.short.price.title") }}

            q-item(tag="label" v-ripple)
              q-item-section(avatar)
                q-radio(v-model="rentOption" val="2" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label {{ $t("entity.services.parking.rentTypes.mid.title") }}
                  q-item-label(caption) {{ $t("entity.services.parking.rentTypes.mid.description") }}
                  q-item-label.text-primary {{ $t("entity.services.parking.rentTypes.mid.price.title") }}
                  q-item-label(caption).text-primary {{ $t("entity.services.parking.rentTypes.mid.price.description") }}
              template(v-else)
                q-item-section
                  q-item-label {{ $t("entity.services.parking.rentTypes.mid.title") }}
                  q-item-label(caption) {{ $t("entity.services.parking.rentTypes.mid.description") }}
                q-item-section(side)
                  q-item-label.text-primary {{ $t("entity.services.parking.rentTypes.mid.price.title") }}
                  q-item-label(caption).text-primary {{ $t("entity.services.parking.rentTypes.mid.price.description") }}

            q-item(tag="label" v-ripple)
              q-item-section(avatar)
                q-radio(v-model="rentOption" val="3" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label {{ $t("entity.services.parking.rentTypes.long.title") }}
                  q-item-label(caption) {{ $t("entity.services.parking.rentTypes.long.description") }}
                  q-item-label.text-primary {{ $t("entity.services.parking.rentTypes.long.price.title") }}
                  q-item-label(caption).text-primary {{ $t("entity.services.parking.rentTypes.long.price.description") }}
              template(v-else)
                q-item-section
                  q-item-label {{ $t("entity.services.parking.rentTypes.long.title") }}
                  q-item-label(caption) {{ $t("entity.services.parking.rentTypes.long.description") }}
                q-item-section(side)
                  q-item-label.text-primary {{ $t("entity.services.parking.rentTypes.long.price.title") }}
                  q-item-label(caption).text-primary {{ $t("entity.services.parking.rentTypes.long.price.description") }}

          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="red" :label="$t('action.back')")
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Контакты"
          :done="step > 4"
          :error="!isUserInfo && step > 4"
          :name="4"
          icon="contact_phone"
        )
          FormContacts(v-model="contacts")

          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="red" :label="$t('action.back')")
            q-btn(@click="createParkingTicket" color="primary" :label="$t('action.create')" :disable="!isValid")
</template>

<script>
  import BaseInput from "../../common/BaseInput";
  import BaseModal from "../../common/BaseModal";
  import FilePicker from "../../common/FilePicker";
  import VehicleForm from "../../forms/documents/VehicleForm";
  import Vehicles from "../../user/documents/Vehicles";

  export default {
    name: "NewParkingTicket",
    components: { VehicleForm, Vehicles, BaseInput, FilePicker, BaseModal },
    props: {
      value: {
        type: Boolean,
        required: true
      },
      parkingPlaceId: {
        type: [String, Number],
        required: true
      }
    },
    data () {
      return {
        step: 1,
        neighbors: {},
        firstname: null,
        lastname: null,
        patronymic: null,
        passport: null,
        snils: null,
        auto: {
          type: null,
          brand: null,
          model: null,
          number: null,
          documents: {
            sts: [],
            pts: []
          }
        },
        contacts: {
          phone: null
        },
        telegram: null,
        rentOption: null
      };
    },
    computed: {
      isMobile () {
        return this.$q.platform.is.mobile;
      },

      isValid () {
        return this.isUserInfo && this.isCarInfo;
      },

      isCarInfo () {
        return !!this.firstname
          && !!this.lastname
          && !!this.auto;
      },

      isUserInfo () {
        return !!this.firstname
          && !!this.lastname
          && !!this.auto;
      }
    },
    methods: {
      createParkingTicket () {
        this.updateModal(true);
      },

      toggleModal (value) {
        this.$emit("input", value);
        this.updateModal(value);
      },

      updateModal (value) {
        this.$emit("update", value);
      }
    }
  };
</script>

<style scoped>

</style>
