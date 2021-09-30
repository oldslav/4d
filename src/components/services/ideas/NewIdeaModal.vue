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
          ref="imagesUploader"
          :url="imageUploadUrl"
          label="Перетяните изображения в поле"
          field-name="files"
          multiple
          batch
          hide-upload-btn
          accept=".jpg, .png, .jpeg"
          max-total-size="10485760"
          :headers="uploadImageHeaders"
          @uploading="isLoading = true"
          @uploaded="isLoading = false"
        ).full-width
      q-card-actions(align="right")
        q-btn(@click="createIdea" label="Создать" flat color="primary" :disabled="!isValid")
</template>

<script>
  import BaseModal from "../../common/BaseModal";
  import BaseInput from "../../common/BaseInput";
  import { mapActions, mapState } from "vuex";
  import { CREATE_IDEA, GET_CURRENT, GET_IDEAS_GEO, UPLOAD_IMAGES } from "../../../store/constants/action-constants";

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
        images: [],
        description: null,
        rules: [
          val => !!val || this.$t("common.error.validation.required"),
          val => !new RegExp(/[<>"'%;()&*+]/g).test(val) || this.$t("common.error.validation.invalid")
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
      ...mapState("services/ideas", {
        current: state => state.current
      }),

      isValid () {
        return this.title && this.description;
      },

      imageUploadUrl () {
        return process.env.SERVER_API_HOST + `/api/v1/services/crowdsourcing/${ this.current && this.current.id }/file`;
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
        CREATE_IDEA,
        UPLOAD_IMAGES,
        GET_CURRENT
      ]),

      closeModal (value) {
        this.$emit("input", value);
      },

      async createIdea () {
        const { id } = await this.CREATE_IDEA({
          title: this.title,
          description: this.description,
          geometry: this.$store.state.services.pointCoords,
          typeId: this.typeId
        });
        await this.GET_CURRENT(id);
        await this.$refs.imagesUploader.upload();
        await this.GET_IDEAS_GEO();
        this.$emit("created");
      }
    }
  };
</script>

<style scoped>

</style>
