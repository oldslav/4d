<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
  )
    q-card.full-width
      q-card-section.row.items-center.q-pb-none
        .text-medium
          | {{ getProjectType }}
        q-space
        q-btn(icon="close" flat round dense v-close-popup)
      q-card-section
        .text-medium.q-mb-sm
            q-input(readonly :label="$t('entity.services.crowdfunding.form.title')" :value="info.title" borderless)
        .row.q-col-gutter-sm
          .col-12.col-md-4
            q-input(readonly :label="$t('entity.services.crowdfunding.form.category')" :value="info.category.name" borderless)
        .row.q-col-gutter-sm
          .col-12.col-md-4
            q-input(readonly :label="$t('entity.services.crowdfunding.form.type')" :value="getProjectType" borderless)
          .col-12.col-md-4
            q-input(readonly :label="$t('entity.services.crowdfunding.form.dates.input')" :value="info.endDate" borderless)
        .row.q-col-gutter-sm
          .col-12
            q-input(readonly :label="$t('entity.services.crowdfunding.form.descriptionLabel')" :value="info.description" borderless)
        .row.q-col-gutter-sm
          .text-medium
            | {{ $t("entity.services.crowdfunding.form.loadedMedia") }}
        .row.q-col-gutter-sm.justify-evenly.items-center
          img.image-preview.col-2.q-ml-sm(
            v-for="(image, index) in info.media"
            :key="index"
            :src="getImageSrc(image.imagePath)"
          )
</template>

<script>
  import { mapGetters } from "vuex";
  import BaseModal from "components/common/BaseModal";

  export default {
    name: "TicketCrowdfundingDetailsModal",
    components: { BaseModal },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      info: {
        type: Object,
        default: null
      }
    },
    computed: {
      ...mapGetters(["isEmployee"]),
      getProjectType () {
        return this.isEmployee ? this.$t("entity.services.crowdfunding.form.descriptionLabel") : this.$t("entity.services.crowdfunding.form.descriptionLabel");
      }
    },
    methods: {
      toggleModal (val) {
        this.$emit("input", val);
      },
      getImageSrc (src) {
        return process.env.SERVER_API_HOST + src;
      }
    }
  };
</script>

<style lang="stylus" scoped>
.image-preview
  height: 100%
</style>