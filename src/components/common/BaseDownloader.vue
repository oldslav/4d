<template lang="pug">
  div
    slot(:download="onDownload")
</template>

<script>
  import { exportFile } from "quasar";

  export default {
    name: "BaseDownloader",
    props: {
      value: {
        type: null,
        default: () => ({})
      }
    },
    methods: {
      onDownload () {
        const { name, type } = this.value;
        if (!name || !type) {
          this.failedToDownload();
          return;
        }

        try {
          exportFile(name, this.value, type);
        } catch (e) {
          this.failedToDownload();
        }
      },
      failedToDownload () {
        this.$q.notify({
          type: "negative",
          message: this.$t("common.error.response.downloadFail")
        });
      }
    }
  };
</script>

