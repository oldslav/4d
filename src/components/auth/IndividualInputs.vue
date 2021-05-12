<template lang="pug">
  .column
    q-input(type="email" v-model.trim="model.email" label="Email" :rules="validateEmail" lazy-rules dense)
    q-input(v-model.trim="model.firstName" label="Имя" :rules="requiredRule" lazy-rules dense)
    q-input(v-model.trim="model.lastName" label="Фамилия" :rules="requiredRule" lazy-rules dense)
    q-input(
      :type="isPassword ? 'password' : 'text'"
      v-model="model.password"
      label="Пароль"
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
      label="Подтвердите пароль"
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
    name: "IndividualInputs",
    mixins: [InputsMixin],
    methods: {
      defaultModel () {
        return {
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: ""
        };
      }
    }
  };
</script>
