<template lang="pug">
  div.map-buildings
    q-resize-observer(ref="observer" @resize="onResizePage")
    q-no-ssr
      div.map-buildings__tooltip(
        ref="tooltip"
        :class="{ 'map-buildings__tooltip_visible': targetId, 'map-buildings__tooltip_white': !$q.dark.isActive, 'q-dark': $q.dark.isActive }"
        :style="targetId ? getTooltipStyle : {}"
      )
        div.text-subtitle1.row
          div.col.q-pr-md {{ entityInfo.name }}
          div.col-auto.text-grey-7 ID {{ entityInfo.id }}
        //div.text-subtitle2.text-grey-7
        //  | Здание жилое многоквартирное Здание жилое многоквартирное Здание жилое многоквартирное и еще раз Здание жилое многоквартирное
    router-view
</template>

<script>
  import { mapGetters } from "vuex";
  import { debounce } from "quasar";
  import { FETCH_BUILDINGS_MENU } from "../../../store/constants/action-constants";

  export default {
    name: "MapBuildings",
    preFetch ({ store }) {
      return store.dispatch(`maps/buildings/${ FETCH_BUILDINGS_MENU }`);
    },
    mounted () {
      this.$watch("getPickedFeatureId", this.onChangeTargetEntity);
      this.$watch("getCesium", this.onChangeCesium, { immediate: true });

      this.onResizePage();
    },
    data () {
      return {
        targetId: null,
        pageSize: { width: 0, height: 0 },
        entityInfo: {},
        entityPosition: { x: 0, y: 0 }
      };
    },
    computed: {
      ...mapGetters("services", ["getPickedFeatureId", "pickedFeature", "getCesium"]),
      getTooltipStyle () {
        const { x,y } = this.entityPosition;
        const { width } = this.pageSize;
        const height = this.$q.screen.height - 50;
        const tooltipHeight = this.$refs.tooltip.clientHeight;
        const tooltipWidth = this.$refs.tooltip.clientWidth;

        let left = x + 20;
        let top = y + 20;

        if (left + tooltipWidth > width) {
          left = x - tooltipWidth - 20;
        }

        if (top + tooltipHeight > height) {
          top = y - tooltipHeight / 2 - 20;
        }


        return { left: `${ left }px`, top: `${ top }px` };
      }
    },
    methods: {
      onResizePage (){
        this.pageSize = this.$refs.observer.size;
      },

      onChangeTargetEntity () {
        if (this.pickedFeature) {
          this.$router.push({
            name: "map-buildings-item",
            params: {
              layer: this.pickedFeature.properties.layer,
              id: this.pickedFeature.id
            }
          });
        }
      },

      onChangeCesium (val) {
        if (this.$root.map) {
          this.bindCesiumEvents(val);
        }
      },

      bindCesiumEvents () {
        const { viewer } = this.$root.map.cesiumInstance;
        this.$mouseMovehandler = new window.Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

        this.$moveCameraListener = viewer.camera.moveStart.addEventListener(() => {
          this.targetId = null;
        });

        this.$mouseMovehandler.setInputAction(debounce((movement) => {
          const target = viewer.scene.pick(movement.endPosition);
          const targetEntity = target && target.id ? target.id : null;

          if (targetEntity && targetEntity.id !== this.targetId) {
            this.collectEntityInfo(viewer, targetEntity);
          } else {
            this.targetId = null;
          }
        }, 100), window.Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      },

      collectEntityInfo (viewer, entity) {
        const { positions } = entity.polygon.hierarchy.getValue();
        const orientedBoundingBox = window.Cesium.OrientedBoundingBox.fromPoints(positions);

        this.entityPosition = window.Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, orientedBoundingBox.center);

        this.entityInfo = {
          name: entity.properties.name.getValue(),
          id: entity.id
        };

        this.$nextTick(() => {
          this.targetId = entity.id;
        });
      }
    },

    beforeDestroy () {
      if (this.$mouseMovehandler) {
        this.$moveCameraListener();
        this.$mouseMovehandler.destroy();
      }
    }
  };
</script>

<style lang="stylus">
.map-buildings
  position relative

.map-buildings__tooltip
  z-index -1
  position: absolute;
  box-sizing border-box
  padding: 15px;
  width 420px
  visibility hidden
  filter: drop-shadow(0px 3px 4px rgba(40, 47, 60, 0.05)) drop-shadow(0px 20px 25px rgba(40, 47, 60, 0.05)) drop-shadow(0px 0px 25px rgba(40, 47, 60, 0.05));

.map-buildings__tooltip_white
  background: #ffffff;

.map-buildings__tooltip_visible
  visibility visible
  z-index 2
</style>
