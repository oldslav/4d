<template lang="pug">
	q-card.bg-card2.main-section
		.main-section__row.row
			.col.q-pa-md
				slot(name="left")

			q-separator(vertical).gt-sm

			.col-3.q-pa-md
				slot(name="right")
</template>

<script>
  export default {
    name: "DataMainSection"
  };
</script>

<style lang="stylus">
	.main-section
		&__row
			flex-direction column-reverse

			@media (min-width $breakpoint-md-min)
				flex-direction row
</style>