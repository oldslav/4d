import { renderExtendedPlace, renderPlace } from "src/cesium/renderers/place";
import { updateEntity } from "src/cesium/utils/update-entity";

export default {
  name: "stop",
  render (entity: any) {
    const visible = entity.properties.$visible && entity.properties.$visible.getValue();
    const extended = entity.properties.$extended && entity.properties.$extended.getValue();
    const images = entity.properties.images ? entity.properties.images.getValue() : [];
    const [image] = images;

    if (visible === false) {
      updateEntity(entity, () => {
        entity.show = false;
      });
    } else if (extended) {
      entity.show = true;
      renderExtendedPlace(entity, { image, label: "", radius: 22 });
    } else {
      entity.show = true;
      renderPlace(entity, { label: "", background: "#E8B5B5" });
    }
  }
};
