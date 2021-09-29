<template lang="pug">
	q-btn.btn-back.full-width.q-py-sm.q-pt-md-md.text-primary(
		@click="$router.push('/data')"
		flat
		no-caps
		:ripple="false"
		align="left"
		icon="arrow_back"
	)
		span.q-ml-md.text-black.text-subtitle
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

		@media (min-width $breakpoint-md-min)
			background-color transparent
			border-bottom none
</style>