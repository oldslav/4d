<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
  )
    q-card.q-pa-md.modal-container__wide
      q-form(@submit="onSubmit()")
        q-card-section
          q-input(v-model.trim="user.email" :label="$t('common.email')" :rules="validateEmail" lazy-rules dense)
          q-input(v-model.trim="user.firstName" :label="$t('user.firstName')" :rules="requiredRule" lazy-rules dense)
          q-input(v-model.trim="user.password" :label="$t('user.password')" :rules="validatePassword" lazy-rules dense)
          q-option-group(
            v-model="user.roles"
            :options="employeeRoles"
            type="checkbox"
            dense
          )
        q-card-actions
          q-btn(
            outline
            type="submit"
            color="primary"
            :label="$t('action.registerUser')"
          ).full-width
</template>

<script>
  import BaseModal from "components/common/BaseModal";

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
      },
      adminRoles: {
        type: Array,
        default: () => []
      },
      userRoles: {
        type: Array,
        default: () => []
      },
      gisRoles: {
        type: Array,
        default: () => []
      },
      legalRoles: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        user: {
          email: null,
          firstName: null,
          password: null,
          roles: []
        }
      };
    },
    computed: {
      requiredRule () {
        return [val => !!val || this.$t("common.error.validation.required")];
      },

      validateEmail () {
        return [
          ...this.requiredRule,
          val => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val) || this.$t("common.error.validation.email")
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
      onSubmit () {
        this.$emit("register", this.user);
      },
      toggleModal (value) {
        this.$emit("input", value);
        Object.assign(this.$data, this.$options.data.apply(this)); // default data
      }
    }
  };
</script>
