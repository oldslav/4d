<template lang="pug">
  .row
    .col-6.q-col-gutter-md
      div
        .text-primary-light.text-small
          | {{ $t("entity.tickets.contract.number") }}
        .text-body1
          | {{ contract.number }}
      div
        .text-primary-light.text-small
          | {{ $t("entity.tickets.contract.startDate") }}
        .text-body1
          | {{ contract.startDate | formatDate }}
    .col-6
      .text-body1.text-wrap
        | {{ $t("entity.tickets.contract.message") }}
      .text-right.q-mt-md
        q-btn(color="primary" :label="$t('action.download')" @click="downloadTerms()")
</template>

<script>
  import { mapActions } from "vuex";
  import BaseDownloader from "components/common/BaseDownloader";
  import { DOWNLOAD_FILE } from "@/store/constants/action-constants";

  export default {
    name: "ValidContractState",
    components: { BaseDownloader },
    props: {
      contract: {
        type: Object,
        default: () => ({})
      },
      termination: {
        type: String,
        default: ""
      }
    },
    methods: {
      ...mapActions([DOWNLOAD_FILE]),
      downloadTerms () {
        return this.DOWNLOAD_FILE(this.termination);
      }
    }
  };
</script>
