export default {
  name: "excursion",
  render (entity: any): void {
    entity.polyline.material.color = new window.Cesium.Color.fromCssColorString("#35B3B3");
    entity.polyline.clampToGround = true;
  }
};
