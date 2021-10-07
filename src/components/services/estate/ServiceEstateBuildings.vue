<template>
  <transition v-if="!currentRowId" name="fade" mode="out-in">
    <BaseTable v-show="!currentRowId" v-if="tableData"
               row-key="id"
               :columns="columns"
               :data="tableData"
               :isLoading="isLoading"
               :getData="getEstate"
               :pagination="tablePagination"
               :filter="filters"
               :expanded.sync="expanded">
      <template #top>
        <div class="row full-width justify-between items-end">
          <div class="row q-gutter-sm col">
            <BaseInput
              v-model="query"
              dense
              class="col-12 col-sm-6 col-md"
              :label="$t('common.search')">
            </BaseInput>
            <BaseSelect
              v-if="types"
              v-model="categoryId"
              :options="types"
              clearable
              class="col-12 col-sm-6 col-md-3"
              :label="$t('common.type')"
              optionKey="value"
              optionValue="label"
              dense>
            </BaseSelect>
            <BaseSelect
              v-if="statuses"
              v-model="statusId"
              :options="statuses"
              clearable
              class="col-12 col-sm-6 col-md-3"
              :label="$t('common.status')"
              optionKey="value"
              optionValue="label"
              dense>
            </BaseSelect>
          </div>
        </div>
      </template>
      <template #body="props">
        <q-tr :props="props" class="cursor-pointer" @click.stopPropagation="toDetails(props.row.id)">
          <q-td key="id" :props="props">
            <span>
              {{ props.row.id }}
            </span>
          </q-td>
          <q-td key="name" :props="props">
            <span>
              {{ props.row.name }}
            </span>
          </q-td>
          <q-td key="address" :props="props">
            <span>
              {{ `${ props.row.address.street } ${ props.row.address.house || "" }` }}
            </span>
          </q-td>
          <q-td key="category" :props="props">
            <span>
              {{ props.row.infrastructureType }}
            </span>
          </q-td>
          <q-td key="updatedAt" :props="props">
            <span>
              {{ moment(props.row.updatedAt || props.row.createdAt).fromNow() }}
            </span>
          </q-td>
          <q-td key="menu" :props="props" auto-width>
            <q-btn flat round dense icon="more_vert" @click.stop>
              <q-menu>
                <q-list>
                  <q-item clickable>
                    <q-item-section no-wrap class="text-red">
                      {{ $t("action.showOnMap") }}
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section no-wrap @click="toDetails(props.row.id)">
                      {{ $t("action.details") }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </BaseTable>
  </transition>
  <transition v-else name="fade" mode="out-in">
    <EstateDetails :id="currentRowId"></EstateDetails>
  </transition>
</template>

<script>
  import BaseTable from "@/components/common/BaseTable";
  import { mapActions, mapGetters, mapState } from "vuex";
  import { mapFields } from "@/plugins/mapFields";
  import { UPDATE_FILTERS, UPDATE_PAGINATION } from "@/store/constants/mutation-constants";
  import { GET_DATA, GET_REFERENCES } from "@/store/constants/action-constants";
  import moment from "moment";
  import BaseSelect from "@/components/common/BaseSelect";
  import BaseInput from "@/components/common/BaseInput";
  import EstateDetails from "@/components/services/estate/EstateDetails";

  export default {
    name: "ServiceEstateBuildings",
    components: { EstateDetails, BaseInput, BaseSelect, BaseTable },
    async created () {
      await this.GET_REFERENCES();
      await this.GET_DATA();
    },
    data () {
      return {
        isDetailsModal: false,
        expanded: [],
        columns: [
          {
            name: "id",
            required: true,
            label: this.$t("common.id"),
            align: "left"
          },
          {
            name: "name",
            required: true,
            label: this.$t("common.nameOf"),
            align: "left"
          },
          {
            name: "address",
            required: true,
            label: this.$t("common.address"),
            align: "left"
          },
          {
            name: "category",
            required: true,
            label: this.$t("common.type"),
            align: "left",
            field: row => row.category.name
          },
          {
            name: "updatedAt",
            required: true,
            label: this.$t("common.updatedAt"),
            align: "left"
          },
          {
            name: "menu",
            align: "right"
          }
        ]
      };
    },
    computed: {
      ...mapState("services/estate/buildings", {
        filters: state => state.filters
      }),

      ...mapGetters("services/estate/buildings", [
        "tablePagination",
        "tableData",
        "types",
        "statuses"
      ]),

      ...mapFields("services/estate/buildings", {
        fields: ["categoryId", "statusId","query"],
        base: "filters",
        mutation: UPDATE_FILTERS
      }),

      ...mapFields("services/estate/buildings", {
        fields: ["limit", "offset"],
        base: "pagination",
        mutation: UPDATE_PAGINATION
      }),

      currentRowId () {
        return this.$route.params.id;
      },

      isLoading () {
        return this.$store.state.wait[`services/estate/buildings/${ GET_DATA }`];
      }
    },
    methods: {
      moment,

      ...mapActions("services/estate/buildings", {
        GET_DATA,
        GET_REFERENCES
      }),

      toDetails (id) {
        this.$router.push({
          name: "gis-services-estate-buildings-details",
          params: {
            id
          }
        });
      },

      async getEstate (props) {
        if (props) {
          const { pagination: { page, rowsPerPage } } = props;

          this.limit = rowsPerPage;
          this.offset = page;
        }

        await this.GET_DATA();
      }
    }
  };
</script>

<style scoped>

</style>
