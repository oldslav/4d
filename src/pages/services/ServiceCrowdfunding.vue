<template lang="pug">
  q-page.q-pa-lg.bg-blue
    ServiceCrowdfundingProject(
      v-if="isProjectOpened"
      :project="openedProject"
      @close-project="closeProject"
    )
    .row(v-else-if="projects")
      .col-3.q-pa-md.cursor-pointer(
        v-for="(project, index) in projects.items"
        :key="index"
        @click="openProject(project)"
      )
        q-card.card
          q-img.cover-image(:src="getCoverUrl(project)")
          q-card-section.title.text-body1
            | {{ project.title }}
          q-card-section.description.text-body2
            | {{ project.description }}
          q-card-section.author.text-body2.row.items-end
            | {{ project.author.name.first }} {{ project.author.name.last }}
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import { GET_ALL_TICKETS_CROWDFUNDING } from "@/store/constants/action-constants";
  import CoverImage from "@/assets/png/cover-placeholder.png";
  import ServiceCrowdfundingProject from "./ServiceCrowdfundingProject.vue";

  export default {
    name: "ServiceCrowdfunding",
    components: { ServiceCrowdfundingProject },
    created () {
      this.GET_ALL_TICKETS_CROWDFUNDING();
    },
    data () {
      return {
        isProjectOpened: false,
        openedProject: {}
      };
    },
    computed: {
      ...mapState("user/tickets/crowdfunding", {
        projects: state => state.data
      })
    },
    methods: {
      ...mapActions("user/tickets/crowdfunding", [
        GET_ALL_TICKETS_CROWDFUNDING
      ]),
      getCoverUrl (project) {
        if (project && project.cover && project.cover.imagePath) {
          return process.env.SERVER_API_HOST + project.cover.imagePath;
        }
        return CoverImage;
      },
      openProject (project) {
        this.isProjectOpened = true;
        this.openedProject = project;
      },
      closeProject () {
        this.isProjectOpened = false;
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .card
    height: 370px
  .cover-image
    height: 200px
  .title
    height: 60px
  .description
    height: 50px
    overflow: hidden
    text-overflow: ellipsis
    color: #666666
  .author
    height: 50px
    color: #666666
</style>
