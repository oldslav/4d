<template lang="pug">
  div
    q-list
      q-item.q-py-lg.text-subtitle(clickable :to="{ name: 'map-transport', query: getBackRouteQuery }")
        q-item-section.list-item-avatar(avatar)
          q-icon.text-primary(name="arrow_back")
        q-item-section(avatar)
          | {{ getName }}

    q-separator

    div.q-px-md.q-py-md.q-mb-lg(v-if="getImages.length")
      image-slider(:value="getImages" :slides-to-show="4")

    div.q-px-md.q-mt-lg(v-if="getType")
      div.text-caption.text-grey-8 {{ $t('entity.maps.transport.type') }}
      div {{ getType }}

    div.q-px-md.q-mt-lg(v-if="getFeature.building && getFeature.building.address")
      div.text-caption.text-grey-8 {{ $t('entity.maps.transport.address') }}
      div {{ getAddress }}

    div.q-px-md.q-mt-lg(v-if="getFeature.regulations")
      div.text-caption.text-grey-8 {{ $t('entity.maps.transport.regulations') }}
      div
        a(:href="getFeature.regulations.imagePath" target="_blank").text-blue {{ getFeature.regulations.fileName }}

    div.q-px-md.q-mt-lg(v-if="getFeature.area")
      div.text-caption.text-grey-8 {{ $t('entity.maps.transport.area') }}
      div {{ getArea }}
        sup 2

    div.q-px-md.q-mt-lg(v-if="getFeature.height")
      div.text-caption.text-grey-8 {{ $t('entity.maps.transport.height') }}
      div {{ getFeature.height }}м

    div.q-px-md.q-mt-lg(v-if="getFeature.width")
      div.text-caption.text-grey-8 {{ $t('entity.maps.transport.width') }}
      div {{ getFeature.width }}м

    div.q-px-md.q-mt-lg(v-if="getFeature.length")
      div.text-caption.text-grey-8 {{ $t('entity.maps.transport.length') }}
      div {{ getLength }}

    div.q-px-md.q-mt-lg(v-if="getFeature.manufacturer")
      div.text-caption.text-grey-8 {{ $t('entity.maps.transport.manufacturer') }}
      div {{ getFeature.manufacturer.name }}

    div.q-px-md.q-mt-lg(v-if="getFeature.installedYear")
      div.text-caption.text-grey-8 {{ $t('entity.maps.transport.installedYear') }}
      div {{ getFeature.installedYear }}

    div.q-px-md.q-mt-lg(v-if="getFeature.material")
      div.text-caption.text-grey-8 {{ $t('entity.maps.transport.material') }}
      div {{ getFeature.material.name }}

</template>
<script>
  import { mapGetters } from "vuex";
  import ImageSlider from "../../../common/ImageSlider";

  export default {
    name: "AsideMapsTransportItem",
    components: { ImageSlider },
    computed: {
      ...mapGetters("services", ["pickedFeature"]),
      ...mapGetters("maps/transport", ["getSectionByLayerId", "getFeature"]),
      getBackRouteQuery () {
        const pickedFeature = this.pickedFeature;

        if (!pickedFeature) {
          return {};
        }

        const layerId = pickedFeature.properties.layer;
        const section = this.getSectionByLayerId(layerId);

        return { section: section.id };
      },

      getName () {
        const name = this.getFeature.name;

        if (typeof name === "string") {
          return name;
        } else if (typeof name === "object") {
          return name.name;
        }

        if (this.getFeature.zone) {
          return this.getFeature.zone;
        }

        if (this.getFeature.snipCategory) {
          return this.getFeature.snipCategory.name;
        }

        if (this.getFeature.category) {
          return this.getFeature.category.name;
        }

        return "";
      },

      getType (){
        if (this.getFeature.type) {
          return this.getFeature.type.name;
        }

        return "";
      },

      getImages () {
        return (this.getFeature.images || []).map(x => x.imagePath);
      },

      getLength (){
        const value = this.getFeature.length;

        if (value < 1000) {
          return `${ value } м`;
        }

        const km = value / 1000;
        const fixed = km.toFixed(1);

        const returnValue = km === parseInt(fixed, 10) ? km : fixed.replace(".",",");
        return `${ returnValue } ${ this.$t("entity.services.tourism.labels.km") }`;
      },

      getAddress (){
        const { address } = this.getFeature.building;
        return [ address.street, address.house ].join(", ");
      },

      getArea (){
        const { area } = this.getFeature;

        if (area > 1000) {
          return (area / 1000).toFixed("2") + "км";
        }

        return this.getFeature.area + "м";
      }
    }
  };
</script>
