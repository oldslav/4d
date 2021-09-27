import { updateEntity } from "src/cesium/utils/update-entity";

export default {
  name: "territory-feature",
  render (entity: ICesiumEntity): void {
    const visibility = entity.properties.visibility ? entity.properties.visibility.getValue<boolean>() : true;
    const fill = entity.properties.fill.getValue();


    updateEntity(entity, () => {
      entity.show = visibility;

      if (entity.polygon) {
        entity.polygon.outline = true;
        entity.polygon.material.color = new window.Cesium.Color.fromCssColorString(fill).withAlpha(0.5);
        entity.polygon.outlineWidth = 2;
        entity.polygon.outlineColor = new window.Cesium.Color.fromCssColorString(fill).withAlpha(0.7);
      } else if (entity.polyline) {
        entity.polyline.width = 2;
        entity.polyline.material.color = new window.Cesium.Color.fromCssColorString(fill).withAlpha(0.5);
      }
    });
  }
};
