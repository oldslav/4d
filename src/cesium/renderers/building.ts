import { updateEntity } from "src/cesium/utils/update-entity";

export default {
  name: "building",
  render (entity: ICesiumEntity): void {
    const visibility = entity.properties.visibility ? entity.properties.visibility.getValue<boolean>() : true;
    const z = entity.properties.z ? entity.properties.z.getValue<number>() : 1;
    const fill = entity.properties.fill.getValue();
    const active = entity.properties.active ? entity.properties.active.getValue() : true;

    updateEntity(entity, () => {
      entity.polygon.show = visibility;
      entity.polygon.extrudedHeight = z;
      entity.polygon.outline = false;
      entity.polygon.material.color = new window.Cesium.Color.fromCssColorString(fill).withAlpha(active ? 1 : 0.2);
    });
  }
};
