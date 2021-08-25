<template lang="pug">
  div.column.full-height
    div.col.overflow-auto
      q-list
        q-item.q-py-lg.text-subtitle(clickable :to="getPreviewRoute")
          q-item-section.list-item-avatar(avatar)
            q-icon.text-primary(name="arrow_back")
          q-item-section(avatar)
            | {{ getLayer | i18nName }}
        q-separator

        q-item.q-py-md.text-subtitle(
          v-for="(object, index) in getLayerObjects"
         :key="object.id"
         :to="{ name: 'services-tourism-entity', params: { id: object.id } }"
         clickable
        )
          q-item-section.list-item-avatar(avatar)
            span.aside-services_tourism-layer__order(v-if="object.properties.type === tourismGeoJSONEntities.place")
              | {{ object.properties.order + 1 }}

            span.aside-services_tourism-layer__color(
              v-if="object.properties.type === tourismGeoJSONEntities.route"
              :style="{ backgroundColor: object.properties.fill }"
            )
          q-item-section
            | {{ object.properties.name }}

    div.q-px-md.q-py-md.bg-white(v-show="canDisplayAddRoute")
      q-btn.full-width(
        @click="onClickAddRoute"
        label="Предложить свой маршрут"
        color="primary"
        unelevated
        outline
      )
    NewTourismRouteModal(v-model="visibleAddModal")
</template>
<script>
  import { mapGetters } from "vuex";
  import { TourismGeoJSONEntities } from "../../../store/types/tourism";
  import ImageSlider from "../../common/ImageSlider";
  import NewTourismRouteModal from "../../services/tourism/NewTourismRouteModal";

  export default {
    name: "AsideServicesTourismLayer",
    components: { ImageSlider, NewTourismRouteModal },
    data (){
      return {
        tourismGeoJSONEntities: TourismGeoJSONEntities,
        visibleAddModal: false
      };
    },

    computed: {
      ...mapGetters("services/tourism", ["getServiceMenu", "getLayersGeoJSON"]),
      ...mapGetters(["isAuthenticated"]),
      getPreviewRoute () {
        const category = this.getCategory;

        if (category.layers.length === 1) {
          return { name: "services-tourism" };
        }

        return { name: "services-tourism-category", params: { category: category.id } };
      },

      getCategory (){
        const { params } = this.$route;
        const categoryId = parseInt(params.category, 10);
        return this.getServiceMenu.subSections.find(x => x.id === categoryId);
      },

      getLayer () {
        const { params } = this.$route;
        const layerId = parseInt(params.layer, 10);
        return this.getCategory.layers.find(x => x.id === layerId);
      },

      getLayerObjects () {
        const features = this.getLayersGeoJSON[this.getLayer.path].features;
        return features
          .filter(x => x.properties.type !== TourismGeoJSONEntities.stop)
          .sort((a, b) => {
            if ("order" in a.properties) {
              return a.properties.order - b.properties.order;
            }
            return 0;
          });
      },

      canDisplayAddRoute (){
        return this.getLayer.path.includes("route") && this.isAuthenticated;
      }
    },
    methods: {
      onClickAddRoute (){
        this.visibleAddModal = true;
      }
    }
  };
</script>
<style lang="stylus">
.aside-services_tourism-layer__order
  width 24px
  height 24px
  color #ffffff
  background-color #D26C6C
  border-radius 100%
  display inline-flex
  align-items center
  justify-content center
  line-height: 16px;
  font-size 12px

.aside-services_tourism-layer__color
  width 14px
  height 14px
  border-radius: 100%;
</style>
