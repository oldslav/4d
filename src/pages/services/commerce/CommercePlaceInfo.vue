<template lang="pug">
  q-page.q-pa-xl
    q-card.full-width.full-height.q-pa-lg
      .row.full-height
        .col-8
          q-card-section
            .text-h6.q-mb-md
              | {{ $t('entity.services.commerce.premisesNumber', {number: getCurrentPlace.id}) }}
            q-img(:src="imagePlan(getCurrentPlace.plan.imagePath)" :ratio="16/9" contain).full-height
        .col-4
          q-card-section
            .row.items-center.justify-between.no-wrap
              .text-body1
                | {{$t('common.address')}}
              .text-body1.text-primary
                | {{ `${getCurrentPlace.address.street} ${getCurrentPlace.address.house}` }}
            q-separator.q-my-md
            .row.items-center.justify-between
              .text-body1.text-primary-light
                | {{$t("entity.services.commerce.price")}}
              .text-body1
                | {{ actualPrice }}
            .row.items-center.justify-between.q-mt-md
              .text-body1.text-primary-light
                | {{$t("entity.services.commerce.minimalRent")}}
              .text-body1
                | {{ getCurrentPlace.minRentPeriod }}
            q-separator.q-my-md
            .row.items-center.justify-between
              .text-body1.text-primary-light
                | {{$t("entity.services.commerce.area")}}
              .text-body1
                | {{ getCurrentPlace.area }}
            .row.items-center.justify-between.q-mt-md
              .text-body1.text-primary-light
                | {{$t("entity.services.commerce.premisesCount")}}
              .text-body1
                | {{ getCurrentPlace.premisesCount }}
            .row.items-center.justify-between.q-mt-md
              .text-body1.text-primary-light
                | {{$t("entity.services.commerce.ceilingHeight")}}
              .text-body1
                | {{ getCurrentPlace.ceilingHeight }}
      q-card-actions(align="right")
        q-btn(color="primary" :label="$t('action.book')" @click="onBook()").q-px-xl.q-py-sm
    CommerceTicketModal(v-model="modalVisible" :place-id="$route.params.id" v-if="modalVisible" @fail="failVisible = true" @success="successVisible = true")
    ModalFail(v-model="failVisible")
    ModalSuccess(v-model="successVisible")
</template>

<script>
  import { mapGetters } from "vuex";
  import { GET_COMMERCE_PLACE } from "@/store/constants/action-constants";
  import CommerceTicketModal from "components/user/tickets/commerce/CommerceTicketModal";
  import ModalFail from "components/services/ModalFail";
  import ModalSuccess from "components/services/ModalSuccess";

  export default {
    components: { ModalSuccess, ModalFail, CommerceTicketModal },
    preFetch ({ currentRoute, store }) {
      return store.dispatch(`services/commerce/${ GET_COMMERCE_PLACE }`, currentRoute.params.id);
    },
    created () {
      console.log(this.getCurrentPlace);
    },
    data () {
      return {
        modalVisible: false,
        successVisible: false,
        failVisible: false
      };
    },
    computed: {
      ...mapGetters("services/commerce", ["getCurrentPlace"]),
      actualPrice () {
        const { area, rentPrice } = this.getCurrentPlace;
        return Math.ceil(area * rentPrice);
      }
    },
    methods: {
      imagePlan (src) {
        return process.env.SERVER_API_HOST + src;
      },
      onBook () {
        this.modalVisible = true;
      }
    }
  };
</script>
