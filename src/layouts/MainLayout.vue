<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'MainLayout',
  preFetch ({ store, ssrContext, currentRoute }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return store.dispatch('serverInit', { ssrContext, currentRoute })
  },
  mounted () {
    this.$store.dispatch('browserInit')
  }
})
</script>
