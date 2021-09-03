import { get } from "lodash";

const MAX_CONCURRENCY = 5;

export const preloadGeoJSONImages = (geoJson: IGeoJSON): void => {
  const features = get(geoJson, "features", []) as IGeoJSONFeature[];
  const images: string[] = [];
  let concurrency = 0;

  for (const feature of features) {
    const entityImages = get(feature, "properties.images", "") as (string | string[]);
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
