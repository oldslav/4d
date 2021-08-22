<template lang="pug">
  div.image-carousel(
    :class="{'image-carousel_clickable': fullscreen, 'image-carousel_dark': $q.dark.isActive, 'image-carousel_white': !$q.dark.isActive}"
  )
    q-resize-observer(@resize="onResize")
    div.image-carousel__container(:style="{ width: `${ width }px` }")
        vue-slick-carousel(v-bind="getSettings")
          div.image-carousel__slide(v-for="(image, index) in value" :key="image" @click="onClickSlide(index)")
            div.image-carousel__slide_content
              q-icon.image-carousel__slide_icon(v-if="fullscreen" name="visibility")
              q-img(:src="image" :ratio="1")

        image-gallery(
          :value="value"
          :visible.sync="visibleFullScreen"
          :current.sync="fullScreenImage"
        )
</template>
<script>
  import VueSlickCarousel from "vue-slick-carousel";
  import ImageGallery from "./ImageGallery";
  import "vue-slick-carousel/dist/vue-slick-carousel.css";

  export default {
    components: { ImageGallery, VueSlickCarousel },
    props: {
      value: { type: Array, default: () => [] },
      fullscreen: { type: Boolean, default: true },
      slidesToShow: { type: Number, default: 3 }
    },
    mounted () {
      this.width = this.$el.clientWidth;
    },
    data () {
      return {
        slide: 1,
        visibleFullScreen: false,
        fullScreenImage: null,
        width: 0
      };
    },
    computed: {
      getSettings () {
        return {
          arrows: true,
          dots: false,
          focusOnSelect: true,
          infinite: false,
          speed: 500,
          slidesToShow: this.slidesToShow,
          slidesToScroll: 1,
          touchThreshold: this.slidesToShow
        };
      }
    },
    methods: {
      onClickSlide (index) {
        this.fullScreenImage = index;
        this.visibleFullScreen = true;
      },

      onResize (size) {
        this.widt = size.width;
      }
    }
  };
</script>
<style lang="stylus">
@import "../../css/_colors.styl";

.image-carousel__container
  margin 0 -2px 0 -2px
  box-sizing: border-box

.image-carousel__slide
  position relative
  margin 6px 0
  padding 0 4px
  box-sizing border-box

.image-carousel_clickable .image-carousel__slide:hover
  cursor pointer

.image-carousel__slide_content
  position relative
  left 0
  top 0
  width 100%
  height 100%
  padding 3px
  box-sizing border-box
  border-radius: 4px;
  box-shadow 1px 1px 4px rgba(0, 0, 0, 45%)

  img
    width 100%
    height 100%

.image-carousel_white .image-carousel__slide_content
  background $background

.image-carousel_dark .image-carousel__slide_content
  background $primary

.image-carousel .slick-arrow
  width: 20px
  height: 20px
  box-shadow: 0 0 2px rgba(48, 56, 76, 0.14), 0 2px 2px rgba(48, 56, 76, 0.12), 0 1px 3px rgba(48, 56, 76, 0.2);
  font-size: 0;
  outline: none;
  border: 0;
  border-radius: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index 2

  &:hover
    cursor pointer

  &:before
    content: " ";
    width: 0;
    height: 0;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 4px solid;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left 0
    margin: auto;

  &.slick-prev
    left: 0;
    margin-left -8px
    transform: rotate(180deg);

  &.slick-next
    right: 0
    margin-right -8px

  &.slick-disabled
    visibility hidden

.image-carousel_white .slick-arrow
  background $background

.image-carousel_dark .slick-arrow
  background $dark-secondary

.image-carousel_white .slick-arrow:before
  border-left-color #333

.image-carousel_dark .slick-arrow:before
  border-left-color $primary

.image-carousel__slide_icon
  font-size 24px
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  opacity: 0;

.image-carousel_white .image-carousel__slide_icon
  color $primary

.image-carousel_dark .image-carousel__slide_icon
  color $light

.image-carousel__slide:hover .image-carousel__slide_icon
  opacity: 0.8
</style>
