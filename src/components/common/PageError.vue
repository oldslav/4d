<template lang="pug">
  div.page-error
    div.text-h4.text-center
      | {{ title }}
    div.text-body1.text-center.q-mt-lg(v-if="subtitle")
      | {{ subtitle }}
    div.text-center.q-mt-lg(v-if="retryLabel")
      q-btn(
        color="primary"
        :label="retryLabel"
        @click="$emit('retry')"
      )
</template>
<script>
  export default {
    props:{
      title: { type: String, default:"" },
      subtitle: { type: String, default:"" },
      retryLabel: { type: [String, Boolean], default:"" }
    }
  };
</script>
