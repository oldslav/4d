import { updateEntity } from "src/cesium/utils/update-entity";

export default {
  name: "engineering-unit",
  render (entity: ICesiumEntity): void {
    const fill = entity.properties.fill.getValue<string>();
    const active = entity.properties.active ? entity.properties.active.getValue<boolean>() : true;
    const visibility = entity.properties.visibility ? entity.properties.visibility.getValue<boolean>() : true;

    if (entity.billboard) {
      entity.billboard = null;
      entity.point = {
        show: true,
        color: new window.Cesium.Color.fromCssColorString(fill).withAlpha(active ? 1 : 0.2),
        pixelSize: 12,
        outlineWidth: 0
      };
    }

    if (entity.show !== visibility) {
      updateEntity(entity,() => {
        entity.show = visibility;
      });
    }
  }
};
