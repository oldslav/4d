import { updateEntity } from "src/cesium/utils/update-entity";

export default {
  name: "route",
  render (entity: any): void {
    const visible = entity.properties.$visible && entity.properties.$visible.getValue();
    const isExtended = entity.properties.$extended ? entity.properties.$extended.getValue() : null;
    const fill = entity.properties.fill ? entity.properties.fill.getValue() : null;
    const opacity = entity.properties["stroke-opacity"] ? entity.properties["stroke-opacity"].getValue() : 0.5;

    updateEntity(entity,() => {
      entity.polyline.material.color = new window.Cesium.Color.fromCssColorString(fill).withAlpha(isExtended ? 1 : opacity);
      entity.polyline.clampToGround = true;
      entity.polyline.zIndex = isExtended ? 1 : 0;
      entity.polyline.width = isExtended ? 6 : 3;
      entity.show = !(visible === false);
    });
  }
};
