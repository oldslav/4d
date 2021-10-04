<template lang="pug">
  div.column.full-height
    div.col.overflow-auto
      q-list
        q-item.q-py-lg.text-subtitle(clickable :to="getPreviewRoute")
          q-item-section.list-item-avatar(avatar)
            q-icon.text-primary(name="arrow_back")
          q-item-section(avatar)
            | {{ getLayer.name }}
        q-separator

        q-item.q-py-md.text-subtitle(
          v-for="(object, index) in getLayerObjects"
          :key="object.id"
          :to="{ name: 'map-tourism-entity', params: { id: object.id } }"
          @click="setFeatureId(object.id)"
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

          q-item-section(v-if="canDisplayAddRoute" side center)
            q-btn(
              @click.stop.prevent="toggleRouteVisibility(object.id, object.properties.$visible)"
              :icon="object.properties.$visible === false ? 'visibility_off' : 'visibility'"
              size="12px"
              flat
              dense
              round
            )

    div.q-px-md.q-py-md.bg-white(v-show="canDisplayAddRoute")
      q-btn.full-width(
        @click="onClickAddRoute"
        :label="$t('entity.services.tourism.labels.offerRoute')"
        color="primary"
        unelevated
        outline
      )
    NewTourismRouteModal(v-model="visibleAddModal")
</template>
<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import { SET_TOURISM_ENTITY_VISIBILITY } from "../../../../store/constants/action-constants";
  import { TourismGeoJSONEntities } from "../../../../store/types/tourism";
  import ImageSlider from "../../../common/ImageSlider";
  import NewTourismRouteModal from "../../../services/tourism/NewTourismRouteModal";
  import { SET_FEATURE_ID } from "../../../../store/constants/mutation-constants";

  export default {
    name: "AsideMapsTourismLayer",
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
          return { name: "map-tourism" };
        }

        return { name: "map-tourism-category", params: { category: category.id } };
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
            return a.id - b.id;
          });
      },

      canDisplayVisibleSwitcher (){
        return this.getLayer.path.includes("route");
      },

      canDisplayAddRoute (){
        return this.getLayer.path.includes("route") && this.isAuthenticated;
      }
    },
    methods: {
      ...mapMutations("services", [
        SET_FEATURE_ID
      ]),

      ...mapActions("services/tourism", {
        setEntityVisibility: SET_TOURISM_ENTITY_VISIBILITY
      }),

      setFeatureId (id) {
        this.SET_FEATURE_ID(id);
      },

      onClickAddRoute (){
        this.visibleAddModal = true;
      },

      toggleRouteVisibility (id, currentVisibility){
        this.setEntityVisibility({
          visibility: currentVisibility === false,
          id,
          layer: this.getLayer.path
        });
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
