<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent, onCreated } from '@vue/composition-api'
import { onCreated } from 'vue'

export default defineComponent({
  name: 'App',

  created () {
    this.$q.iconMapFn = iconName => {
      if (iconName.startsWith('app:')) {
        return { cls: iconName.replace('app:', 'icon-') }
      }
      return iconName
    }
  }
})
</script>
