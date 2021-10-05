<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
  )
    q-card.q-pa-md.modal-container__wide
      q-form(@submit="onSubmit")
        q-card-section
          q-input(v-model.trim="user.email" :label="$t('common.email')" :rules="validateEmail" lazy-rules dense)
          q-input(v-model.trim="user.firstName" :label="$t('user.firstName')" :rules="validateName" lazy-rules dense)
          q-input(v-model.trim="user.password" :label="$t('user.password')" :rules="validatePassword" lazy-rules dense)
        q-card-section
          q-field(:value="roles" :rules="rolesPicked" borderless)
            template(#control)
              .col-12
                q-option-group(
                  v-model="pickedPermission"
                  :options="permissions"
                  type="radio"
                  inline
                  dense
                )
              .col-12(v-if="isEmployeePicked").q-mt-md
                q-option-group(
                  v-model="pickedRoles"
                  :options="employeeRoles"
                  type="checkbox"
                  dense
                )
        q-card-actions
          q-btn(
            outline
            type="submit"
            color="primary"
            :loading="isLoading"
            :label="$t('action.registerUser')"
          ).full-width
</template>

<script>
  import { mapActions } from "vuex";
  import BaseModal from "components/common/BaseModal";
  import { REGISTER_EMPLOYEE } from "@/store/constants/action-constants";

  export default {
    name: "NewUserModal",
    components: { BaseModal },
    props: {
      value: {
        type: Boolean,
        required: true,
        default: false
      },
      employeeRoles: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        user: {
          email: null,
          firstName: null,
          password: null
        },
        pickedPermission: "ROLE_ADMIN",
        pickedRoles: [],
        permissions: [
          {
            label: this.$t("common.permissions.ROLE_ADMIN"),
            value: "ROLE_ADMIN"
          },
          {
            label: this.$t("common.permissions.ROLE_QGIS"),
            value: "ROLE_QGIS"
          },
          {
            label: this.$t("common.permissions.ROLE_EMPLOYEE"),
            value: "ROLE_EMPLOYEE"
          }
        ]
      };
    },
    computed: {
      isLoading () {
        return this.$store.state.wait[`users/${ REGISTER_EMPLOYEE }`];
      },
      rolesPicked () {
        return [
          val => val.length > 0
        ];
      },
      isEmployeePicked () {
        return this.pickedPermission === "ROLE_EMPLOYEE";
      },
      roles () {
        if (this.pickedPermission && this.pickedPermission !== "ROLE_EMPLOYEE") {
          return [this.pickedPermission];
        }
        return this.pickedRoles;
      },
      requiredRule () {
        return [val => !!val || this.$t("common.error.validation.required")];
      },

      validateEmail () {
        return [
          ...this.requiredRule,
          val => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val) || this.$t("common.error.validation.email")
        ];
      },

      validateName () {
        return [
          ...this.requiredRule,
          val => val && val.length > 0 && val.length < 50, val => val && /^[A-zА-яЁё '.-]*$/.test(val)
        ];
      },

      validatePassword () {
        return [
          ...this.requiredRule,
          val => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(val) || this.$t("common.error.validation.passwordReg") // uppercase, lowercase, 8 symbols, 1 digit
        ];
      }
    },
    methods: {
      ...mapActions("users", [REGISTER_EMPLOYEE]),
      async onSubmit () {
        try {
          const { user, roles } = this;
          await this.REGISTER_EMPLOYEE({ ...user, roles });
          this.$emit("success");
        } catch (e) {
          const message = e.response.data.message || null;
          this.$emit("fail", message);
        }
        this.toggleModal(false);
      },
      toggleModal (value) {
        this.$emit("input", value);
        Object.assign(this.$data, this.$options.data.apply(this)); // default data
      }
    }
  };
</script>
