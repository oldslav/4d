<template lang="pug">
  div.verify-company-card.full-height.column
    div
      h4.text-center.rich-text {{ $t('user.verifyCompany.awaitCardText') }}
    div.verify-company-card__image.flex-break.flex.items-center.justify-center
      img(src="@/assets/svg/big-tablet.svg")
</template>
