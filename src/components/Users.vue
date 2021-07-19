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
          q-td(key="permissions" :props="props")
            | {{ userRole(props) }}
          q-td(key="role" :props="props" auto-width)
            q-btn(color="primary" :label="$t('common.permissions.title')" flat)
              q-menu(fit)
                q-card
                  q-card-section
                    q-option-group(
                      v-if="isLegal(props)"
                      v-model="props.row.roles"
                      disable
                      :options="legalRoles"
                      type="checkbox"
                    )
                    q-option-group(
                      v-else-if="isUser(props)"
                      v-model="props.row.roles"
                      disable
                      :options="userRoles"
                      type="checkbox"
                    )
                    q-option-group(
                      v-else-if="isAdmin(props)"
                      v-model="props.row.roles"
                      disable
                      :options="adminRoles"
                      type="checkbox"
                    )
                    q-option-group(
                      v-else-if="isGIS(props)"
                      v-model="props.row.roles"
                      disable
                      :options="gisRoles"
                      type="checkbox"
                    )
                    q-option-group(
                      v-else
                      v-model="props.row.roles"
                      :options="employeeRoles"
                      type="checkbox"
                    )
                  q-card-actions(align="right")
                    q-btn(
                      color="primary"
                      :label="$t('action.save')"
                      @click="setRoles(props.row.id, props.row.roles)"
                    )
          q-td(key="menu" :props="props" auto-width)
            q-btn(v-if="props.row.locked" flat @click="toggleBlock(props.row)" color="primary")
              span
                q-icon(name="block" left)
                span {{ $t("action.unblock") }}
            q-btn(v-else flat @click="toggleBlock(props.row)" color="negative" :disable="isAdmin(props)")
              span
                q-icon(name="block" left)
                span {{ $t("action.block") }}
</template>

<script>
  import BaseTable from "./common/BaseTable";
  import { mapActions, mapGetters } from "vuex";
  import { ACCOUNT_BLOCK, ACCOUNT_SET_ROLES, ACCOUNT_UNBLOCK, GET_DATA } from "../store/constants/action-constants";
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
        legalRoles: [
          {
            label: this.$t("common.permissions.ROLE_USER_JURISTIC"),
            value: "ROLE_USER_JURISTIC"
          }
        ],
        userRoles: [
          {
            label: this.$t("common.permissions.ROLE_USER"),
            value: "ROLE_USER"
          }
        ],
        employeeRoles: [
          {
            label: this.$t("common.permissions.ROLE_EMPLOYEE"),
            value: "ROLE_EMPLOYEE"
          },
          {
            label: this.$t("common.permissions.ROLE_EMPLOYEE_PARKING"),
            value: "ROLE_EMPLOYEE_PARKING"
          },
          {
            label: this.$t("common.permissions.ROLE_EMPLOYEE_IDEA"),
            value: "ROLE_EMPLOYEE_IDEA"
          },
          {
            label: this.$t("common.permissions.ROLE_EMPLOYEE_WAREHOUSE"),
            value: "ROLE_EMPLOYEE_WAREHOUSE"
          },
          {
            label: this.$t("common.permissions.ROLE_EMPLOYEE_LIVING"),
            value: "ROLE_EMPLOYEE_LIVING"
          },
          {
            label: this.$t("common.permissions.ROLE_EMPLOYEE_EMPLOYMENT_CENTER"),
            value: "ROLE_EMPLOYEE_EMPLOYMENT_CENTER"
          },
          {
            label: this.$t("common.permissions.ROLE_EMPLOYEE_LIGHT"),
            value: "ROLE_EMPLOYEE_LIGHT"
          },
          {
            label: this.$t("common.permissions.ROLE_EMPLOYEE_TREES"),
            value: "ROLE_EMPLOYEE_TREES"
          },
          {
            label: this.$t("common.permissions.ROLE_EMPLOYEE_COMMERCE"),
            value: "ROLE_EMPLOYEE_COMMERCE"
          },
          {
            label: this.$t("common.permissions.ROLE_EMPLOYEE_CROWDFUNDING"),
            value: "ROLE_EMPLOYEE_CROWDFUNDING"
          }
        ],
        adminRoles: [
          {
            label: this.$t("common.permissions.ROLE_ADMIN"),
            value: "ROLE_ADMIN"
          }
        ],
        gisRoles: [
          {
            label: this.$t("common.permissions.ROLE_QGIS"),
            value: "ROLE_QGIS"
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
            name: "permissions",
            align: "center",
            label: this.$t("common.permissions.title")
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

      isAdmin (user) {
        return this.userPermissions(user).includes("ROLE_ADMIN");
      },

      isUser (user) {
        return this.userPermissions(user).includes("ROLE_USER");
      },

      isLegal (user) {
        return this.userPermissions(user).includes("ROLE_USER_JURISTIC");
      },

      isEmployee (user) {
        return this.userPermissions(user).includes("ROLE_EMPLOYEE");
      },

      isGIS (user) {
        return this.userPermissions(user).includes("ROLE_QGIS");
      },

      userPermissions (user) {
        return user.row.roles.toString();
      },

      userRole (user) {
        if (this.isLegal(user)) {
          return this.$t("common.permissions.ROLE_USER_JURISTIC");
        } else if (this.isUser(user)) {
          return this.$t("common.permissions.ROLE_USER");
        } else if (this.isEmployee(user)) {
          return this.$t("common.permissions.ROLE_EMPLOYEE");
        } else if (this.isGIS(user)) {
          return this.$t("common.permissions.ROLE_QGIS");
        } else {
          return this.$t("common.permissions.ROLE_ADMIN");
        }
      },

      async getUsers (props) {
        if (props) {
          const { pagination: { page, rowsPerPage } } = props;

          this.limit = rowsPerPage;
          this.offset = page;
        }

        await this.GET_DATA();
      },

      async toggleBlock (user) {
        if (user.locked) {
          try {
            await this.ACCOUNT_UNBLOCK(user.id);
          } catch (e) {}
        } else {
          try {
            await this.ACCOUNT_BLOCK(user.id);
          } catch (e) {}
        }
        await this.GET_DATA();
      },

      async setRoles (id, roles) {
        await this.ACCOUNT_SET_ROLES({ id, roles });
      }
    }
  };
</script>

<style scoped>

</style>
