<template lang="pug">
  q-linear-progress(:value="value/10" :color="statusesColors[value/10]" size="lg" rounded)
</template>

<script>
  export default {
    name: "BaseStatus",
    props: {
      value: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        statusesColors: {
          0.1: "primary",
          0.2: "primary",
          0.3: "primary",
          0.4: "primary",
          0.5: "red",
          0.6: "primary",
          0.7: "primary",
          0.8: "primary",
          0.9: "primary"
        }
      };
    }
  };
</script>

<style scoped>

</style>
