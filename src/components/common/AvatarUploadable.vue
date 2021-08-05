<template lang="pug">
  q-file.avatar-uploadable__input(
    :value="avatarImage"
    accept="image/*"
    @input="onInput"
    borderless
  )
    q-avatar.avatar-uploadable(size="10rem")
      img.avatar-img.full-width.full-height.avatar-uploadable__image(
        :src="avatarUrl"
      )
</template>

<script>
  export default {
    name: "AvatarUploadable",
    props: {
      src: {
        type: String,
        default: null
      }
    },
    data () {
      return {
        avatarImage: null
      };
    },
    computed: {
      avatarUrl () {
        return !!this.src ? this.src : require("@/assets/svg/avatar-placeholder.svg");
      }
    },
    methods: {
      onInput (image) {
        this.$emit("input", image);
      }
    }
  };
</script>

<style lang="stylus">
</style>
