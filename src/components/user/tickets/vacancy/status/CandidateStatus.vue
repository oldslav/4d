<template lang="pug">
  div
    .text-small.text-primary-light.q-mb-xs
      | {{ value.description }}
    q-linear-progress(:value="getState.value" :color="getState.color" size="lg" rounded)
</template>

<script>
  import { RespondStatusesEnum } from "../../../../../store/types/vacancy";

  export default {
    name: "CandidateStatus",
    props: {
      value: {
        type: Object,
        default: () => ({ id: 1, title: "" })
      },
      workflow: {
        type: String,
        default: "applicant",
        validator (val) {
          return ["applicant", "company"].includes(val);
        }
      }
    },
    computed: {
      getState () {
        if (this.workflow === "applicant") {
          return this.getApplicantState;
        }

        return this.getCompanyState;
      },

      getApplicantState (){
        if (this.value.id === RespondStatusesEnum.reject) {
          return { color: "red", value: 1 };
        }

        if (this.value.id === RespondStatusesEnum.job_offer) {
          return { color: "green", value: 1 };
        }

        if (this.value.id === RespondStatusesEnum.not_viewed) {
          return { color: "primary", value: 0 };
        }

        return { color: "orange", value: 0.33 };
      },

      getCompanyState (){
        if (this.value.id === RespondStatusesEnum.reject) {
          return { color: "red", value: 1 };
        }

        if (this.value.id === RespondStatusesEnum.job_offer) {
          return { color: "green", value: 1 };
        }

        if (this.value.id === RespondStatusesEnum.not_viewed) {
          return { color: "primary", value: 0 };
        }

        return { color: "orange", value: 0.33 };
      }
    }
  };
</script>


