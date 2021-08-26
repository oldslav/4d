<template lang="pug">
  q-form(ref="form" @submit="onSubmitForm")
    div.q-mt-md
      div.text-caption.text-grey-8 {{ $t('entity.services.tourism.offerForm.descriptionLabel') }}
      q-input(
        v-model="model.description"
        :rules="[requiredString]"
        :label="$t('entity.services.tourism.offerForm.routeDescription')"
        maxlength="150"
        type="textarea"
        lazy-rules
        outlined
      )

    div.q-mt-md
      file-picker(
        v-model="routes"
        :max-files="1"
        :label="$t('entity.services.tourism.offerForm.route')"
        :description="$t('entity.services.tourism.offerForm.routeFileFormat')"
        accept=".gpx, .tcp"
      )

    div.q-mt-md
      BaseImageDragDrop(v-model="model.images" :max-files="5")
</template>
<script>
  import { isEqual } from "lodash";
  import FilePicker from "../../../common/FilePicker";
  import BaseImageDragDrop from "../../../common/BaseImageDragDrop";

  const defaultValues = () => ({
    description: "",
    images: [],
    route: null
  });

  export default {
    components: { FilePicker, BaseImageDragDrop },
    props: {
      value: { type: Object, default: () => ({}) },
      valid: { type: Boolean, default: false }
    },
    data (){
      return {
        model: defaultValues(),
        routes: []
      };
    },
    computed: {
      requiredString (){
        return val => val && val.length > 0 || this.$t("common.error.validation.required");
      }
    },
    methods: {
      isValid (){
        return this.model.description !== "" &&
          this.model.route &&
          this.model.images.length > 0;
      },
      onSubmitForm (){
        if (this.isValid()) {
          this.$emit("submit");
        }
      }
    },
    watch: {
      value (val){
        if (!isEqual(val, this.model)) {
          this.model = { ...defaultValues(), ...val };
        }
      },
      model :{
        deep: true,
        handler (val){
          if (!isEqual(val, this.value)) {
            this.$emit("input", { ...defaultValues(), ...val });
            this.$emit("update:valid", this.isValid());
          }
        }
      },
      routes (val){
        this.model.route = Array.isArray(val) ? val[0] : val;
      }
    }
  };
</script>
