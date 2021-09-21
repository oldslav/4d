import { updateEntity } from "src/cesium/utils/update-entity";

export default {
  name: "pipe",
  render (entity: ICesiumEntity): void {
    const fill = entity.properties.fill.getValue<string>();
    const visibility = entity.properties.visibility ? entity.properties.visibility.getValue<boolean>() : true;
    const active = entity.properties.active ? entity.properties.active.getValue() : true;
    const extended = entity.properties.extended ? entity.properties.extended.getValue() : false;

    entity.polyline.zIndex = 0;

    updateEntity(entity, () => {
      entity.show = Boolean(visibility);
      entity.polyline.width = extended ? 6 : 3;
      entity.polyline.material.color = new window.Cesium.Color.fromCssColorString(fill).withAlpha(active ? 1 : 0.2);
    });
  }
};
