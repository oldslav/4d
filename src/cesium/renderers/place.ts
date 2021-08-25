import {
  cachedStubPlaceImage,
  isCacheContain,
  renderCachedPlaceImage,
  renderPlacePoint
} from "src/cesium/common/place-image";
import { updateEntity } from "src/cesium/utils/update-entity";

interface IPlaceOptions {
  label: string;
  background: string;
}

interface IExtendedPlaceOptions {
  radius: number;
  label: string;
  image: string;
}

const setEntityImage = (entity: any, image: string | HTMLCanvasElement) => {
  updateEntity(entity, () => {
    entity.billboard.image = image;
  });
};


export const renderExtendedPlace = (entity: any, { radius, label, image }: IExtendedPlaceOptions) => {
  entity.billboard.size = 1;
  entity.billboard.width = radius * 2;
  entity.billboard.height = radius * 2;

  if (label) {
    entity.label = {
      text: label,
      font: "14px Helvetica",
      style: window.Cesium.LabelStyle.FILL,
      fillColor: new window.Cesium.Color.fromCssColorString("#333333"),
      scale: 1,
      verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
      horizontalOrigin: window.Cesium.HorizontalOrigin.LEFT,
      pixelOffset: new window.Cesium.Cartesian2(30, -36)
    };
  } else {
    entity.label = null;
  }

  if (isCacheContain(image)) {
    renderCachedPlaceImage({ src: image, radius }).then(
      result => setEntityImage(entity, result)
    );
  } else {
    setEntityImage(entity, cachedStubPlaceImage(radius));

    renderCachedPlaceImage({ src: image, radius })
      .then(result => setEntityImage(entity, result));
  }
};

export const renderPlace = (entity: any, { label, background }: IPlaceOptions) => {
  entity.billboard.size = 1;
  entity.billboard.width = 20;
  entity.billboard.height = 20;
  entity.label = null;

  const color = background ? "#E8B5B5" : "#D26C6C";
  const image = renderPlacePoint({ color, label: background ? "" : label });

  setEntityImage(entity, image);
};

export default {
  name: "place",
  render (entity: any) {
    const extended = entity.properties.$extended && entity.properties.$extended.getValue();
    const background = entity.properties.$background && entity.properties.$background.getValue();
    const order = entity.properties.order.getValue();

    if (extended) {
      const image = entity.properties.images.getValue();
      renderExtendedPlace(entity,{ radius: 28, label: entity.properties.name.getValue(), image });
    } else {
      renderPlace(entity, { label: order + 1, background });
    }
  }
};
