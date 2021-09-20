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
        q-card
          q-img(:src="getCoverUrl(project)")
          q-card-section
            | {{ project.title }}
          q-card-section
            | {{ project.description }}
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import { GET_USER_TICKETS_CROWDFUNDING } from "@/store/constants/action-constants";
  import CoverImage from "@/assets/png/cover-placeholder.png";
  import ServiceCrowdfundingProject from "./ServiceCrowdfundingProject.vue";

  export default {
    name: "ServiceCrowdfunding",
    components: { ServiceCrowdfundingProject },
    created () {
      this.GET_USER_TICKETS_CROWDFUNDING();
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
        GET_USER_TICKETS_CROWDFUNDING
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