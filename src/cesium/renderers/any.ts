import { updateEntity } from "src/cesium/utils/update-entity";

export default {
  render (entity: ICesiumEntity): void {
    updateEntity(entity,() => {
      entity.show = entity.properties.visibility ? entity.properties.visibility.getValue<boolean>() : true;
    });
  }
};
