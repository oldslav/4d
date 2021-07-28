<template lang="pug">
  BaseDownloader(v-slot="scope" :value="value")
    q-input(dense borderless readonly :label="!!label ? label : null" :value="value.name")
      template(#append)
        q-icon(name="o_file_download" @click.stop="scope.download").cursor-pointer
</template>

<script>
  import BaseDownloader from "components/common/BaseDownloader";

  export default {
    name: "DownloaderInput",
    components: { BaseDownloader },
    props: {
      value: {
        type: null,
        default: () => ({})
      },
      label: {
        type: String,
        default: ""
      }
    }
  };
</script>
