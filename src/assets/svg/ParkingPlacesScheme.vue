<template lang="pug">
  component(
    :is="getComponent"
    v-if="getComponent"
    v-bind="getProps"
    :class="spriteName"
  )
</template>

<script>
  export default {
    name: "ParkingPlacesScheme",
    props: {
      spriteName: {
        type: String,
        default: null
      },
      iconId: {
        type: String,
        default: null
      },
      iconColor: {
        type: String,
        default: null
      }
    },

    data () {
      return { baseColor: "black" };
    },

    computed: {
      getComponent () {
        const { iconId, spriteName } = this;
        return !iconId ? null : require(`./${ spriteName }/${ iconId }`).default;
      },

      getColor () {
        const { baseColor, iconColor } = this;
        return iconColor || baseColor;
      },

      getProps () {
        const { getColor, $attrs } = this;
        return { color: getColor, ...$attrs, iconColor: undefined };
      }
    }
  };
</script>

<style lang="stylus" scoped>
  ::v-deep svg
    max-width: 100%
    max-height: 100%

  .parking-places
    height: 300px
    width: 100%
</style>
