<template lang="pug">
  q-form.q-pa-md(@submit="onSubmit()" )
    .text-small.q-my-sm
      | Состояние растения
      .row.q-mt-sm
        q-radio(v-model="statusId" val="1" label="Хорошее" dense)
      .row.q-mt-sm
        q-radio(v-model="statusId" val="2" label="Болеет" dense)
      .row.q-mt-sm
        q-radio(v-model="statusId" val="3" label="Погибло" dense)

    q-input(
      v-model="description"
      label="Комментарий"
      outlined
      type="textarea"
    )

    .text-medium
      | Добавьте фото
    .sub-header.text-small.q-mb-md
      | Не более 5 фото
    .hint.text-caption.q-mb-md
      | Формат jpg, jpeg, png, pdf
    BaseDragDrop.q-mb-md(
      :value="media"
      max-files="5"
      @input="uploadMedia"
    )
    .text-medium.q-mb-md(v-if="media.length > 0")
      | Загруженные фото
    .row.q-mb-md
      q-img.col-3.q-ml-sm(
        v-for="(preview, index) in mediaPreviews"
        :key="index"
        :src="preview"
      )
        q-icon.full-width.row.justify-end.cursor-pointer(
          name="close"
          @click="removeImage(index)"
        )

    .row
      q-btn.col-12(color="primary" :label="$t('action.submit')" type="submit")

    q-inner-loading(:showing="isLoading")
      q-spinner(size="50px" color="primary")
</template>

<script>
  import { mapActions } from "vuex";
  import BaseDragDrop from "components/common/BaseDragDrop";
  import { UPDATE_TREE } from "@/store/constants/action-constants";

  export default {
    name: "TreeStatusForm",
    components: { BaseDragDrop },
    props: {
      selectedTree: {
        type: Object,
        default: () => {}
      }
    },
    created () {
      this.statusId = this.selectedTree.status.id || null;
      this.description = this.selectedTree.request.description || "";
    },
    data () {
      return {
        statusId: null,
        description: "",
        media: [],
        mediaPreviews: []
      };
    },
    computed: {
      isLoading () {
        return this.$store.state.wait[`service/${ UPDATE_TREE }`];
      }
    },
    methods: {
      ...mapActions("services/trees", [UPDATE_TREE]),
      uploadMedia (file) {
        this.media.push(file);

        const reader = new FileReader();
        reader.addEventListener("load", () => {
          this.mediaPreviews.push(reader.result);
        }, false);

        if (file) {
          reader.readAsDataURL(file);
        }
      },
      onSubmit () {
        const { statusId, description, media } = this;
        return this.UPDATE_TREE({ treeId: this.selectedTree.id, statusId, description, media })
          .then(() => {
            this.$emit("success");
          })
          .catch(() => {
            this.$emit("fail");
          });
      },
      removeImage (index) {
        this.media.splice(index, 1);
        this.mediaPreviews.splice(index, 1);
      }
    }
  };
</script>

<style lang="stylus" scoped>
.sub-header
  color: #0E8AFD
  margin-bottom: 4px
.hint
  color: rgba(0,0,0,0.54)
</style>