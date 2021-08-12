<template lang="pug">
  q-list
    q-item.q-py-lg.text-subtitle(clickable to="/services/tourism/layer")
      q-item-section.list-item-avatar(avatar)
        q-icon.text-primary(name="arrow_back")
      q-item-section(avatar)
        | ITEM
    q-separator
</template>

<script>
  export default {
    name: "AsideServicesTourismItem",
    components: {}
  };
</script>
