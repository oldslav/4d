<template lang="pug">
  q-no-ssr
    div.cesium-tooltip(
        ref="tooltip"
        :class="{ 'cesium-tooltip_visible': visible, 'cesium-tooltip_white': !$q.dark.isActive, 'q-dark': $q.dark.isActive }"
        :style="getTooltipStyle"
      )
      slot(v-if="entity" :entity="entity")
</template>
<script>
  import { mapGetters } from "vuex";

  export default {
    props: {
      maxWidth: { type: Number, default: 400 },
      pageWidth: { type: Number, default: null },
      pageHeight: { type: Number, default: null }
    },
    mounted () {
      this.$watch("getCesium", this.onChangeCesium, { immediate: true });
    },
    data (){
      return {
        visible: false,
        entity: null
      };
    },
    computed: {
      ...mapGetters("services", ["getCesium"]),
      getParentWidth (){
        return this.pageWidth === null ? this.$parent.$el.clientWidth : this.pageWidth;
      },

      getParentHeight (){
        return this.pageHeight === null ? this.$q.screen.height - 50 : this.pageHeight;
      },

      getTooltipStyle (){
        const visible = this.visible;

        if (!visible) {
          return { maxWidth: `${ this.maxWidth }px` };
        }

        const { x, y } = this.entity.position;
        const parentWidth = this.getParentWidth;
        const parentHeight = this.getParentHeight;

        const tooltipHeight = this.$refs.tooltip.clientHeight;
        const tooltipWidth = this.$refs.tooltip.clientWidth;

        let left = x + 20;
        let top = y + 20;

        if (left + tooltipWidth > parentWidth) {
          left = x - tooltipWidth - 20;
        }

        if (top + tooltipHeight > parentHeight) {
          top = y - tooltipHeight / 2 - 20;
        }

        return {
          left: `${ left }px`,
          top: `${ top }px`,
          maxWidth: `${ this.maxWidth }px`
        };
      }
    },
    methods: {
      onChangeCesium (val) {
        if (val) {
          this.addEventListener();
        } else {
          this.removeEventListener();
        }
      },

      addEventListener () {
        const { viewer } = this.$root.map.cesiumInstance;

        this.$mouseMovehandler = new window.Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        this.$moveCameraListener = viewer.camera.moveStart.addEventListener(() => this.onMouseOutEntity());

        this.$mouseMovehandler.setInputAction((movement) => {
          const target = viewer.scene.pick(movement.endPosition);
          const targetEntity = target && target.id ? target.id : null;
          const currentId = this.entity ? this.entity.id : null;

          if (targetEntity && targetEntity.id && targetEntity.id !== currentId) {
            this.onMouseEnterEntity(viewer, targetEntity, movement);
          } else if (!targetEntity) {
            this.onMouseOutEntity();
          }
        }, window.Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      },

      onMouseEnterEntity (viewer, entity, movement) {
        this.entity = {
          id: entity.id,
          position: this.getEntityPosition(viewer, entity, movement),
          properties: entity.properties.propertyNames.reduce((res, name) => {
            res[name] = entity.properties[name].getValue();
            return res;
          },{})
        };
      },

      getEntityPosition (viewer, entity, movement) {
        if (entity.position) {
          const position3d = entity.position.getValue();
          return window.Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, position3d);
        }

        if (entity.polygon) {
          const { positions } = entity.polygon.hierarchy.getValue();
          const orientedBoundingBox = window.Cesium.OrientedBoundingBox.fromPoints(positions);

          return window.Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, orientedBoundingBox.center);
        } else {
          return movement.endPosition;
        }

        return { x: 0, y: 0 };
      },

      onMouseOutEntity (){
        this.entity = null;
      },

      removeEventListener () {
        if (this.$moveCameraListener) {
          this.$moveCameraListener();
          this.$mouseMovehandler.destroy();
        }
      }
    },
    watch:{
      entity (val) {
        if (!val) {
          this.visible = false;
          return;
        }

        this.$nextTick().then(() => {
          this.visible = true;
        });
      }
    },
    beforeDestroy () {
      this.removeEventListener();
    }
  };
</script>
<style lang="stylus">
.cesium-tooltip
  z-index -1
  position: absolute;
  box-sizing border-box
  padding: 15px;
  width 100%
  visibility hidden
  filter: drop-shadow(0px 3px 4px rgba(40, 47, 60, 0.05)) drop-shadow(0px 20px 25px rgba(40, 47, 60, 0.05)) drop-shadow(0px 0px 25px rgba(40, 47, 60, 0.05));

.cesium-tooltip_white
  background: #ffffff;

.cesium-tooltip_visible
  visibility visible
  z-index 2
</style>
