<template lang="pug">
  q-btn.like-button.text-medium(
    :disable="disable"
    rounded
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  )
    q-icon :name="buttonIcon" :style="iconStyles" />
    .like-button__label {{ count }}
</template>

<script>
  import { defineComponent, ref, computed } from "@vue/composition-api";

  export default defineComponent({
    name: "LikeButton",
    props: {
      icon: {
        type: String,
        default: ""
      },
      count: {
        type: Number,
        default: 0
      },
      disable: {
        type: Boolean,
        default: false
      },
      activeColor: {
        type: String,
        default: ""
      },
      active: {
        type: Boolean,
        default: false
      },
      activeIcon: {
        type: String,
        default: ""
      }
    },

    setup (props) {
      const hover = ref(false);

      const buttonIcon = computed(() => {
        if (props.active) {
          return props.activeIcon || props.icon;
        }
        return props.icon;
      });

      const iconStyles = computed(() => {
        if (props.disabled) {
          return { opacity: 0.6 };
        }
        if (props.active || hover.value) {
          return {
            color: props.activeColor,
            opacity: 1
          };
        }
        return {
          color: "#FFFFFF",
          opacity: 0.6
        };
      });

      return {
        hover,
        buttonIcon,
        iconStyles
      };
    }
  });
</script>

<style lang="stylus" scoped>
.like-button.q-btn
  background $dark-theme-light
  box-shadow 0 0 2px rgba(48, 56, 76, 0.14), 0px 2px 2px rgba(48, 56, 76, 0.12), 0px 1px 3px rgba(48, 56, 76, 0.2)

  .like-button__label
    color #ffffff

  .q-icon
    margin-right 6px

  &.disabled
    background $grey !important

    .q-icon, .like-button__label
      color rgba(102, 102, 102, 0.8) !important

  &:focus
    background $dark-theme-medium
</style>
