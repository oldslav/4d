<template lang="pug">
  q-card.q-ma-md
    BaseTable(
      v-if="tableData"
      row-key="id"
      :isLoading="isLoading"
      :columns="columns"
      :data="tableData"
      :pagination="tablePagination"
      :getData="getUsers"
    )
      template(v-slot:body="props")
        q-tr(:props="props")
          q-td(key="id" :props="props")
            | {{ props.row.id }}
          q-td(key="name" :props="props")
            | {{ props.row.name.full }}
          q-td(key="email" :props="props")
            | {{ props.row.contacts.email }}
          q-td(key="role" :props="props")
            | {{ props.row.contacts.email }}
          q-td(key="menu" :props="props")
            q-btn(v-if="props.row.locked" flat @click="toggleBlock(props.row)" color="primary")
              q-icon(name="block" left)
              span {{ $t("action.unblock") }}
            q-btn(v-else flat @click="toggleBlock(props.row)" color="negative")
              q-icon(name="block" left)
              span {{ $t("action.block") }}
</template>

<script>
  import BaseTable from "./common/BaseTable";
  import { mapActions, mapGetters } from "vuex";
  import { ACCOUNT_BLOCK, ACCOUNT_UNBLOCK, GET_DATA } from "../store/constants/action-constants";
  import { mapFields } from "../plugins/mapFields";
  import { UPDATE_PAGINATION } from "../store/constants/mutation-constants";

  export default {
    name: "Users",
    components: { BaseTable },
    async created () {
      await this.GET_DATA();
    },
    data () {
      return {
        columns: [
          {
            name: "id",
            align: "left",
            label: this.$t("common.id")
          },
          {
            name: "name",
            align: "left",
            label: this.$t("common.name")
          },
          {
            name: "email",
            align: "left",
            label: this.$t("common.email")
          },
          {
            name: "role",
            align: "left",
            label: this.$t("common.role")
          },
          {
            name: "menu",
            align: "right"
          }
        ]
      };
    },
    computed: {
      ...mapGetters("users", [
        "tableData",
        "tablePagination"
      ]),

      ...mapFields("users", {
        fields: ["limit", "offset"],
        base: "pagination",
        mutation: UPDATE_PAGINATION
      }),

      isLoading () {
        return this.$store.state.wait[`users/${ GET_DATA }`] ||
          this.$store.state.wait[`users/${ ACCOUNT_BLOCK }`] ||
          this.$store.state.wait[`users/${ ACCOUNT_UNBLOCK }`];
      }
    },
    methods: {
      ...mapActions("users", [
        GET_DATA,
        ACCOUNT_BLOCK,
        ACCOUNT_UNBLOCK
      ]),

      async getUsers (props) {
        if (props) {
          const { pagination: { page, rowsPerPage } } = props;

          this.limit = rowsPerPage;
          this.offset = page - 1;
        }

        await this.GET_DATA();
      },

      async toggleBlock (user) {
        if (user.locked) {
          await this.ACCOUNT_UNBLOCK(user.id);
        } else {
          await this.ACCOUNT_BLOCK(user.id);
        }
        await this.getUsers();
      }
    }
  };
</script>

<style scoped>

</style>
