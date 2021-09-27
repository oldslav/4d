import { keyBy } from "lodash";

import renderers from "./renderers";

const renderersByName = keyBy(renderers,"name");

export default (entities: ICesiumEntity[]): void => {
  for (const entity of entities) {
    const type = entity.properties.type ? entity.properties.type.getValue<string>() : null;

    if (type && type in renderersByName) {
      renderersByName[type].render(entity);
    }
  }
};
