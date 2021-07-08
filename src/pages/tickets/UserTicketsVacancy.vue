<template lang="pug">
  div
    div.row.flex-break.items-center.q-mb-lg-lg
      div.col-md-9
        q-input(outlined dense placeholder='Placeholder')
      div.col-md-3.q-pl-lg
        q-btn.float-right.full-width(
          icon="add"
          outline
          size="sm"
          color="primary"
          :label="$t('entity.vacancy.add')"
          @click="isVisibleCreateModal=true"
        )

    BaseTable(
      v-if="tableData"
      row-key="id"
      :columns="getTableColumns"
      :data="tableData"
      :isLoading="isLoading"
      :getData="getUserTickets"
      :pagination="tablePagination"
    )

      template(v-slot:body="props")
        q-tr(:props="props")
          q-td(key="position" :props="props")
            | {{  props.row.position }}

          //for isUserLegal
          q-td(key="vac_position" :props="props")
            | {{ props.row.vac_position }}

          q-td(key="companyName" :props="props")
            | {{ props.row.companyName }}

          //for isUserLegal
          q-td(key="profIndustry" :props="props")
            | {{  props.row.profIndustry.description }}

          //for isUserLegal
          q-td(key="publishDate" :props="props")
            | {{  props.row.publishDate | formatDate }}

          //for isUserLegal
          q-td(key="respondsCount" :props="props")
            | {{  props.row.respondsCount }}

          //for isUserLegal
          q-td(key="legalStatus" :props="props")
            vacancy-ticker-status(:value="props.row.status")

            //for isUserLegal
          q-td(auto-width key="actions"  :props="props")
            q-btn(flat round dense icon="more_vert")
              q-menu
                q-list
                  q-item(:to="{ name: 'user-tickets-vacancy-item', params: { id: props.row.id} }" v-close-popup)
                    q-item-section(no-wrap)
                      | Просмотреть вакансию
                  q-item(:to="{ name: 'user-tickets-vacancy-item-candidates', params: { id: props.row.id} }" v-close-popup)
                    q-item-section(no-wrap)
                      | Просмотреть кандидатов
                  q-item(clickable v-close-popup)
                    q-item-section(no-wrap).text-red
                      | {{ $t("user.tickets.actions.details") }}



          //q-td(key="date" :props="props")
          //  | {{ props.row.created | formatDate }}
          //q-td(key="status" :props="props")
          //  | {{ props.row.status.nameRu }}
            //base-status(:value="props.row.status.id")
          //q-td(auto-width)
          //  q-btn(flat round dense icon="more_vert")
          //    q-menu
          //      q-list
          //        q-item(clickable v-close-popup :disable="props.row.status.id > 3")
          //          q-item-section(no-wrap).text-red
          //            | {{ $t("user.tickets.actions.cancel") }}
          //        q-item(clickable v-close-popup)
          //          q-item-section(no-wrap)
          //            | {{ $t("user.tickets.actions.details") }}

    q-inner-loading(v-else showing)
    UserTicketsVacancyNewVacancyModal(v-model="isVisibleCreateModal" @done="onCreateVacancy")
</template>

<script>
  import { mapActions, mapGetters, mapState } from "vuex";
  import BaseInput from "../../components/common/BaseInput";
  import BaseTable from "../../components/common/BaseTable";
  import VacancyTickerStatus from "../../components/user/tickets/vacancy/VacancyTickerStatus";
  import UserTicketsVacancyNewVacancyModal
    from "../../components/user/tickets/vacancy/UserTicketsVacancyNewVacancyModal";
  import { GET_USER_VACANCY, GET_VACANCY_REFERENCES } from "../../store/constants/action-constants";

  export default {
    name: "UserTicketsVacancy",
    components: { VacancyTickerStatus, BaseInput, BaseTable, UserTicketsVacancyNewVacancyModal },
    created () {
      return Promise.all([
        this.getUserTickets(),
        this.getVacancyReferences()
      ]);
    },
    data () {
      return {
        isVisibleCreateModal: false
      };
    },
    computed: {
      ...mapGetters(["isUserLegal"]),
      ...mapGetters("user/tickets/vacancy", [
        "tablePagination"
      ]),
      ...mapState("user/tickets/vacancy", {
        tableData: state => state.data
      }),
      isLoading () {
        return this.$store.state.wait[`user/tickets/vacancy/${ GET_USER_VACANCY }`] ||
          this.$store.state.wait[`services/vacancy/${ GET_VACANCY_REFERENCES }`];
      },
      getTableColumns () {
        const { isUserLegal } = this;

        return [
          {
            name: isUserLegal ? "vac_position" : "position",
            required: false,
            label: "Название",
            align: "left",
            sortable: false
          },
          {
            name: isUserLegal ? "profIndustry" : "companyName",
            required: false,
            label: isUserLegal ? "Профессиональная отрасль" : "Компания",
            align: "left",
            sortable: false
          },
          {
            name: isUserLegal ? "publishDate" : "companyName",
            required: false,
            label: isUserLegal ? "Дата размещения" : "Дата отлика",
            align: "left",
            sortable: false
          },
          {
            name: isUserLegal ? "respondsCount" : null,
            required: false,
            label: isUserLegal ? "Кандидаты" : null,
            align: "left",
            sortable: false
          },
          {
            name: isUserLegal ? "legalStatus" : null,
            required: false,
            label: isUserLegal ? "Статус" : null,
            align: "left",
            sortable: false
          },
          {
            name: isUserLegal ? "actions" : null,
            required: false,
            label: isUserLegal ? "" : null,
            align: "left",
            sortable: false
          }
        ].filter(x => x.name !== null);
      }
    },
    methods: {
      ...mapActions("user/tickets/vacancy", {
        getUserTickets: GET_USER_VACANCY
      }),
      ...mapActions("services/vacancy", {
        getVacancyReferences: GET_VACANCY_REFERENCES
      }),
      onCreateVacancy () {
        this.isVisibleCreateModal = false;
        this.getUserTickets();
      }
    }
  };
</script>

<style lang="stylus" scoped>

</style>
