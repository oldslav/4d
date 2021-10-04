<template lang="pug">
  div
    .text-small.text-primary-light.q-mb-xs
      | {{ $options.filters.i18nName(value ,'text') || value.text  }}
    q-linear-progress(:value="getState.value" :color="getState.color" size="lg" rounded)
</template>

<script>
  import { VacancyStatusesEnum } from "../../../../../store/types/vacancy";

  export default {
    name: "VacancyTicketStatus",
    props: {
      value: {
        type: Object,
        default: () => ({ id: 1, title: "" })
      },
      workflow: {
        type: String,
        default: "company",
        validator (val) {
          return ["manager", "company"].includes(val);
        }
      }
    },
    computed: {
      getState () {
        if (this.workflow === "company") {
          return this.getCompanyState;
        }

        return this.getManagerState;
      },

      getCompanyState (){
        if (this.value.id === VacancyStatusesEnum.published) {
          return { color: "green", value: 1 };
        }

        if (this.value.id === VacancyStatusesEnum.rejected) {
          return { color: "red", value: 1 };
        }

        if (this.value.id === VacancyStatusesEnum.closed) {
          return { color: "grey", value: 1 };
        }

        return { color: "orange", value: 0.33 };
      },

      getManagerState (){
        return this.getCompanyState;
      }
    }
  };
</script>


