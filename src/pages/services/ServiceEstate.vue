<template>
  <q-page class="q-pa-lg bg-white">
    <BaseTable v-if="tableData"
               row-key="id"
               :columns="columns"
               :data="tableData"
               :isLoading="isLoading"
               :getData="getEstate"
               :pagination="tablePagination"
               :filter="filters"
               :expanded.sync="expanded">
      <template #top>
        <div class="row q-gutter-sm full-width justify-end">
          <BaseInput
            v-model="query"
            dense
            class="col-12 col-sm-6 col-md"
            label="Поиск">
          </BaseInput>
          <BaseSelect
            v-if="infrastructureTypes"
            v-model="categoryId"
            :options="infrastructureTypes"
            clearable
            class="col-12 col-sm-6 col-md-3"
            label="Тип"
            dense>
          </BaseSelect>
        </div>
      </template>
      <template #body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            <span>
              {{ props.row.id }}
            </span>
          </q-td>
          <q-td key="name" :props="props">
            <span>
              {{ props.row.house }}
            </span>
          </q-td>
          <q-td key="street" :props="props">
            <span>
              {{ props.row.street }}
            </span>
          </q-td>
          <q-td key="category" :props="props">
            <span>
              {{ props.row.infrastructureType }}
            </span>
          </q-td>
          <q-td key="createdAt" :props="props">
            <span>
              {{ moment(props.row.created).fromNow() }}
            </span>
          </q-td>
        </q-tr>
      </template>
    </BaseTable>
  </q-page>
</template>

<script>
  import BaseTable from "../../components/common/BaseTable";
  import { mapActions, mapGetters, mapState } from "vuex";
  import { mapFields } from "../../plugins/mapFields";
  import { UPDATE_FILTERS, UPDATE_PAGINATION } from "../../store/constants/mutation-constants";
  import { GET_DATA, GET_REFERENCES } from "../../store/constants/action-constants";
  import moment from "moment";
  import BaseSelect from "../../components/common/BaseSelect";
  import BaseInput from "../../components/common/BaseInput";

  export default {
    name: "ServiceEstate",
    components: { BaseInput, BaseSelect, BaseTable },
    async created () {
      await this.GET_REFERENCES();
      await this.GET_DATA();
    },
    data () {
      return {
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
            name: "street",
            required: true,
            label: this.$t("common.street"),
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
            name: "createdAt",
            required: true,
            label: this.$t("common.createdAt"),
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
      ...mapState("services/estate", {
        filters: state => state.filters
      }),

      ...mapGetters("services/estate", [
        "tablePagination",
        "tableData",
        "infrastructureTypes"
      ]),

      ...mapFields("services/estate", {
        fields: ["categoryId", "query"],
        base: "filters",
        mutation: UPDATE_FILTERS
      }),

      ...mapFields("services/estate", {
        fields: ["limit", "offset"],
        base: "pagination",
        mutation: UPDATE_PAGINATION
      }),

      isLoading () {
        return this.$store.state.wait[`services/estate/${ GET_DATA }`];
      }
    },
    methods: {
      moment,

      ...mapActions("services/estate", {
        GET_DATA,
        GET_REFERENCES
      }),

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
