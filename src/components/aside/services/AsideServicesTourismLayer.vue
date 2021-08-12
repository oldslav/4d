<template lang="pug">
  aside-router-view(name="asideTourismItem")
    q-list
      q-item.q-py-lg.text-subtitle(clickable to="/services")
        q-item-section.list-item-avatar(avatar)
          q-icon.text-primary(name="arrow_back")
        q-item-section(avatar)
          | LAYER
      q-separator
</template>

<script>
  import AsideRouterView from "./AsideRouterView";
  export default {
    name: "AsideServicesTourismLayer",
    components: { AsideRouterView }
  };
</script>
