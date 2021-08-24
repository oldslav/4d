export function toDegrees (Cesium: Record<any, any>, cartesian3Pos: unknown): Array<number> {
  const pos = new Cesium.Cartographic.fromCartesian(cartesian3Pos);
  return [pos.longitude / Math.PI * 180, pos.latitude / Math.PI * 180];
}
