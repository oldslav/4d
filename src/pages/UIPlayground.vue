<template lang="pug">
  q-page.q-mx-xl.q-my-lg
    BaseTabs(v-model="tab")
      q-route-tab(:to="{ name: 'playground-buttons' }" name="buttons" label="Buttons")
      q-route-tab(:to="{ name: 'playground-inputs' }" name="inputs" label="Inputs")
      q-route-tab(:to="{ name: 'playground-selects' }" name="selects" label="Selects")

    transition(name="fade" mode="out-in")
      router-view
</template>

<script>
  // TODO: Сделать Autocomplete отдельным компонентом
  // TODO: Сделать Select отдельным компонентом (предпосылка - кастомные айтемы слишком многословны, нужна обёртка)

  import BaseTabs from "components/common/BaseTabs";

  export default {
    name: "UIPlayground",
    components: { BaseTabs },
    data () {
      return {
        tab: "buttons"
      };
    }
  };
</script>

<style lang="stylus">

</style>
