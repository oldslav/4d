<template lang="pug">
	.data-carousel
		VueSlickCarousel(v-bind="settings")
			template(#prevArrow)
				.data-carousel__arrow--prev
					img(:src="require('@/assets/svg/data/arrowLeft.svg')")

			q-card.bg-card2.data-carousel__card.q-pa-md.text-center(
				v-for="(card, index) in list"
				:key="index"
			)
				.column.justify-between.full-height
					.col-auto
						.column.justify-center.full-height
							.col-auto
								img(:src="require(`@/assets/svg/data/${ card.icon }`)")
							.col-auto.text-h6
								| {{ card.data }}
							.col-auto(:class="{'data-carousel__small-text': card.isSmall}")
								| {{ card.name }}
						q-separator.q-my-sm
						
					.col-3
						.row.items-center.full-height
							.col
								div
									| {{ card.leftSectionData }}
								div.data-carousel__small-text.text-grey-7
									| {{ card.leftSectionName }}

							q-separator(vertical)
								
							.col
								div
									| {{ card.rightSectionData }}
								div.data-carousel__small-text.text-grey-7
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
					swipeToSlide: true,
          responsive: [
            {
              breakpoint: 1875,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 1515,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 1150,
              settings: "unslick"
            },
						{
              breakpoint: 1123,
              settings: {
                slidesToShow: 2
              }
            },
						{
              breakpoint: 750,
              settings: "unslick"
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
			height 232px
			margin 0 $space-base

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