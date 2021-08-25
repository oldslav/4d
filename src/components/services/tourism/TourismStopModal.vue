<template lang="pug">
  BaseModal.q-pa-xs-none(
    :value="value"
    position="standard"
    persistent
    @input="toggleModal"
  )
    q-card.full-width.new-tourism-route-card
      q-card-section.row.items-center
        .text-medium(v-if="entity")
          | {{ entity.properties.name }}
        q-space
        q-btn(icon="close" flat round dense v-close-popup)

      q-separator

      q-card-section(v-if="entity")
        div(v-show="entity.properties.description")
          div.text-caption.text-grey-8 {{ $t('entity.services.tourism.labels.description') }}
          div.text-body2.rich-text.break-spaces {{ entity.properties.description }}

        div.q-mt-md(v-show="entity.properties.images.length > 0")
          div.text-caption.text-grey-8 {{ $t('entity.services.tourism.labels.photos') }}
          image-slider(:value="entity.properties.images" :slides-to-show="5")
</template>

<script>
  import BaseModal from "../../common/BaseModal";
  import ImageSlider from "../../common/ImageSlider";

  export default {
    name: "TourismStopModal",
    components: { BaseModal, ImageSlider },
    props: {
      value: { type: Boolean, default: false },
      entity: { type: Object, default: () => ({}) }
    },
    computed: {
      getImages (){
        return [];
      }
    },

    methods: {
      toggleModal (val) {
        this.$emit("input", val);
      },

      close (){
        this.toggleModal(false);
      }
    }
  };
</script>

<style scoped>
.new-tourism-route-card {
  max-width: 472px;
}
</style>
