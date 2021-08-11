<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="closeModal"
  )
    q-card.modal-container__dense
      q-card-section
        BaseInput(
          v-model="title"
          label="Заголовок"
          :rules="rules"
        )
        BaseInput(
          v-model="description"
          type="textarea"
          label="Описание"
          counter
          :maxlength="200"
          :rules="rules"
        )
      q-card-actions(align="right")
        q-btn(@click="createIdea" label="Создать" flat color="primary" v-close-popup :disabled="!isValid")
</template>

<script>
  import BaseModal from "../../common/BaseModal";
  import BaseInput from "../../common/BaseInput";
  import { mapActions } from "vuex";
  import { CREATE_IDEA } from "../../../store/constants/action-constants";

  export default {
    name: "NewIdeaModal",
    components: { BaseModal, BaseInput },
    props: {
      value: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        title: null,
        description: null,
        rules: [
          val => !!val || this.$t("common.error.validation.required"),
          val => !new RegExp(/[<>"'%;()&\d*+]/g).test(val) || this.$t("common.error.validation.invalid")
        ]
      };
    },
    computed: {
      isValid () {
        return this.title && this.description;
      }
    },
    methods: {
      ...mapActions("services/ideas", [
        CREATE_IDEA
      ]),

      closeModal (value) {
        this.$emit("input", value);
      },

      async createIdea () {
        await this.CREATE_IDEA({
          title: this.title,
          description: this.description,
          geometry: this.$store.state.services.pointCoords,
          typeId: 1
        });
      }
    }
  };
</script>

<style scoped>

</style>
