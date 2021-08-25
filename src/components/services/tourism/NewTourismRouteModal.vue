<template lang="pug">
  BaseModal.q-pa-xs-none(
    :value="value"
    position="standard"
    persistent
    @input="toggleModal"
  )
    q-card.full-width.new-tourism-route-card
      q-inner-loading(style="z-index: 2" :showing="isLoading" color="white")
        q-spinner(color="primary" size="3em")

      q-card-section.row.items-center
        .text-medium
          | {{ $t('entity.services.tourism.offerForm.title') }}
        q-space
        q-btn(icon="close" flat round dense v-close-popup)

      q-separator

      q-card-section
        TourismRouteForm(
          ref="form"
          v-model="route"
          :valid.sync="isValidForm"
          @submit="onSubmitForm"
        )

      q-card-actions(align="right")
        q-btn(
          :label="$t('action.cancel')"
          color="primary"
          flat
          v-close-popup
          unelevated
        )
        q-btn.q-ml-md(
          :label="$t('action.send')"
          :disabled="!isValidForm"
          @click="onSubmitForm"
          color="primary"
          unelevated
        )
</template>

<script>
  import { mapActions } from "vuex";
  import { OFFER_TOURISM_ROUTE } from "../../../store/constants/action-constants";
  import BaseModal from "../../common/BaseModal";
  import TourismRouteForm from "../../forms/services/tourism/TourismRouteForm";

  export default {
    name: "NewTourismRouteModal",
    components: { BaseModal, TourismRouteForm },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data (){
      return {
        route: {},
        isValidForm: false
      };
    },
    computed:{
      isLoading (){
        return this.$store.state.wait[`services/tourism/${ OFFER_TOURISM_ROUTE }`];
      }
    },

    methods: {
      ...mapActions("services/tourism",{
        offerRoute: OFFER_TOURISM_ROUTE
      }),
      toggleModal (val) {
        this.$emit("input", val);
      },

      close (){
        this.toggleModal(false);
      },

      onSubmitForm: async function () {
        try {
          await this.offerRoute(this.route);
          this.close();
          this.$q.notify({ type: "positive", message: this.$t("entity.services.tourism.offerForm.offerSuccess") });
        } catch (e) {
          this.$q.notify({ type: "negative", message: this.$t("entity.services.tourism.offerForm.offerError") });
        }
      }
    }
  };
</script>

<style scoped>
.new-tourism-route-card {
  max-width: 472px;
}
</style>
