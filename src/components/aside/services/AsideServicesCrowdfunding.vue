<template lang="pug">
  q-list
    q-item.q-py-lg.text-subtitle(clickable @click="$router.back()")
      q-item-section.list-item-avatar(avatar)
        q-icon.text-primary(name="arrow_back")
      q-item-section(avatar)
        | {{ $t("action.back") }}
    q-separator
    
</template>

<script>
  export default {
    name: "AsideServicesCrowdfunding"
  };
</script>
