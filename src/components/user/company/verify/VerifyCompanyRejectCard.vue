<template lang="pug">
  div.verify-company-card.full-height.column
    div
      h4.text-center Ваша заявка на верификацию компании отклонена
    div.verify-company-card__image.flex-break.flex.items-center.justify-center
      img(v-if="!$q.dark.isActive" src="@/assets/svg/welcome/5.svg")
      img(v-if="$q.dark.isActive" src="@/assets/svg/welcome/5-dark.svg")
</template>
