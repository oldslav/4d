<template lang="pug">
  div.verify-company-card.full-height.column
    div
      h4.text-center {{ $t('user.verifyCompany.requestCard.title') }}
      div.text-body1.text-center
        | {{ $t('user.verifyCompany.requestCard.firstDescPart') }}
        span.q-px-sm.text-blue.verify-company-card__link(@click="onClickSendRequest") {{ $t('user.verifyCompany.requestCard.action') }}
        | {{ $t(`user.verifyCompany.requestCard.${service}-description`) }}
    div.verify-company-card__image.flex-break.flex.items-center.justify-center
      img(src="@/assets/svg/verify-company-placeholder.svg")

</template>
<script>
  export default {
    props: {
      service: { type: String, default: "" }
    },
    methods:{
      onClickSendRequest (){
        this.$emit("request");
      }
    }
  };
</script>
<style lang="stylus">
.verify-company-card__image
  text-align center
  img
    max-width: 50%;
    max-height: 50%;

.verify-company-card__link
  text-decoration underline
  &:hover
    text-decoration none
    cursor pointer
</style>
