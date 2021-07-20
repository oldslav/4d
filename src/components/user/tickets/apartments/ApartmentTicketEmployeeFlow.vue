<template lang="pug">

</template>

<script>
  export default {
    name: "ApartmentTicketEmployeeFlow",
    props: {
      value: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      stepsValue () {
        if (this.value.id === 11) return 1;
        if (this.value.id === 12) return 2;
        if (this.value.id === 3) return 3;
        if ([5, 6, 7].includes(this.value.id)) return 4;
      }
    }
  };
</script>
