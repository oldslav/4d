<template lang="pug">
  q-form(@submit.stop.prevent="onSubmit")
    .text-body1.q-mb-md
      | Прикрепите документы, подтверждающие оплату услуги.
    FilePicker(
      :value="value"
      @input="onInput"
      :rules="documentRequired"
      :max-files="3"
      label="Документ, подтверждающий оплату"
      lazy="ondemand"
    )
    div.text-right
      q-btn(type="submit" :label="$t('action.send')" color="primary" :loading="loading")
</template>

<script>
  import { isDocumentPresent } from "@/util/validators";
  import FilePicker from "components/common/FilePicker";

  export default {
    name: "PaymentFilesForm",
    components: { FilePicker },
    props: {
      value: {
        type: Array,
        default: null
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      documentRequired () {
        return [isDocumentPresent];
      }
    },
    methods: {
      onInput (value) {
        this.$emit("input", value);
      },
      onSubmit () {
        this.$emit("submit");
      }
    }
  };
</script>
