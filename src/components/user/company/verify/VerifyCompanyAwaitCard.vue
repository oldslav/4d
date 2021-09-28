<template lang="pug">
  div.verify-company-card.full-height.column
    div
      h4.text-center.rich-text {{ $t("user.verifyCompany.awaitCardText") }}
    div.verify-company-card__image.flex-break.flex.items-center.justify-center
      img(:src="bigTabletImg")
</template>

<script>
  export default {
    computed: {
      isDarkMode () {
        return this.$q.dark.isActive;
      },
      bigTabletImg () {
        return this.isDarkMode ? require("@/assets/svg/dark/big-tablet-dark.svg") : require("@/assets/svg/light/big-tablet.svg");
      }
    }
  };
</script>
