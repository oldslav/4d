<template lang="pug">
  q-list
    q-item.q-py-lg.text-subtitle(clickable :to="backRoute")
      q-item-section.list-item-avatar(avatar)
        q-icon.text-primary(name="arrow_back")
      q-item-section(avatar)
        | {{ getBuilding.name }}

    q-separator(v-if="getCommerce.length")

    q-tabs.text-grey(
      v-if="getCommerce.length"
      v-model="tab"
      active-color="primary"
      indicator-color="primary"
      dense
    )
      q-tab(name="info" :label="$t('entity.maps.buildings.buildingDescription')")
      q-tab(name="commerce" :label="$t('entity.maps.buildings.buildingCommerce')")

    q-separator
    q-tab-panels(v-model="tab" animated style="background: transparent")
      q-tab-panel.no-padding(name="info")
        div.q-px-md.q-py-md(v-if="getImages.length > 0")
          image-slider(:value="getImages" :slides-to-show="4")

        div.row.q-py-lg(
          v-if="('residentsCount' in getBuilding) || ('organizationCount' in getBuilding)"
          :class="{'building-info': !$q.dark.isActive, 'q-dark': $q.dark.isActive}"
        )
          div.col-6.q-px-md(
            v-if="('residentsCount' in getBuilding)"
            :class="{ 'building-info-col_bordered': 'organizationCount' in getBuilding }"
          )
            div.text-caption.text-grey-8 {{ $t('entity.maps.buildings.residentsCount') }}
            div {{ getBuilding.residentsCount }}

          div.col-6.q-px-md(v-if="('organizationCount' in getBuilding)")
            div.text-caption.text-grey-8 {{ $t('entity.maps.buildings.organizationCount') }}
            div {{ getBuilding.organizationCount }}

        div.q-px-md.q-mt-lg(v-if="getBuilding.address")
          div.text-caption.text-grey-8 {{ $t('entity.maps.buildings.address') }}
          div {{ getBuilding.address.street }}, {{ getBuilding.address.house }}

        div.row.q-mt-md(v-if="getBuilding.floors || getBuilding.parkingCount")
          div.col-6.q-px-md(v-if="getBuilding.floors")
            div.text-caption.text-grey-8 {{ $t('entity.maps.buildings.floors') }}
            div {{ getBuilding.floors }}

          div.col-6.q-px-md(v-if="getBuilding.parkingCount")
            div.text-caption.text-grey-8 {{ $t('entity.maps.buildings.parkingCount') }}
            div {{ getBuilding.parkingCount }}

        div.row.q-mt-md(v-if="getBuilding.area || getBuilding.managementCompany")
          div.col-6.q-px-md(v-if="getBuilding.area")
            div.text-caption.text-grey-8 {{ $t('entity.maps.buildings.area') }}
            div {{ getBuilding.area }}

          div.col-6.q-px-md(v-if="getBuilding.managementCompany")
            div.text-caption.text-grey-8 {{ $t('entity.maps.buildings.managementCompany') }}
            div {{ getBuilding.managementCompany.name }}

        div(v-if="getBuilding.builder || getBuilding.constructYear")
          div.q-mt-md.q-px-md
            q-separator

          div.row.q-mt-md
            div.col-6.q-px-md(v-if="getBuilding.builder")
              div.text-caption.text-grey-8 {{ $t('entity.maps.buildings.builder') }}
              div {{ getBuilding.builder.name }}

            div.col-6.q-px-md(v-if="getBuilding.constructYear")
              div.text-caption.text-grey-8 {{ $t('entity.maps.buildings.constructYear') }}
              div {{ getBuilding.constructYear }}


      q-tab-panel.no-padding(v-if="getCommerce.length" name="commerce")
        q-list.q-mt-md(separator)
          q-item.q-py-md(v-for="(company, i) in getCommerce" :key="i")
            q-item-section
              q-item-label {{ company.name }}
              q-item-label(v-if="company.type" caption) {{ company.type.name }}
              div.row.q-mt-sm(v-if="company.phone || company.link")
                div.col-6(v-if="company.phone")
                  div.text-caption.text-grey-8 {{ $t('entity.maps.buildings.phone') }}
                  div {{ company.phone }}

                div.col-6(v-if="company.visibleLink")
                  div.text-caption.text-grey-8 {{ $t('entity.maps.buildings.link') }}
                  a.link(:href="company.link" target="_blank") {{ company.visibleLink }}
</template>
<script>
  import url from "url";
  import { mapGetters } from "vuex";
  import ImageSlider from "../../../common/ImageSlider";

  export default {
    name: "AsideMapsBuildingsItem",
    components: { ImageSlider },
    data (){
      return {
        tab: "info"
      };
    },
    computed: {
      ...mapGetters("maps/buildings", ["getBuilding"]),
      getImages (){
        return this.getBuilding.images.map(x => x.imagePath);
      },

      getCommerce (){
        return (this.getBuilding.commerce || []).map(
          company => ({
            ...company,
            visibleLink: company.link ? url.parse(company.link).host || company.link : ""
          })
        );
      },

      backRoute (){
        return { name: "map-buildings" };
      }
    },
    methods:{
      onChangeBuildingId (){
        this.tab = "info";
      }
    },
    watch: {
      "$route.params.id": "onChangeBuildingId"
    }
  };
</script>
<style lang="stylus" scoped>
.building-info
  background: #EAF4FF;

.building-info-col_bordered
  border-right 1px solid #C0C8CF
  box-sizing border-box
</style>
