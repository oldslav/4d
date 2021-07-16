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
          q-td(key="phone" :props="props")
            | {{ props.row.contacts.phone }}
          q-td(key="telegram" :props="props")
            | {{ props.row.contacts.telegramAlias }}
          q-td(key="role" :props="props" auto-width)
            q-btn(color="primary" label="Роли" flat)
              q-menu(fit)
                q-card
                  q-card-section
                    q-option-group(
                      v-if="props.row.roles.includes('ROLE_USER')"
                      v-model="props.row.roles"
                      :options="userRoles"
                      type="checkbox"
                    )
                    q-option-group(
                      v-else
                      v-model="props.row.roles"
                      :options="employeeRoles"
                      type="checkbox"
                    )
                  q-card-actions(align="right")
                    q-btn(color="primary" :label="$t('action.save')" @click="setRoles(props.row.id, props.row.roles)")
          q-td(key="menu" :props="props" auto-width)
            q-btn(v-if="props.row.locked" flat @click="toggleBlock(props.row)" color="primary")
              span
                q-icon(name="block" left)
                span {{ $t("action.unblock") }}
            q-btn(v-else flat @click="toggleBlock(props.row)" color="negative")
              span
                q-icon(name="block" left)
                span {{ $t("action.block") }}
</template>

<script>
  import BaseTable from "./common/BaseTable";
  import { mapActions, mapGetters, mapState } from "vuex";
  import { ACCOUNT_BLOCK, ACCOUNT_SET_ROLES, ACCOUNT_UNBLOCK, GET_DATA } from "../store/constants/action-constants";
  import { mapFields } from "../plugins/mapFields";
  import { UPDATE_PAGINATION } from "../store/constants/mutation-constants";

  export default {
    name: "Users",
    components: { BaseTable },
    async created () {
      await this.GET_DATA();
      this.tableData = {
        items: this.stateData.items.map(i => ({
          ...i,
          roles: i.roles.map(role => role.name)
        }))
      };
    },
    data () {
      return {
        tableData: null,
        userRoles: [
          {
            label: this.$t("common.roles.ROLE_USER"),
            value: "ROLE_USER"
          }
        ],
        employeeRoles: [
          {
            label: this.$t("common.roles.ROLE_EMPLOYEE"),
            value: "ROLE_EMPLOYEE"
          },
          {
            label: this.$t("common.roles.ROLE_EMPLOYEE_PARKING"),
            value: "ROLE_EMPLOYEE_PARKING"
          },
          {
            label: this.$t("common.roles.ROLE_EMPLOYEE_IDEA"),
            value: "ROLE_EMPLOYEE_IDEA"
          },
          {
            label: this.$t("common.roles.ROLE_EMPLOYEE_WAREHOUSE"),
            value: "ROLE_EMPLOYEE_WAREHOUSE"
          },
          {
            label: this.$t("common.roles.ROLE_EMPLOYEE_LIVING"),
            value: "ROLE_EMPLOYEE_LIVING"
          },
          {
            label: this.$t("common.roles.ROLE_EMPLOYEE_EMPLOYMENT_CENTER"),
            value: "ROLE_EMPLOYEE_EMPLOYMENT_CENTER"
          },
          {
            label: this.$t("common.roles.ROLE_EMPLOYEE_LIGHT"),
            value: "ROLE_EMPLOYEE_LIGHT"
          },
          {
            label: this.$t("common.roles.ROLE_EMPLOYEE_TREES"),
            value: "ROLE_EMPLOYEE_TREES"
          },
          {
            label: this.$t("common.roles.ROLE_EMPLOYEE_COMMERCE"),
            value: "ROLE_EMPLOYEE_COMMERCE"
          },
          {
            label: this.$t("common.roles.ROLE_EMPLOYEE_CROWDFUNDING"),
            value: "ROLE_EMPLOYEE_CROWDFUNDING"
          },
          {
            label: this.$t("common.roles.ROLE_GIS"),
            value: "ROLE_GIS"
          }
        ],
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
            name: "phone",
            align: "left",
            label: this.$t("common.phone")
          },
          {
            name: "telegram",
            align: "left",
            label: this.$t("common.telegram")
          },
          {
            name: "role",
            align: "center",
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
      ...mapState("users", {
        stateData: state => state.data
      }),

      ...mapGetters("users", [
        "tablePagination"
      ]),

      ...mapFields("users", {
        fields: ["limit", "offset"],
        base: "pagination",
        mutation: UPDATE_PAGINATION
      }),

      isLoading () {
        return this.$store.state.wait[`users/${ GET_DATA }`] ||
          this.$store.state.wait[`users/${ ACCOUNT_SET_ROLES }`] ||
          this.$store.state.wait[`users/${ ACCOUNT_BLOCK }`] ||
          this.$store.state.wait[`users/${ ACCOUNT_UNBLOCK }`];
      }
    },
    methods: {
      ...mapActions("users", [
        GET_DATA,
        ACCOUNT_BLOCK,
        ACCOUNT_UNBLOCK,
        ACCOUNT_SET_ROLES
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
          try {
            await this.ACCOUNT_UNBLOCK(user.id);
            user.locked = false;
          } catch (e) {}
        } else {
          try {
            await this.ACCOUNT_BLOCK(user.id);
            user.locked = true;
          } catch (e) {}
        }
      },

      async setRoles (id, roles) {
        await this.ACCOUNT_SET_ROLES({ id, roles });
      }
    }
  };
</script>

<style scoped>

</style>
