import { updateEntity } from "src/cesium/utils/update-entity";

export default {
  name: "improvement",
  render (entity: ICesiumEntity): void {
    const fill = entity.properties.fill.getValue<string>();
    const visibility = entity.properties.visibility ? entity.properties.visibility.getValue<boolean>() : true;

    if (entity.billboard) {
      entity.billboard = null;
      entity.point = {
        show: true,
        color: new window.Cesium.Color.fromCssColorString(fill),
        pixelSize: 12,
        outlineWidth: 0
      };
    } else if (entity.polygon) {
      entity.polygon.outline = true;
      entity.polygon.material.color = new window.Cesium.Color.fromCssColorString(fill).withAlpha(0.7);
      entity.polygon.outlineWidth = 0;
    } else if (entity.polyline) {
      entity.polyline.width = 2;
      entity.polyline.material.color = new window.Cesium.Color.fromCssColorString(fill).withAlpha(0.5);
    }

    if (entity.show !== visibility) {
      updateEntity(entity, () => {
        entity.show = visibility;
      });
    }
  }
};
