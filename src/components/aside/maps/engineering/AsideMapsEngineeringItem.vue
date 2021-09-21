<template lang="pug">
  div
    q-list
      q-item.q-py-lg.text-subtitle(clickable :to="{ name: 'map-engineering', query: getBackRouteQuery }")
        q-item-section.list-item-avatar(avatar)
          q-icon.text-primary(name="arrow_back")
        q-item-section(avatar)
          | {{ getFeature.category.name }}

    q-separator

    div.q-px-md.q-mt-lg
      div.text-caption.text-grey-8 {{ $t('entity.maps.engineering.name') }}
      div {{ getFeature.name || getFeature.refName || getFeature.layer }}

    div.q-px-md.q-mt-lg(v-if="getFeature.diameter")
      div.text-caption.text-grey-8 {{ $t('entity.maps.engineering.diameter') }}
      div {{ getDiameter }}{{ $t('entity.maps.engineering.centimeter') }}

    div.q-px-md.q-mt-lg(v-if="getFeature.hatchRingMark")
      div.text-caption.text-grey-8 {{ $t('entity.maps.engineering.hatchRingMark') }}
      div {{ getHatchRingMark }}{{ $t('entity.maps.engineering.meter') }}

    div.q-px-md.q-mt-lg(v-if="getFeature.gasketTopMark")
      div.text-caption.text-grey-8 {{ $t('entity.maps.engineering.gasketTopMark') }}
      div {{ getGasketTopMark }}{{ $t('entity.maps.engineering.meter') }}

    div.q-px-md.q-mt-lg(v-if="getFeature.bottomMark")
      div.text-caption.text-grey-8 {{ $t('entity.maps.engineering.bottomMark') }}
      div {{ getBottomMark }}{{ $t('entity.maps.engineering.meter') }}

    div.q-px-md.q-mt-lg(v-if="getFeature.elevation")
      div.text-caption.text-grey-8 {{ $t('entity.maps.engineering.elevation') }}
      div {{ getFeature.elevation }}

</template>
<script>
  import { mapGetters } from "vuex";

  export default {
    name: "AsideMapsEngineeringItem",
    computed: {
      ...mapGetters("services", ["pickedFeature"]),
      ...mapGetters("maps/engineering", ["getSectionByLayerId", "getFeature"]),
      getBackRouteQuery (){
        const pickedFeature = this.pickedFeature;

        if (!pickedFeature) {
          return {};
        }

        const layerId = pickedFeature.properties.layer;
        const section = this.getSectionByLayerId(layerId);

        return { section: section.id };
      },
      getDiameter (){
        return (this.getFeature.diameter / 10).toFixed(1);
      },

      getHatchRingMark (){
        return (parseFloat(this.getFeature.hatchRingMark, 10) / 100).toFixed(1);
      },

      getGasketTopMark (){
        return (parseFloat(this.getFeature.gasketTopMark, 10) / 100).toFixed(1);
      },

      getBottomMark (){
        return (parseFloat(this.getFeature.bottomMark, 10) / 100).toFixed(1);
      }
    }
  };
</script>
