<template lang="pug">
  .row.q-col-gutter-md.items-baseline
    .col-6
      q-input(
        v-for="(phone, index) in model"
        v-model="model[index]"
        mask="# (###) ### - ####"
        unmasked-value
        @input="onInput()"
        :label="$t('user.profile.mainForm.phone')"
        :rules="index === 0 ? [...required, ...validatePhone] : validatePhone"
        :key="index"
      )
        template(#after v-if="index !== 0")
          q-icon(name="close" @click="removePhone(index)").cursor-pointer
    .col-6
      q-btn(:label="$t('action.addPhone')" @click="addPhone()" outline color="primary" icon="add")
</template>

<script>
  export default {
    name: "FormPhones",
    props: {
      value: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        model: [...this.value]
      };
    },
    computed: {
      required () {
        return [
          val => !!val || this.$t("common.error.validation.required")
        ];
      },
      validatePhone () {
        return [
          val => val.length === 11 || this.$t("common.error.validation.length", { length: 11 })
        ];
      }
    },
    methods: {
      addPhone () {
        this.model.push("");
        this.onInput();
      },
      removePhone (index) {
        this.model.splice(index, 1);
        this.onInput();
      },
      onInput () {
        this.$emit("input", this.model);
      }
    },
    watch: {
      value: {
        deep: true,
        handler (val) {
          this.model = val;
        }
      }
    }
  };
</script>
