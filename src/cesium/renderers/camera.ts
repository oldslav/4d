export default {
  name: "camera",
  sync: true,
  render (entity: ICesiumEntity): void {
    const fill = entity.properties.fill.getValue<string>();

    entity.show = entity.properties.visibility ? entity.properties.visibility.getValue<boolean>() : true;
    entity.billboard = null;
    entity.point = {
      show: true,
      color: new window.Cesium.Color.fromCssColorString(fill),
      pixelSize: 12,
      outlineWidth: 0
    };
  }
};
