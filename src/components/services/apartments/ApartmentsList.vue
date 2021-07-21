<template lang="pug">
  q-layout(view="Lhh lpR fff" container).modal-container__wide
    q-page-container
      q-page
        q-card.q-my-lg
          q-card-section.row.q-col-gutter-md.items-start
            BaseTable(
              v-if="tableData"
              grid
              row-key="id"
              :data="tableData"
              :loading="isLoading"
              :pagination="tablePagination"
              :getData="getApartments"
              card-container-class="cardContainerClass"
            )
              template(v-slot:item="props")
                .col-12.col-sm-6.col-md-6
                  q-card.row.bg-white.q-ma-sm.q-pa-md.apartments-list-item
                    q-card-section.col-12.col-sm-6.col-md-6.full-height
                      q-img(:src="imagePlan(props.row.plan)" :ratio="16/9" contain).full-height
                    q-card-section.col-12.col-sm-6.col-md-6
                      h5.q-mt-none.text-subtitle {{ $t("entity.services.living.apartment") }} № {{ props.row.number }}

                      .info-table
                        q-item(dense).q-pa-none.info-table-item
                          q-item-section
                            | {{ $t("common.quantity.area") }}
                          q-item-section(side)
                            span {{ props.row.number }}

                        q-item(dense).q-pa-none.info-table-item
                          q-item-section
                            | {{ $t("common.quantity.rooms") }}
                          q-item-section(side)
                            span {{ props.row.rooms }}

                        q-item(dense).q-pa-none.info-table-item
                          q-item-section
                            | {{ $t("common.quantity.entrance") }}
                          q-item-section(side)
                            span {{ props.row.entrance }}

                        q-item(dense).q-pa-none.info-table-item
                          q-item-section
                            | {{ $t("common.quantity.floor") }}
                          q-item-section(side)
                            span {{ props.row.floor }}

                      q-separator.q-mt-md

                      q-item(dense).q-pa-none
                        q-item-section.text-primary
                          | {{ $t("common.rentPrice") }}
                        q-item-section(side)
                          span {{ props.row.price }}

                      .row.q-gutter-md.q-mt-sm
                        //q-btn(:label="$t('action.details')" color="primary" outline).col
                        q-btn(
                          :label="$t('action.rent')"
                          color="primary"
                          @click="setTicketApartment(props.row.id)"
                        ).col
</template>

<script>
  import { mapActions, mapGetters, mapState } from "vuex";
  import { mapFields } from "../../../plugins/mapFields";
  import { GET_APARTMENTS, UPDATE_TICKET_APARTMENT } from "../../../store/constants/action-constants";
  import { UPDATE_APARTMENTS_PAGINATION } from "../../../store/constants/mutation-constants";
  import BaseSelect from "../../common/BaseSelect";
  import BaseTable from "../../common/BaseTable";

  export default {
    name: "ApartmentsList",
    components: { BaseSelect, BaseTable },
    props: {
      requestId: {
        type: [Number, String],
        required: true
      },
      buildingId: {
        type: [Number, String],
        default: null
      },
      innerLimit: {
        type: Number,
        default: 6
      },
      innerOffset: {
        type: Number,
        default: 1
      }
    },
    async created () {
      this.limit = this.innerLimit;
      this.offset = this.innerOffset;

      if (this.requestId) {
        await this.getApartments();
      }
    },
    computed: {
      ...mapState("services/apartments", {
        tableData: state => state.data
      }),

      ...mapGetters("services/apartments", [
        "tablePagination"
      ]),

      ...mapFields("services/apartments", {
        fields: ["limit", "offset"],
        base: "pagination",
        mutation: UPDATE_APARTMENTS_PAGINATION
      }),

      isLoading () {
        return this.$store.state.wait[`services/apartments/${ GET_APARTMENTS }`];
      }
    },
    methods: {
      ...mapActions("services/apartments", {
        GET_APARTMENTS
      }),

      ...mapActions("user/tickets/living", {
        UPDATE_TICKET_APARTMENT
      }),

      imagePlan (src) {
        return process.env.SERVER_API_HOST + src;
      },

      async setTicketApartment (apartmentId) {
        await this.UPDATE_TICKET_APARTMENT({ requestId: this.requestId, apartmentId });
        this.$emit("close");
      },

      async getApartments (props) {
        const { requestId, buildingId } = this;
        if (props) {
          const { pagination: { page, rowsPerPage } } = props;

          this.limit = rowsPerPage;
          this.offset = page;
        }

        await this.GET_APARTMENTS({ requestId, buildingId });
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .apartments-list-item
    max-height: 280px

    @media (max-width: $breakpoint-sm-max)
      max-height 500px

  .info-table
    display: grid
    grid-template-columns: 1fr 1fr
    grid-template-rows: 1fr 1fr
    gap: 12px 24px
    grid-template-areas: ". ." ". ."

    @media (max-width: $breakpoint-sm-max)
      display flex
      flex-direction column


    &-item
      min-height: 16px
      height: 16px
</style>
