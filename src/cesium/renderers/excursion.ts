export default {
  name: "excursion",
  render (entity: ICesiumEntity): void {
    entity.polyline.material.color = new window.Cesium.Color.fromCssColorString("#35B3B3");
    entity.polyline.clampToGround = true;
  }
};
