<template lang="pug">
	.data-carousel
		VueSlickCarousel(v-bind="settings")
			template(#prevArrow)
				.data-carousel__arrow--prev
					img(:src="require('@/assets/svg/data/arrowLeft.svg')")

			q-card.data-carousel__card.q-pa-md.full-height.text-center(
				v-for="(card, index) in list"
				:key="index"
			)
				.col-grow.row.column.justify-center.items-center
					.col-auto
						img(:src="require(`@/assets/svg/data/${ card.icon }`)")
					.col-auto
						| {{ card.data }}
					.col-grow.row.justify-center.items-center
						| {{ card.name }}

				q-separator.q-my-sm

				.col-auto.row
					.col.row.column.justify-center.items-center
						div
							| {{ card.leftSectionData }}
						div.data-carousel__small-text
							| {{ card.leftSectionName }}

					q-separator(vertical)
					
					.col.row.column.justify-center.items-center
						div
							| {{ card.rightSectionData }}
						div.data-carousel__small-text
							| {{ card.rightSectionName }}
			
			template(#nextArrow)
				.data-carousel__arrow--next
					img(:src="require('@/assets/svg/data/arrowRight.svg')")
</template>

<script>
	import VueSlickCarousel from "vue-slick-carousel";
	import "vue-slick-carousel/dist/vue-slick-carousel.css";

	export default {
		name: "DataCarousel",
		components: {
			VueSlickCarousel
		},
		props: {
      list: {
        type: Array,
        default () {
          return [];
        }
      }
    },
		data () {
			return {
				settings: {
					infinite: false,
					slidesToShow: 4,
					responsive: [
						{
							breakpoint: 1600,
							settings: {
								slidesToShow: 3
							}
						},
						{
							breakpoint: 1300,
							settings: {
								slidesToShow: 2
							}
						},
						{
							breakpoint: 550,
							settings: "unslick",
							adaptiveHeight: true
						}
					]
				}
			};
		}
	};
</script>

<style lang="stylus">
	.data-carousel
		&__card
			margin 0 $space-base
			display flex!important
			flex-direction column

			&:not(:first-of-type)
				margin-top $space-base

			@media (min-width 550px)
					margin 0

		&__arrow
			position absolute
			top calc(50% - 13px)
			z-index 100
			cursor pointer

			&--prev
				@extends .data-carousel__arrow
			
			&--next
				@extends .data-carousel__arrow
				right 0

			img 
				width 26px
				height 26px

		&__small-text
			font-size 12px
		
		.slick-disabled
			display none

		.slick-track
			display: flex !important;
			align-items stretch

		.slick-slide 
			padding 3px $space-base*0.5
			height inherit

			> div
				height 100%
</style>