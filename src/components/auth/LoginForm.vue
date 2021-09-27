<template lang="pug">
  div
    h3.text-title
      | {{ $t("common.login.title") }}
    h3.text-subtitle
      | {{ $t("common.login.subtitle") }}
    q-form(@submit="onSubmit").q-gutter-y-md
      BaseInput(
        v-model="form.username"
        :label="$t('entity.email')"
        @input="resetErrors()"
        :error="loginError"
      )
      BaseInput(
        v-model="form.password"
        :label="$t('entity.password')"
        :type="isPasswordVisible ? 'text' : 'password'"
        append
        @input="resetErrors()"
        :error="passwordError"
      )
        template(#append)
          q-icon(
            :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPasswordVisible = !isPasswordVisible"
          )
      .q-mx-lg.q-py-md.flex.items-center.justify-center.full-width.login__error.text-subtitle(v-show="isError")
        | {{ errorMessage }}
      q-btn(:label="$t('action.login')" type="submit" color="primary").full-width

    q-inner-loading(:showing="isLoading" color="primary")
</template>

<script>
  import { ACCOUNT_LOGIN } from "@/store/constants/action-constants";
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
        isPasswordVisible: false,
        loginError: false,
        passwordError: false
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
      },
      errorMessage () {
        return this.passwordError ? this.$t("common.error.response.wrongPass") : this.$t("common.error.response.wrongLogin");
      },
      isError () {
        return this.loginError || this.passwordError;
      }
    },
    methods: {
      resetErrors () {
        this.passwordError = false;
        this.loginError = false;
      },
      async onSubmit () {
        this.resetErrors();
        try {
          await this.$store.dispatch(ACCOUNT_LOGIN, {
            ...this.form,
            grant_type: "password"
          });

          this.$emit("submit");
        } catch (e) {
          const { status } = e.response;
          if (status === 400) {
            this.passwordError = true;
          } else if (status === 401) {
            this.loginError = true;
          }
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .login__error {
    background-color #FFECEC
    color #FF4040
  }
</style>
