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
    // globalStatus () {
    //   const inProgress = [3, 5, 6, 7, 10, 11, 12];
    //   if (inProgress.includes(this.value)) {
    //     return {
    //       color: "orange",
    //       value: 0.5,
    //       status: "В работе"
    //     };
    //   }
    //   if (this.value === 8) {
    //     return {
    //       color: "status-green",
    //       value: 0.75,
    //       status: "Действие договора"
    //     };
    //   }
    //   if (this.value === 4) {
    //     return {
    //       color: "red",
    //       value: 1,
    //       status: "Отклонена"
    //     };
    //   }
    //   if (this.value === 9) {
    //     return {
    //       color: "red",
    //       value: 1,
    //       status: "Отменена"
    //     };
    //   }
    //   if (this.value === 2) {
    //     return {
    //       color: "primary",
    //       value: 0.25,
    //       status: "На рассмотрении"
    //     };
    //   }
    //   return {
    //     color: "primary",
    //     value: 0,
    //     status: "Черновик"
    //   };
    // }
    }
  };
</script>


