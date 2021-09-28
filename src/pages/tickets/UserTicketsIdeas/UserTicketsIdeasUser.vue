<template lang="pug">
  div
    base-table(
      v-if="tableData"
      row-key="id"
      :columns="columns"
      :data="tableData"
      :isLoading="isLoading"
      :getData="getUserTickets"
      :pagination="tablePagination"
      :expanded.sync="expanded"
    )
      template(v-slot:top)
        .row.full-width.justify-between.items-end(v-if="references")
          .row.q-gutter-sm.col
            BaseInput(
              v-model="computedQuery"
              hideBottom
              :label="$t('common.search')"
            ).col-12.col-sm-6.col-md
            BaseSelect(
              v-model="statusId"
              hideBottom
              :options="references.crowdSourcingStatuses"
              label="Статус"
              clearable
              optionKey="id"
              optionValue="description"
            ).col-12.col-sm-6.col-md-3
            BaseSelect(
              v-model="typeId"
              hideBottom
              :options="references.crowdSourcingTypes"
              label="Тип"
              clearable
              optionKey="id"
              optionValue="description"
            ).col-12.col-sm-6.col-md-3
          q-btn(
            icon="add"
            outline
            color="primary"
            @click="toIdeas"
            :label="$t('user.tickets.actions.create')"
          ).q-ml-sm
      template(v-slot:body="props")
        q-tr(:props="props")
          q-td(key="nameOf" :props="props")
            | {{ props.row.title }}
          q-td(key="type" :props="props")
            | {{ props.row.type.description }}
          q-td(key="date" :props="props")
            | {{ props.row.created | formatDate }}
          q-td(key="status" :props="props")
            | {{ props.row.status.description }}
            //base-status(:value="props.row.status.id")
          q-td(auto-width)
            q-btn(flat round dense icon="more_vert")
              q-menu
                q-list
                  q-item(v-if="props.row.status.id < 3" clickable v-close-popup @click="onCancel(props.row.id)")
                    q-item-section(no-wrap).text-red
                      | {{ $t("action.cancel") }}
                  q-item(clickable v-close-popup @click="openDetails(props.row.id)")
                    q-item-section(no-wrap)
                      | {{ $t("action.details") }}
                  q-item(v-if="[1, 5, 8].some(i => i === props.row.status)" clickable v-close-popup @click="toIdeas({ id: props.row.id })")
                    q-item-section(no-wrap)
                      | {{ $t("action.showOnMap") }}

    BaseModal(
      v-model="isDetailsModal"
      position="standard"
    )
      IdeaDetailsCard(v-if="currentId" :id="currentId")
</template>

<script>
  import BaseTable from "components/common/BaseTable";
  import BaseStatus from "components/common/BaseStatus";
  import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
  import { DELETE_ITEM, GET_DATA, GET_REFERENCES } from "../../../store/constants/action-constants";
  import BaseModal from "../../../components/common/BaseModal";
  import IdeaDetailsCard from "../../../components/services/ideas/IdeaDetailsCard";
  import { mapFields } from "../../../plugins/mapFields";
  import { SET_EMPTY, SET_QUERY, UPDATE_FILTERS, UPDATE_PAGINATION } from "../../../store/constants/mutation-constants";
  import BaseSelect from "../../../components/common/BaseSelect";
  import BaseInput from "../../../components/common/BaseInput";

  export default {
    name: "UserTicketsIdeasUser",
    components: { BaseInput, BaseTable, BaseStatus, BaseModal, IdeaDetailsCard, BaseSelect },
    async created () {
      if (!this.references) {
        await this.GET_REFERENCES();
      }
      this.authorId = this.userId;
    },
    data () {
      return {
        expanded: [],
        currentId: null
      };
    },
    computed: {
      ...mapState({
        userId: state => state.account.account.id
      }),

      ...mapState("services/ideas", {
        references: state => state.references,
        filters: state => state.filters,
        query: state => state.query
      }),

      computedQuery: {
        get () {
          return this.query;
        },

        set (value) {
          this.SET_QUERY(value);
        }
      },

      ...mapGetters("services/ideas", [
        "tableData",
        "tablePagination"
      ]),

      ...mapFields("services/ideas", {
        fields: ["limit", "offset"],
        base: "pagination",
        mutation: UPDATE_PAGINATION
      }),

      ...mapFields("services/ideas", {
        fields: ["statusId", "typeId", "authorId"],
        base: "filters",
        mutation: UPDATE_FILTERS
      }),

      isDetailsModal: {
        isActive: false,

        get () {
          return this.isActive || Boolean(this.currentId);
        },

        set (val) {
          this.isActive = val;
          this.currentId = null;
        }
      },

      columns () {
        return [
          {
            name: "nameOf",
            label: this.$t("common.nameOf"),
            align: "left"
          },
          {
            name: "type",
            label: this.$t("common.type"),
            align: "left"
          },
          {
            name: "date",
            label: this.$t("common.created"),
            align: "left"
          },
          {
            name: "status",
            label: this.$t("common.status"),
            align: "left"
          },
          {
            name: "menu",
            align: "right"
          }
        ];
      },

      isLoading () {
        return this.$store.state.wait[`services/ideas/${ GET_DATA }`] ||
          this.$store.state.wait[`services/ideas/${ DELETE_ITEM }`];
      }
    },
    methods: {
      ...mapActions("services/ideas", [
        GET_DATA,
        DELETE_ITEM,
        GET_REFERENCES
      ]),

      ...mapMutations("services/ideas", [
        SET_QUERY,
        SET_EMPTY
      ]),

      toIdeas (query) {
        this.$router.push({ name: "services-ideas", query });
      },

      openDetails (id) {
        this.currentId = id;
      },

      async getUserTickets (props) {
        if (props) {
          const { pagination: { page, rowsPerPage } } = props;

          this.limit = rowsPerPage;
          this.offset = page;
        }

        await this.GET_DATA(true);
      },

      onCancel (id) {
        this.$q.dialog({
          title: this.$t("user.tickets.actions.cancel"),
          message: "Вы уверены, что хотите отменить эту заявку?",
          ok: this.$t("action.submit"),
          cancel: this.$t("action.cancel"),
          persistent: true
        })
          .onOk(() => this.cancelTicket(id));
      },

      cancelTicket (id) {
        return this.DELETE_ITEM(id)
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: "Заявка отменена"
            });
            this.getUserTickets();
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: "При отмене заявки произошла ошибка"
            });
          });
      }
    },
    watch: {
      computedQuery () {
        this.GET_DATA(true);
      },

      filters: {
        deep: true,
        async handler () {
          await this.GET_DATA(true);
        }
      }
    },
    beforeDestroy () {
      this.SET_EMPTY();
    }
  };
</script>

<style lang="stylus"></style>
