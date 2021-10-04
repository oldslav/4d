<template lang="pug">
	q-btn.btn-back.full-width.q-py-sm.q-pt-md-md(
		@click="$router.push('/data')"
		flat
		no-caps
		:ripple="false"
		align="left"
	)
		q-icon.text-primary(name="arrow_back")
		span.q-ml-md.text-subtitle
			| {{ $t("action.back") }}
</template>

<script>
  export default {
    name: "BtnBack"
  };
</script>

<style lang="stylus">
	.btn-back
		background-color white
		max-height none
		border-bottom 1px solid rgba(0, 0, 0, 0.12)

		.body--dark &
			background-color var(--q-color-dark)

		@media (min-width $breakpoint-md-min)
			background-color transparent
			border-bottom none

			.body--dark &
				background-color: transparent
</style>