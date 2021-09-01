<template lang="pug">
  div(v-if="visible")
    q-carousel.image-gallery(
      v-model="currentSlide"
      :fullscreen="true"
      swipeable
      animated
      arrows
    )
      q-carousel-slide(
        v-for="(image, index) in value"
        :key="index"
        :name="index"
      )
        div.image-gallery__item
          q-img(:src="image" contain)
      template(v-slot:control)
        q-carousel-control(position="top-right" :offset="[18, 18]")
          q-btn(
            round
            dense
            color="white"
            text-color="primary"
            icon="close"
            @click="close"
          )
</template>
<script>
  export default {
    name: "ImageGallery",
    props: {
      value: { type: Array, default: () => [] },
      visible: { type: Boolean, default: false },
      current: { type: Number, default: 0 }
    },

    created () {
      this.onKeyDown = this.onKeyDown.bind(this);
    },

    mounted () {
      this.$watch("visible", this.onChangeVisible);
    },

    data () {
      return {
        currentSlide: null
      };
    },

    methods: {
      close () {
        this.$emit("update:visible", false);
      },

      onChangeVisible (val) {
        if (val) {
          this.addKeyboardListener();
        } else {
          this.removeKeyboardListener();
        }
      },

      addKeyboardListener () {
        window.addEventListener("keydown", this.onKeyDown, true);
      },

      removeKeyboardListener () {
        window.removeEventListener("keydown", this.onKeyDown, true);
      },

      onKeyDown (e) {
        if (e.key === "Escape") {
          this.close();
        }
      }
    },

    watch: {
      current (val) {
        this.currentSlide = val;
      },

      currentSlide (val) {
        this.$emit("update:current", val);
      }
    }
  };
</script>
<style lang="stylus">
.image-gallery
  background rgba(0, 0, 0, 0.8)

.image-gallery__item
  overflow: hidden;
  display: block;
  height: 100%;
  width: 100%;

  .q-img
    max-width: 100%;
    max-height: 100%;
</style>
