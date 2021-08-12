<template lang="pug">
  aside-router-view(name="asideTourismLayer")
    q-list
      q-item.q-py-lg.text-subtitle(clickable to="/services")
        q-item-section.list-item-avatar(avatar)
          q-icon.text-primary(name="arrow_back")
        q-item-section(avatar)
          | {{ $t("entity.tourism") }}

      q-separator

      tourism-service-item-info
</template>

<script>
  import AsideRouterView from "./AsideRouterView";
  import TourismServiceItemInfo from "../../services/tourism/TourismServiceItemInfo";

  export default {
    name: "AsideServicesTourism",
    components: { AsideRouterView, TourismServiceItemInfo }
  };
</script>
