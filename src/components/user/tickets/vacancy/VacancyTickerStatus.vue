<template lang="pug">
  div
    .text-small.text-primary-light.q-mb-xs
      | {{ value.description }}
    q-linear-progress(:value="getState.value" :color="getState.color" size="lg" rounded)
</template>

<script>
  export default {
    name: "VacancyTickerStatus",
    props: {
      value: {
        type: Object,
        default: () => ({ id: 1, title: "" })
      }
    },
    computed: {
      getState () {
        if (this.value.id === 1) {
          return { color: "primary", value: 0 };
        }

        if (this.value.id === 2) {
          return { color: "primary", value: 0.5 };
        }

        if (this.value.id === 3) {
          return { color: "red", value: 1 };
        }

        if (this.value.id === 4) {
          return { color: "status-green", value: 1 };
        }

        return { color: "red", value: 1 };
      }
    }
  };
</script>


