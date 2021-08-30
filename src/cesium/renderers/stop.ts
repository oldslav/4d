import { renderExtendedPlace } from "src/cesium/renderers/place";
import { updateEntity } from "src/cesium/utils/update-entity";

export default {
  name: "stop",
  render (entity: any) {
    const visible = entity.properties.$visible && entity.properties.$visible.getValue();
    const images = entity.properties.images ? entity.properties.images.getValue() : [];
    const [image] = images;

    if (visible !== true) {
      updateEntity(entity, () => {
        entity.show = false;
      });
    } else {
      entity.show = true;
      renderExtendedPlace(entity, { image, label: "", radius: 22 });
    }
  }
};
