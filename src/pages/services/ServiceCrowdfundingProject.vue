<template lang="pug">
  div
    .row.items-center
      q-icon.text-primary.q-mr-lg.back-icon.cursor-pointer(
        name="arrow_back"
        @click="$emit('close-project')"
      )
      .text-medium
        | {{ $t("action.back") }}
    .row
      .col-8.q-pr-md
        .row
          .text-title
            | {{ project.title }}
        .row
          q-card.q-pa-lg.full-width
            q-card-section
              | {{ project.description }}
      .col-4(v-if="project.media && project.media.length > 0")
        q-card.full-width
          q-card-section
            .row
              q-img(:src="getImageUrl(project.media[0].imagePath)")
            .row.items-center
              .col-3.q-pa-sm(
                v-for="(image, index) in project.media.slice(1)"
                :key="index"
              )
                q-img(:src="getImageUrl(image.imagePath)")


</template>

<script>

  export default {
    name: "ServiceCrowdfundingProject",
    props: {
      project: {
        type: Object,
        default: () => {}
      }
    },
    methods: {
      getImageUrl (imagePath) {
        return process.env.SERVER_API_HOST + imagePath;
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .back-icon
    font-size: 1.4rem
</style>