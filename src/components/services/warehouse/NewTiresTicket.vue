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
          title="Тип хранения"
          :done="step > 2"
          :name="2"
          icon="edit"
        )
          .text-medium.q-mb-sm
            | {{ $t("entity.service.warehouse.radius") }}
          q-option-group(
            v-model="serviceOption.serviceTypeId"
            color="primary"
            inline
            :options="tiresOptions"
            dense
          ).q-mt-md
          q-separator.q-my-lg
          .text-medium.q-mb-sm
            | {{ $t("entity.service.warehouse.storageTypes.title") }}
          .text-small
            | {{ $t("entity.service.warehouse.storageTypes.subtitle.top") }}
            br
            | {{ $t("entity.service.warehouse.storageTypes.subtitle.bottom") }}
          q-list.q-mt-md
            q-item(tag="label" v-ripple).q-px-none
              q-item-section(avatar)
                q-radio(v-model="serviceOption.storagePeriod" :val="1" dense)
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
                q-radio(v-model="serviceOption.storagePeriod" :val="6" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label {{ $t("entity.services.warehouse.storagePrice.tires.mid.label") }}
                  q-item-label(caption) {{ $t("entity.service.warehouse.storagePrice.schedule.six") }}
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.mid}) }}
              template(v-else)
                q-item-section
                  q-item-label {{ $t("entity.services.warehouse.storagePrice.tires.mid.label") }}
                  q-item-label(caption) {{ $t("entity.service.warehouse.storagePrice.schedule.six") }}
                q-item-section(side)
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.mid}) }}

            q-item(tag="label" v-ripple).q-px-none
              q-item-section(avatar)
                q-radio(v-model="serviceOption.storagePeriod" :val="12" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label {{ $t("entity.services.warehouse.storagePrice.tires.long.label") }}
                  q-item-label(caption) {{ $t("entity.service.warehouse.storagePrice.schedule.twelve") }}
                  q-item-label.text-primary {{ $t("entity.services.warehouse.storagePrice.dynamic", {price: prices.long}) }}
              template(v-else)
                q-item-section
                  q-item-label {{ $t("entity.services.warehouse.storagePrice.tires.long.label") }}
                  q-item-label(caption) {{ $t("entity.service.warehouse.storagePrice.schedule.twelve") }}
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
      q-inner-loading(:showing="isLoading")
        q-spinner(size="50px" color="primary")
</template>

<script>
  import { mapActions } from "vuex";
  import BaseModal from "components/common/BaseModal";
  import FilePicker from "components/common/FilePicker";
  import FormContacts from "components/common/form/FormContacts";
  import { CREATE_USER_TICKET_WAREHOUSE } from "@/store/constants/action-constants";

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
        name: {
          firstname: "",
          lastname: "",
          patronymic: ""
        },
        documents: {
          passport: null
        },
        serviceOption: {
          serviceId: 1,
          serviceTypeId: 1,
          storagePeriod: null
        },
        contacts: {
          phone: null
        }
      };
    },
    computed: {
      isLoading () {
        return this.$store.state.wait[`user/tickets/warehouse/${ CREATE_USER_TICKET_WAREHOUSE }`];
      },
      isMobile () {
        return this.$q.platform.is.mobile;
      },
      tiresOptions () {
        return [
          {
            label: "R10 - R14",
            value: 1
          },
          {
            label: "R15 - R17",
            value: 2
          },
          {
            label: "R18+",
            value: 3
          }
        ];
      },
      prices () {
        if (this.serviceTypeId === 2) {
          return this.mediumPrices;
        } else if (this.serviceTypeId === 3) {
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
      ...mapActions("user/tickets/warehouse", [CREATE_USER_TICKET_WAREHOUSE]),
      toggleModal (value) {
        this.$emit("input", value);
        Object.assign(this.$data, this.$options.data.apply(this)); // default data
      },
      onSubmit () {
        const { name, documents, serviceOption } = this;
        const contacts = {
          phones: [this.contacts.phone]
        }; // временно, пока не решим с контактами
        // eslint-disable-next-line no-console
        console.log("result", { name, documents, contacts, serviceOption });
        return this.CREATE_USER_TICKET_WAREHOUSE({ warehouse: null, name, documents, contacts, serviceOption })
          .then(() => {
            this.$emit("success");
          })
          .catch(() => {
            this.$emit("fail");
          })
          .finally(() => {
            this.toggleModal(false);
          });
      }
    }
  };
</script>
