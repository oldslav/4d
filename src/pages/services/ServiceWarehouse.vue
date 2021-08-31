<template lang="pug">
  div
    ModalFail(v-model="failVisible")
    ModalSuccess(v-model="successVisible")
    NewTiresTicket(v-model="tiresVisible" v-if="tiresVisible" @success="showSuccessPopup" @fail="showFailPopup()")
    NewBikeTicket(v-model="bikeVisible" v-if="bikeVisible" @success="showSuccessPopup" @fail="showFailPopup()")
</template>

<script>
  import { mapMutations, mapGetters } from "vuex";
  import { GET_WAREHOUSE_GEO } from "@/store/constants/action-constants";
  import { SET_CREATE_TICKET, SET_FEATURE_ID } from "@/store/constants/mutation-constants";
  import ModalFail from "components/services/ModalFail";
  import ModalSuccess from "components/services/ModalSuccess";
  import NewTiresTicket from "components/services/warehouse/NewTiresTicket";
  import NewBikeTicket from "components/services/warehouse/NewBikeTicket";
  import BaseMap from "../../components/common/BaseMap";

  export default {
    name: "ServiceWarehouse",
    components: { BaseMap, NewTiresTicket, NewBikeTicket, ModalFail, ModalSuccess },
    preFetch ({ store }) {
      store.commit(`services/${ SET_FEATURE_ID }`, null);
      return store.dispatch(`services/${ GET_WAREHOUSE_GEO }`);
    },
    data () {
      return {
        successVisible: false,
        failVisible: false,
        parkingData: null
      };
    },
    computed: {
      ...mapGetters("services/warehouse", ["getCreateTicket"]),
      tiresVisible: {
        get () {
          return this.getCreateTicket === "tires";
        },
        set () {
          this.SET_CREATE_TICKET(null);
        }
      },
      bikeVisible: {
        get () {
          return this.getCreateTicket === "bike";
        },
        set () {
          this.SET_CREATE_TICKET(null);
        }
      }
    },
    methods: {
      ...mapMutations("services/warehouse", [SET_CREATE_TICKET]),
      showSuccessPopup () {
        this.successVisible = true;
      },
      showFailPopup () {
        this.failVisible = true;
      }
    }
  };
</script>
