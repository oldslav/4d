import { renderExtendedPlace, renderPlace } from "src/cesium/renderers/place";

export default {
  name: "stop",
  render (entity: any) {
    const extended = entity.properties.$extended && entity.properties.$extended.getValue();
    const images = entity.properties.images ? entity.properties.images.getValue() : [];
    const [image] = images;

    if (extended) {
      renderExtendedPlace(entity, { image, label: "", radius: 22 });
    } else {
      renderPlace(entity, { label: "", background: "#E8B5B5" });
    }
  }
};
