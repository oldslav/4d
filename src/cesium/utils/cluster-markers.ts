interface IClusterMarker {
  render: (text: string) => HTMLCanvasElement;
  width: number;
  height: number;
}

const renderMarker = (text: string, image: HTMLImageElement): HTMLCanvasElement => {
  const width = image.naturalWidth;
  const height = image.naturalHeight;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  const centerX = width / 2;
  const centerY = height / 2;

  if (ctx !== null) {
    ctx.drawImage(image, 0, 0);
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(text, centerX, centerY + 2);
  }

  return canvas;
};

export const createClusterMarkers = async (): Promise<Record<string, IClusterMarker>> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const context = require.context("@/assets/clustering", true, /\.png/);
  const sizes = context.keys()
    .map((key: string) => parseInt((key.match(/\d+/g) || [])[0], 10))
    .filter((size: number) => !Number.isNaN(size));

  const sources = sizes.map((size: number) => require(`@/assets/clustering/${ size }.png`));

  const awaits = sources.map((source: string) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.src = source;
    });
  });

  const images: HTMLImageElement[] = await Promise.all(awaits);

  return images.reduce((res, image: HTMLImageElement, i) => {
    const size = sizes[i];

    res[size] = {
      render: (text) => renderMarker(text, image),
      width: image.naturalWidth,
      height: image.naturalHeight
    };

    return res;
  }, {} as Record<string, IClusterMarker>);
};
