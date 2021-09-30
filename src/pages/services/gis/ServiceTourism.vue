<template>
  <transition v-if="!currentRowId" name="fade" mode="out-in">
    <q-page class="q-pa-lg bg-white">
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
            <q-td key="category" :props="props">
              <span>
                {{ props.row.category.name }}
              </span>
            </q-td>
            <q-td key="type" :props="props">
              <span>
                {{ props.row.type.name }}
              </span>
            </q-td>
            <q-td key="condition" :props="props">
              <span>
                {{ props.row.status.description }}
              </span>
            </q-td>
            <q-td key="installedYear" :props="props">
              <span>
                {{ props.row.installedYear }}
              </span>
            </q-td>
            <q-td key="isOn" :props="props" auto-width>
              <template v-if="props.row.lightOn">
                <q-icon name="lightbulb" color="yellow">
                  <q-tooltip>Да будет свет!</q-tooltip>
                </q-icon>
              </template>
              <template v-else>
                <q-icon name="o_lightbulb" :color="props.row.lightOn ? 'yellow' : ''">
                  <q-tooltip>Выключен</q-tooltip>
                </q-icon>
              </template>
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
    </q-page>
  </transition>
  <transition v-else name="fade" mode="out-in">
    <ServiceLightDetails :id="currentRowId"></ServiceLightDetails>
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
  import ServiceLightDetails from "@/components/services/light/ServiceLightDetails";

  export default {
    name: "ServiceTourism",
    components: { ServiceLightDetails, BaseInput, BaseSelect, BaseTable },
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
            name: "category",
            required: true,
            label: this.$t("common.category"),
            align: "left"
          },
          {
            name: "type",
            required: true,
            label: this.$t("common.type"),
            align: "left"
          },
          {
            name: "condition",
            required: true,
            label: this.$t("common.condition"),
            align: "left"
          },
          {
            name: "installedYear",
            required: true,
            label: this.$t("common.installedYear"),
            align: "left"
          },
          {
            name: "isOn",
            required: true,
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
      ...mapState("services/tourism", {
        filters: state => state.filters
      }),

      ...mapGetters("services/tourism", [
        "tablePagination",
        "tableData",
        "infrastructureTypes"
      ]),

      ...mapFields("services/tourism", {
        fields: ["typeId", "query"],
        base: "filters",
        mutation: UPDATE_FILTERS
      }),

      ...mapFields("services/tourism", {
        fields: ["limit", "offset"],
        base: "pagination",
        mutation: UPDATE_PAGINATION
      }),

      currentRowId () {
        return this.$route.params.id;
      },

      isLoading () {
        return this.$store.state.wait[`services/tourism/${ GET_DATA }`];
      }
    },
    methods: {
      moment,

      ...mapActions("services/tourism", {
        GET_DATA,
        GET_REFERENCES
      }),

      toDetails (id) {
        this.$router.push({
          name: "gis-services-tourism-details",
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
