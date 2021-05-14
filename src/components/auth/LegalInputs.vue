<template lang="pug">
  .column
    q-input(type="email" v-model.trim="model.email" label="Email" :rules="validateEmail" lazy-rules dense)
    q-input(v-model.trim="model.firstName" :label="$t('user.firstName')" :rules="requiredRule" lazy-rules dense)
    q-input(v-model.trim="model.lastName" :label="$t('user.lastName')" :rules="requiredRule" lazy-rules dense)
    q-input(v-model.trim="model.companyName" :label="$t('user.companyName')" :rules="requiredRule" lazy-rules dense)
    q-input(
      :type="isPassword ? 'password' : 'text'"
      v-model="model.password"
      :label="$t('user.password')"
      :rules="validatePassword"
      lazy-rules
      dense
    )
      template(#append)
        q-icon(
          :name="isPassword ? 'visibility_off' : 'visibility'"
          @click="isPassword = !isPassword"
          class="cursor-pointer"
        )
    q-input(
      :type="isConfirm ? 'password' : 'text'"
      v-model="model.confirmPassword"
      :label="$t('user.confirmPassword')"
      :rules="validateConfirm"
      lazy-rules
      dense
    )
      template(#append)
        q-icon(
          :name="isConfirm ? 'visibility_off' : 'visibility'"
          @click="isConfirm = !isConfirm"
          class="cursor-pointer"
        )
</template>

<script>
  import InputsMixin from "components/auth/InputsMixin";

  export default {
    name: "LegalInputs",
    mixins: [InputsMixin],
    methods: {
      defaultModel () {
        return {
          email: "",
          firstName: "",
          lastName: "",
          companyName: "",
          password: "",
          confirmPassword: ""
        };
      }
    }
  };
</script>
