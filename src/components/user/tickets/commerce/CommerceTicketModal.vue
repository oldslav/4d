<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
  )
    q-card.full-width
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
          :name="1"
          :done="step > 1"
          :error="step > 1 && !stepOneDone"
          icon="edit"
        )
          q-input(v-model="companyName" :label="$t('user.companyName')" :rules="required")
          FormName(v-model="name")
          q-input(v-model="jobPosition" :label="$t('common.position')" :rules="required")
          MyDocumentsForm(v-model="documents" is-local all-required)
          q-stepper-navigation
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          :name="2"
          :done="step > 2"
          :error="step > 2 && !stepTwoDone"
          title="Вид деятельности"
        )
          .text-primary-light.text-body1.q-mb-md
            | Вид деятельности
          q-option-group(:options="options" v-model="pickedActivity")
          q-input(
            v-model="otherActivity"
            dense
            outlined
            :rules="otherActive ? [(val) => !!val] : null"
            :disable="!otherActive"
            :label="$t('entity.tickets.commerce.activityType')"
          ).q-mt-md
          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="primary" :label="$t('action.back')")
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          :name="3"
          title="Контакты"
        )
          FormContacts(v-model="contacts")
          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="primary" :label="$t('action.back')")
            q-btn(@click="onSubmit()" :disable="!formValid" :loading="isLoading" color="primary" :label="$t('action.continue')")
</template>

<script>
  import { cloneDeep } from "lodash";
  import { mapActions, mapGetters } from "vuex";
  import { isDocumentPresent } from "@/util/validators";
  import { CREATE_COMMERCE_TICKET, GET_COMPANY } from "@/store/constants/action-constants";
  import BaseModal from "components/common/BaseModal";
  import FormName from "components/common/form/FormName";
  import MyDocumentsForm from "components/forms/documents/MyDocumentsForm";
  import FormContacts from "components/common/form/FormContacts";

  export default {
    name: "CommerceTicketModal",
    components: { FormContacts, MyDocumentsForm, FormName, BaseModal },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      placeId: {
        type: [Number, String],
        default: null
      }
    },
    async created () {
      await this.GET_COMPANY();
      Object.assign(this.documents, cloneDeep(this.getCompanyCard.documents));
      this.companyName = this.getCompanyCard.name;
    },
    data () {
      return {
        step: 1,
        name: {
          first: null,
          last: null,
          patronymic: null
        },
        contacts: {
          phones: []
        },
        documents: {
          inn_jur: null,
          ogrn: null,
          partner_card: null,
          egrjul: null,
          business_plan: null
        },
        companyName: null,
        pickedActivity: null,
        otherActivity: null,
        jobPosition: null
      };
    },
    computed: {
      ...mapGetters("services", ["getPickedFeatureId"]),
      ...mapGetters("user/company", ["getCompanyCard"]),
      required () {
        return [
          val => !!val
        ];
      },
      stepOneDone () {
        return !!this.name.first && !!this.companyName && !!this.jobPosition && Object.values(this.documents).every(isDocumentPresent);
      },
      stepTwoDone () {
        return !!this.activityType;
      },
      otherActive () {
        return this.pickedActivity === "other";
      },
      formValid () {
        return this.stepOneDone && this.stepTwoDone && !!this.contacts.phones[0];
      },
      activityType () {
        if (!this.otherActive) {
          return this.pickedActivity;
        }
        return this.otherActivity;
      },
      isLoading () {
        return this.$store.state.wait[`user/tickets/commerce/${ CREATE_COMMERCE_TICKET }`];
      },
      options () {
        return [
          {
            label: "Торговля",
            value: "Торговля"
          },
          {
            label: "Предоставление услуг",
            value: "Предоставление услуг"
          },
          {
            label: "Общественное питание",
            value: "Общественное питание"
          },
          {
            label: "Образование",
            value: "Образование"
          },
          {
            label: "Здравоохранение",
            value: "Здравоохранение"
          },
          {
            label: "Деятельность в области культуры, спорта, организации досуга и развлечений",
            value: "Деятельность в области культуры, спорта, организации досуга и развлечений"
          },
          {
            label: "Административная деятельность",
            value: "Административная деятельность"
          },
          {
            label: "Другое",
            value: "other"
          }
        ];
      }
    },
    methods: {
      ...mapActions("user/tickets/commerce", [CREATE_COMMERCE_TICKET]),
      ...mapActions("user/company", [GET_COMPANY]),
      toggleModal (value) {
        this.$emit("input", value);
        Object.assign(this.$data, this.$options.data.apply(this)); // default data
      },
      onSubmit () {
        const { name, contacts, documents, activityType, jobPosition, companyName, placeId } = this;
        const payload = {
          name,
          contacts,
          documents,
          activityType,
          jobPosition,
          companyName
        };
        return this.CREATE_COMMERCE_TICKET({ placeId, payload })
          .then(() => {
            this.$emit("success");
            this.toggleModal(false);
          })
          .catch(() => {
            this.$emit("fail");
          });
      }
    },
    watch: {
      pickedActivity () {
        this.otherActivity = "";
      }
    }
  };
</script>
