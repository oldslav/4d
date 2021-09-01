<template lang="pug">
  div.base-image-drag-drop(:class="{'base-image-drag-drop_files': files.length > 0}")
    div.text-body2.text-grey-8 {{ $t("common.components.imageDragDrop.addPhoto") }}
    div.text-caption.text-primary {{ $t('common.components.imageDragDrop.maxFiles', { maxFiles }) }}
      BaseDragDrop.base-image-drag-drop_dd.cursor-pointer(
        :value="files"
        :max-files="maxFiles"
        :multiple="multiple"
        :readonly="isLimitReached"
        :accept="accept"
        @input="onChangeFiles"
      )
        template(slot="before")
          div(v-show="!files.length").base-image-drag-drop__text.flex.text-primary.q-px-lg.text-body2.items-center.justify-center.text-center
            | {{ $t('common.components.dragDrop.info') }}
            div.base-image-drag-drop__icon.text-primary
              q-icon.cursor-pointer(name="o_file_upload")

        template(v-slot:file="{ index, file }")
          div.base-image-drag-drop__image.col-md-3.col-xs-3.q-py-sm.q-px-sm
            q-btn.base-image-drag-drop__remove(
              @click.prevent.stop="onClickRemoveFile(index)"
              icon="close"
              size="xs"
              color="primary"
              round
            )
            q-img.base-image-drag-drop__img(:src="previews[file.$hash]" ratio="1")

          div.base-image-drag-drop__add.col-md-3.col-xs-3.q-py-sm.q-px-sm(v-if="index === files.length - 1 && !isLimitReached")
            div.base-image-drag-drop__add-icon.flex.items-center.justify-center
              q-icon(name="add_circle_outline" color="primary")

</template>
<script>
  import { isEqual } from "lodash";
  import BaseDragDrop from "./BaseDragDrop";

  export default {
    components: { BaseDragDrop },
    props: {
      value: { type: Array, default: () => [] },
      maxFiles: { type: Number, default: 3 },
      multiple: { type: Boolean, default: true },
      accept: { type: String, default: ".jpg, .png, .jpeg" }
    },
    data () {
      return {
        files: [],
        previews: {}
      };
    },
    computed: {
      isLimitReached () {
        return this.files.length >= this.maxFiles;
      }
    },
    methods: {
      onChangeFiles (value) {
        const files = [].concat(this.files, value)
          .map(file => {
            file.$hash = `${ file.lastModified }-${ file.name }`;
            return file;
          })
          .filter((file, i, self) => {
            const index = self.findIndex(x => x.$hash === file.$hash);
            return i === index;
          });

        this.previews = files.reduce((res, file) => {
          res[file.$hash] = this.previews[file.$hash] || URL.createObjectURL(file);
          return res;
        }, {});
        this.files = files;
      },

      onClickRemoveFile (index) {
        this.files.splice(index, 1);
      }
    },
    watch: {
      files (val) {
        if (!isEqual(val, this.value)) {
          this.$emit("input", val);
        }
      },
      value (val) {
        if (!isEqual(val, this.files)) {
          this.files = val;
        }
      }
    }
  };
</script>
<style lang="stylus">
.base-image-drag-drop__img
  border-radius 4px

.base-image-drag-drop__image
  position relative

.base-image-drag-drop__remove
  position: absolute
  right: 0
  top: 0
  z-index: 2

.base-image-drag-drop__text
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
  font-size 14px

.base-image-drag-drop_dd
  position: relative;
  padding 0

  .q-field__native
    padding 8px

.base-image-drag-drop__icon
  display none
  font-size 22px

.base-image-drag-drop__add
  position relative

  &:before
    content: " ";
    padding-bottom 100%
    width: 100%
    display block
    position relative

  .base-image-drag-drop__add-icon
    position: absolute;
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    z-index 1
    font-size: 24px;
    border 1px dashed #0E8AFD
    border-radius: 4px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;

.base-image-drag-drop
  .q-field__before
    padding 0

  .dragdrop-label
    display: none;

  .q-file__dnd
    border 0
    outline none
    z-index 2

  .q-field__inner
    min-height 118px
</style>
