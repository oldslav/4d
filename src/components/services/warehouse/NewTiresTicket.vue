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
      )
        q-step(
          title="Основная информация"
          :done="step > 1"
          :name="1"
          icon="edit"
        )
          .row.q-col-gutter-md
            q-input(v-model="lastname" :label="$t('user.lastName')").col-12.col-sm-6.col-md-4
            q-input(v-model="firstname" :label="$t('user.firstName')").col-12.col-sm-6.col-md-4
            q-input(v-model="patronymic" :label="$t('user.patronymic')").col-12.col-sm-6.col-md-4
          q-separator.q-my-lg
          FilePicker(v-model="passport" :label="$t('entity.files.passportCopy')" :max-files="5")
          q-separator.q-my-lg.full-width
          q-option-group(
            v-model="tireType"
            color="primary"
            inline
            :options="tiresOptions"
          )
          q-stepper-navigation
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Тип хранения"
          :done="step > 2"
          :name="2"
          icon="edit"
        )
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
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.tires.short.price") }}
              template(v-else)
                q-item-section
                  q-item-label {{ $t('entity.services.warehouse.storagePrice.tires.short.label') }}
                q-item-section(side)
                  q-item-label.text-primary {{ $t('entity.services.warehouse.storagePrice.tires.short.price') }}

            q-item(tag="label" v-ripple).q-px-none
              q-item-section(avatar)
                q-radio(v-model="storeOption" val="2" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label {{ $t('entity.services.warehouse.storagePrice.tires.mid.label') }}
                  q-item-label(caption) Платеж осуществляется 1 раз в 6 месяцев
                  q-item-label.text-primary {{ $t('entity.services.warehouse.storagePrice.tires.mid.price') }}
                  q-item-label(caption) {{ $t('entity.services.warehouse.storagePrice.tires.mid.caption') }}
              template(v-else)
                q-item-section
                  q-item-label {{ $t('entity.services.warehouse.storagePrice.tires.mid.label') }}
                  q-item-label(caption) Платеж осуществляется 1 раз в 6 месяцев
                q-item-section(side)
                  q-item-label.text-primary {{ $t('entity.services.warehouse.storagePrice.tires.mid.price') }}
                  q-item-label(caption) {{ $t('entity.services.warehouse.storagePrice.tires.mid.caption') }}

            q-item(tag="label" v-ripple).q-px-none
              q-item-section(avatar)
                q-radio(v-model="storeOption" val="3" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label {{ $t('entity.services.warehouse.storagePrice.tires.long.label') }}
                  q-item-label(caption) Платеж осуществляется 1 раз в 11 месяцев
                  q-item-label.text-primary {{ $t('entity.services.warehouse.storagePrice.tires.long.price') }}
                  q-item-label(caption) {{ $t('entity.services.warehouse.storagePrice.tires.long.caption') }}
              template(v-else)
                q-item-section
                  q-item-label {{ $t('entity.services.warehouse.storagePrice.tires.long.label') }}
                  q-item-label(caption) Платеж осуществляется 1 раз в 11 месяцев
                q-item-section(side)
                  q-item-label.text-primary {{ $t('entity.services.warehouse.storagePrice.tires.long.price') }}
                  q-item-label(caption) {{ $t('entity.services.warehouse.storagePrice.tires.long.caption') }}

          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="red" :label="$t('action.back')")
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Контакты"
          :name="3"
          icon="edit"
        )
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
        tireType: null,
        storeOption: null,
        contacts: {
          phone: null
        }
      };
    },
    computed: {
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
