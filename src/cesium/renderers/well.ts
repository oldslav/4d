export default {
  name: "well",
  sync: true,
  render (entity: ICesiumEntity): void {
    const fill = entity.properties.fill.getValue<string>();
    const active = entity.properties.active ? entity.properties.active.getValue<boolean>() : true;

    entity.show = entity.properties.visibility ? entity.properties.visibility.getValue<boolean>() : true;

    entity.billboard = null;
    entity.point = {
      show: true,
      color: new window.Cesium.Color.fromCssColorString(fill).withAlpha(active ? 1 : 0.2),
      pixelSize: 12,
      outlineWidth: 0
    };
  }
};
