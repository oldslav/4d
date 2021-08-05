<template lang="pug">
  BaseTable(
    v-if="tableData"
    :data="tableData"
    :getData="getEmployeeTickets"
    row-key="id"
    :loading="isLoading"
    :pagination="tablePagination"
  )
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import { mapFields } from "@/plugins/mapFields";
  import { GET_EMPLOYEE_COMMERCE_TICKETS } from "@/store/constants/action-constants";
  import { UPDATE_PAGINATION } from "@/store/constants/mutation-constants";
  import BaseTable from "components/common/BaseTable";

  export default {
    name: "TicketsCommerceEmployee",
    components: { BaseTable },
    preFetch ({ store }) {
      return store.dispatch(`user/tickets/commerce/${ GET_EMPLOYEE_COMMERCE_TICKETS }`);
    },
    data () {
      return {};
    },
    computed: {
      ...mapGetters("user/tickets/commerce", ["tableData", "tablePagination"]),
      ...mapFields("user/tickets/commerce", {
        fields: ["limit", "offset"],
        base: "pagination",
        mutation: UPDATE_PAGINATION
      }),
      isLoading () {
        return this.$store.state.wait[`user/tickets/commerce/${ GET_EMPLOYEE_COMMERCE_TICKETS }`];
      }
    },
    methods: {
      ...mapActions("user/tickets/commerce", [GET_EMPLOYEE_COMMERCE_TICKETS]),
      async getEmployeeTickets (props) {
        if (props) {
          const { pagination: { page, rowsPerPage } } = props;

          this.limit = rowsPerPage;
          this.offset = page;
        }

        await this.GET_EMPLOYEE_COMMERCE_TICKETS();
      }
    }
  };
</script>
