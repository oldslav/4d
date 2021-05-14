<template lang="pug">
  q-card.auth-form
    q-card-actions(align="right")
      q-btn(flat v-close-popup icon="close" color="primary")

    q-card-section.content
      h3.text-title
        | {{ $t('common.login.title') }}
      h3.text-subtitle
        | {{ $t('common.login.subtitle') }}
      q-form(@submit="onSubmit").q-gutter-y-md
        BaseInput(v-model="form.username" :label="$t('entity.email')")
        BaseInput(v-model="form.password" :label="$t('entity.password')" :type="isPasswordVisible ? 'text' : 'password'" append)
          template(#append)
            q-icon(
              :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPasswordVisible = !isPasswordVisible"
            )
        q-btn(:label="$t('action.login')" type="submit" color="primary").full-width

      q-inner-loading(:showing="isLoading" color="primary")
</template>

<script>
  import { ACCOUNT_LOGIN } from "../../store/constants/action-constants";
  import BaseInput from "../common/BaseInput";

  export default {
    name: "LoginForm",
    components: { BaseInput },
    data () {
      return {
        form: {
          password: null,
          username: null
        },
        isPasswordVisible: false
      };
    },
    computed: {
      validateUsername: () => [(val) => val.length > 0 || "Please type login"],
      validatePassword: () => [
        (val) => val !== "" || "Please type password",
        (val) => val.length > 7 || "Minimum 8 symbols"
      ],
      isLoading () {
        return this.$store.state.wait[ACCOUNT_LOGIN];
      }
    },
    methods: {
      onSubmit () {
        try {
          this.$store.dispatch(ACCOUNT_LOGIN, {
            ...this.form,
            grant_type: "password"
          });

          this.$emit("submit");
        } catch (e) {

        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .auth-form
    width: 800px

    .content
      margin: 6vw
</style>
