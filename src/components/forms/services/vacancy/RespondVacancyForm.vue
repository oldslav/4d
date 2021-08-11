<template lang="pug">
  q-stepper.respond-vacancy-form(
    ref="stepper"
    v-model="currentStep"
    color="primary"
    flat
  )
    q-step(
      :done="currentStep > 1"
      :name="1"
      :title="$t('entity.services.vacancies.respondForm.about')"
      icon="o_edit"
    )
      respond-vacancy-about-form(v-model="about" ref="aboutForm")

    q-step(
      :name="2"
      :title="$t('entity.services.vacancies.respondForm.contacts')"
      icon="o_call"
    )
      form-contacts(ref="contactsForm" v-model="contacts")

    template(v-slot:navigation)
      q-stepper-navigation.items-center
          q-btn(
            v-if="currentStep === 2"
            @click="onClickBack()"
            color="primary"
            flat
            label="Назад"
            class="q-mr-sm"
          )
          q-btn(
            @click="onClickNext()"
            color="primary"
            :label="currentStep === 2 ? $t('action.send') : $t('action.continue')"
            unelevated
          )
</template>
<script>
  import { cloneDeep } from "lodash";
  import RespondVacancyAboutForm from "./RespondVacancyAboutForm";
  import FormContacts from "../../../common/form/FormContacts";
  export default {
    components: { FormContacts, RespondVacancyAboutForm },
    data (){
      return {
        currentStep: 1,
        isValidAbout: false,
        about: {},
        contacts: {}
      };
    },

    methods: {
      onClickNext (){
        if (this.currentStep === 1){
          this.submitAbout();
        } else {
          this.submitContacts();
        }
      },

      onClickBack (){
        this.currentStep = 1;
      },

      async submitAbout (){
        const isValid = await this.$refs.aboutForm.validate();
        if (isValid) {
          this.currentStep = 2;
        }
      },

      async submitContacts (){
        const isValid = await this.$refs.contactsForm.validate();

        if (isValid) {
          const value = { contacts: this.contacts, ...this.about };
          this.$emit("submit", cloneDeep(value));
        }
      }
    }
  };
</script>
<style>
.respond-vacancy-form .q-stepper__content .q-panel.scroll {
  overflow: unset;
}
</style>
