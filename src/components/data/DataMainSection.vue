<template lang="pug">
	q-card.bg-card2.main-section
		.main-section__row.row.q-py-md
			.col-12.col-md.q-px-md
				.text-subtitle.gt-sm
					| {{ title }}
				slot(name="left")

			q-separator(vertical).gt-sm

			.col-12.col-md-3.q-px-md.main-section__right-section
				.text-subtitle.lt-md.q-mb-md
					| {{ title }}
				slot(name="right")
</template>

<script>
  export default {
    name: "DataMainSection",
		props: {
			title: {
				type: String,
				default () {
					return "";
				}
			}
		}
  };
</script>

<style lang="stylus">
	.main-section
		&__row
			flex-direction column-reverse

			@media (min-width $breakpoint-md-min)
				flex-direction row
		
		&__right-section
			min-width 285px!important
</style>