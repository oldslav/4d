<template lang="pug">
  q-dialog(
    :value="value"
    :full-height="fullHeight"
    :full-width="isMobile"
    :square="square"
    :persistent="square"
    :position="position"
    :maximized="maximized"
    transition-show="fade"
    transition-hide="fade"
    @input="toggleModal"
  )
    slot
</template>

<script>
  export default {
    name: "BaseModal",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      fullHeight: {
        type: Boolean,
        default: false
      },
      square: {
        type: Boolean,
        default: false
      },
      persistent: {
        type: Boolean,
        default: false
      },
      position: {
        type: String,
        default: "right"
      },
      maximized: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      isMobile () {
        return this.$q.platform.is.mobile;
      }
    },
    methods: {
      toggleModal (value) {
        this.$emit("input", value);
      }
    }
  };
</script>

<style lang="stylus" scoped>
</style>
