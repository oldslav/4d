import { get } from "lodash";

const MAX_CONCURRENCY = 5;

export const preloadGeoJSONImages = (geoJson: any): void => {
  const features = get(geoJson, "features", []);
  const images: string[] = [];
  let concurrency = 0;

  for (const feature of features) {
    const entityImages = get<string>(feature, "properties.images", "");
    const image = Array.isArray(entityImages) ? entityImages[0] : entityImages;

    if (image) {
      images.push(image);
    }
  }

  const next = () => {
    if (concurrency === MAX_CONCURRENCY || !images.length) {
      return;
    }

    const src = images.pop();
    const img = new Image();
    concurrency++;
    img.onload = img.onerror = () => {
      concurrency--;
      next();
    };
    img.src = src as string;
  };

  for (let i =0; i<MAX_CONCURRENCY; i++) {
    next();
  }
};
