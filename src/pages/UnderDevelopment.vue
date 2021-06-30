<template lang="pug">
  q-page.error.column.justify-start.items-center.q-pt-xl.full-height
    h2.text-title.text-center
      | Раздел в разработке
    q-btn(flat @click="back()" color="primary" :label="$t('action.back')")
    q-img.q-mt-xl.development__image(src="@/assets/svg/lady-tag.svg").q-my-md
</template>

<script>
  export default {
    name: "UnderDevelopment",
    methods: {
      back () {
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="stylus">
  .development__image {
    max-width 660px
  }
</style>
