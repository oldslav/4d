<template lang="pug">
  div
    .text-small.text-primary-light.q-mb-xs
      | {{ value.description }}
    q-linear-progress(:value="getState.value" :color="getState.color" size="lg" rounded)
</template>

<script>
  import { CompanyVerificationRequestStatuses } from "../../../../store/types/user/company";

  export default {
    name: "VerificationRequestStatus",
    props: {
      value: {
        type: Object,
        default: () => ({ id: 1, title: "" })
      }
    },
    computed: {
      getState () {
        if (CompanyVerificationRequestStatuses.rejected === this.value.id) {
          return { color: "red", value: 1 };
        }

        if (CompanyVerificationRequestStatuses.approved === this.value.id) {
          return { color: "green", value: 1 };
        }

        return { color: "orange", value: 0.33 };
      }
    }
  };
</script>


