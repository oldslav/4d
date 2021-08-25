<template lang="pug">
  div
    q-input(dense borderless readonly :value="name")
      template(#append)
        q-icon(name="o_file_download" @click.stop="download").cursor-pointer
      template(#prepend)
        q-icon(name="o_picture_as_pdf")
</template>

<script>
  import { mapActions } from "vuex";
  import { DOWNLOAD_FILE } from "@/store/constants/action-constants";

  export default {
    props: {
      path: {
        type: String,
        default: ""
      },
      name: {
        type: String,
        default: ""
      }
    },
    methods: {
      ...mapActions([DOWNLOAD_FILE]),
      download () {
        return this.DOWNLOAD_FILE(this.path);
      }
    }
  };
</script>
