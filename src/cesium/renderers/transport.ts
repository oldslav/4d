import { updateEntity } from "src/cesium/utils/update-entity";

export default {
  name: "transport",
  render (entity: ICesiumEntity): void {
    const fill = entity.properties.fill.getValue<string>();
    const visibility = entity.properties.visibility ? entity.properties.visibility.getValue<boolean>() : true;
    const active = entity.properties.active ? entity.properties.active.getValue() : true;
    const extended = entity.properties.extended ? entity.properties.extended.getValue() : false;

    updateEntity(entity, () => {
      entity.show = visibility;

      if (entity.billboard) {
        entity.billboard = null;
        entity.point = {
          show: true,
          color: new window.Cesium.Color.fromCssColorString(fill).withAlpha(active ? 1 : 0.2),
          pixelSize: 12,
          outlineWidth: 0
        };
      } else if (entity.polyline) {
        entity.polyline.material.color = new window.Cesium.Color.fromCssColorString(fill).withAlpha(active ? 1 : 0.2);
        entity.polyline.clampToGround = true;
        entity.polyline.width = extended ? 6 : 3;
      } else if (entity.polygon) {
        entity.polygon.outline = false;
        entity.polygon.material.color = new window.Cesium.Color.fromCssColorString(fill).withAlpha(active ? 1 : 0.2);
      }
    });
  }
};
