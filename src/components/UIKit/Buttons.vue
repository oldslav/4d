<template lang="pug">
  div
    .text-h1.ui__title BUTTONS

    .buttons__list
      IconButton(
        icon="app:pet"
        label="IconButton"
      )
      BorderButton(label="BorderButton")
      BaseButton(label="BaseButton")
      TextButton(label="TextButton")
      ActionIconButton(:icon="matAdd" label="ActionIconButton" style="width: 260px")
      ActionBorderButton(:icon="matAdd" label="ActionBorderButton" style="width: 260px")
      LikeButton(:icon="matFavoriteBorder" :active-icon="matFavorite" :count="43" activeColor="#CE5050")
      LikeButton(:icon="matHourglassEmpty" :active-icon="matHourglassFull" :count="43" activeColor="#0E8AFD")
      LikeButton(
        :icon="matFavoriteBorder"
        :active-icon="matFavorite"
        :count="43"
        activeColor="#CE5050"
        :active="true"
      )
      LikeButton(
        :icon="matHourglassEmpty"
        :active-icon="matHourglassFull"
        :count="43"
        activeColor="#0E8AFD"
        :active="true"
      )
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import IconButton from 'components/UIKit/buttons/IconButton.vue'
import BaseButton from 'components/UIKit/buttons/BaseButton.vue'
import BorderButton from 'components/UIKit/buttons/BorderButton.vue'
import TextButton from 'components/UIKit/buttons/TextButton.vue'
import ActionIconButton from 'components/UIKit/buttons/ActionIconButton.vue'
import ActionBorderButton from 'components/UIKit/buttons/ActionBorderButton.vue'
import LikeButton from 'components/UIKit/buttons/LikeButton.vue'
import {
  matAdd,
  matFavoriteBorder,
  matFavorite,
  matHourglassEmpty,
  matHourglassFull
} from '@quasar/extras/material-icons'

export default defineComponent({
  components: {
    IconButton,
    BaseButton,
    BorderButton,
    TextButton,
    ActionIconButton,
    ActionBorderButton,
    LikeButton
  },
  setup () {
    return {
      matAdd,
      matFavoriteBorder,
      matFavorite,
      matHourglassEmpty,
      matHourglassFull
    }
  }
})
</script>

<style lang="stylus" scoped>
.buttons__list > *
  margin 15px
</style>
