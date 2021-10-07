<template>
  <transition v-if="!currentRowId" name="fade" mode="out-in">
    <BaseTable v-show="!currentRowId" v-if="tableData"
               row-key="id"
               :columns="columns"
               :data="tableData"
               :isLoading="isLoading"
               :getData="getData"
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
              v-if="infrastructureTypes"
              v-model="typeId"
              :options="infrastructureTypes"
              clearable
              class="col-12 col-sm-6 col-md-3"
              :label="$t('common.type')"
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
              {{ formatEmptyString(props.row.name && props.row.name.name) }}
            </span>
          </q-td>
          <q-td key="material" :props="props">
            <span>
              {{ formatEmptyString(props.row.material && props.row.material.name) }}
            </span>
          </q-td>
          <q-td key="type" :props="props">
            <span>
              {{ formatEmptyString(props.row.type && props.row.type.name) }}
            </span>
          </q-td>
          <q-td key="installedYear" :props="props">
            <span>
              {{ props.row.installedYear }}
            </span>
          </q-td>
          <q-td key="updatedAt" :props="props">
            <span>
              {{ moment(props.row.updatedAt || props.row.created).format("DD.MM.YYYY") }}
            </span>
          </q-td>
          <q-td key="menu" :props="props" auto-width>
            <q-btn flat round dense icon="more_vert" @click.stop>
              <q-menu>
                <q-list>
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
    <ServiceTransportDetails :id="currentRowId"></ServiceTransportDetails>
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
  import ServiceTransportDetails from "@/components/services/transport/ServiceTransportDetails";

  export default {
    name: "ServiceTransportNavigation",
    components: { ServiceTransportDetails, BaseInput, BaseSelect, BaseTable },
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
            name: "material",
            required: true,
            label: this.$t("common.material"),
            align: "left"
          },
          {
            name: "type",
            required: true,
            label: this.$t("common.type"),
            align: "left"
          },
          {
            name: "installedYear",
            required: true,
            label: this.$t("common.installedYear"),
            align: "left"
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
      ...mapState("services/transport/navigation", {
        filters: state => state.filters
      }),

      ...mapGetters("services/transport/navigation", [
        "tablePagination",
        "tableData",
        "infrastructureTypes"
      ]),

      ...mapFields("services/transport/navigation", {
        fields: ["typeId", "query"],
        base: "filters",
        mutation: UPDATE_FILTERS
      }),

      ...mapFields("services/transport/navigation", {
        fields: ["limit", "offset"],
        base: "pagination",
        mutation: UPDATE_PAGINATION
      }),

      currentRowId () {
        return this.$route.params.id;
      },

      isLoading () {
        return this.$store.state.wait[`services/transport/navigation/${ GET_DATA }`];
      }
    },
    methods: {
      moment,

      formatEmptyString (str) {
        return str || this.$t("common.noData");
      },

      ...mapActions("services/transport/navigation", {
        GET_DATA,
        GET_REFERENCES
      }),

      toDetails (id) {
        this.$router.push({
          name: "gis-services-transport-navigation-details",
          params: {
            id
          }
        });
      },

      async getData (props) {
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
