<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="closeModal"
  )
    q-card.modal-container__dense
      q-card-section
        div
          | Вебрите тип заявки
          q-option-group(
            v-model="typeId"
            :options="options"
            color="primary"
          )
        BaseInput(
          v-model="title"
          label="Название"
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
      q-card-section
        q-uploader(
          :url="imageUploadUrl"
          label="Перетяните изображения в поле"
          field-name="file"
          multiple
          batch
          disable
          :headers="uploadImageHeaders"
          @uploading="isLoading = true"
          @uploaded="isLoading = false"
        ).full-width
      q-card-actions(align="right")
        q-btn(@click="createIdea" label="Создать" flat color="primary" v-close-popup :disabled="!isValid")
</template>

<script>
  import BaseModal from "../../common/BaseModal";
  import BaseInput from "../../common/BaseInput";
  import { mapActions } from "vuex";
  import { CREATE_IDEA, GET_IDEAS_GEO } from "../../../store/constants/action-constants";

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
        ],
        typeId: 1,
        options: [
          {
            label: "Идея или предложение",
            value: 1
          },
          {
            label: "Проблема в городе",
            value: 2
          }
        ]
      };
    },
    computed: {
      isValid () {
        return this.title && this.description;
      },

      imageUploadUrl () {
        return process.env.SERVER_API_HOST + `/api/v1/map/crowdsourcing/${ this.current && this.current.id }/file`;
      },

      uploadImageHeaders () {
        return [
          {
            name: "Authorization",
            value: `Bearer ${ this.$q.cookies.get("PHPSESS2ID") }`
          }
        ];
      },

      isLoading: {
        isLoading: false,

        get () {
          return this.isLoading || this.$store.state.wait[`services/ideas/${ CREATE_IDEA }`];
        },

        set (val) {
          this.isLoading = val;
        }
      }
    },
    methods: {
      ...mapActions("services", [
        GET_IDEAS_GEO
      ]),

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
          typeId: this.typeId
        });
        await this.GET_IDEAS_GEO();
        this.$emit("created");
      }
    }
  };
</script>

<style scoped>

</style>
