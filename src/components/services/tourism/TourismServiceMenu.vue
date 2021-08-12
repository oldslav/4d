<template lang="pug">
  div
    q-item.q-py-md.text-subtitle(clickable active-class="list-item-active" )
      q-item-section.list-item-avatar(avatar)
        q-icon(name="done")
      q-item-section
        | LABEL
</template>
<script>
  export default {
    name: "TourismServiceMenu",
    components: { }
  };
</script>
