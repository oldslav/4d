const PLACE_IMAGES_CACHE: Record<string, HTMLCanvasElement> = {};

interface IPlacePointOptions {
  color: string;
  label?: string;
  size?: number;
}

interface IStubImageOptions {
  radius: number;
}

interface IImageOptions extends IStubImageOptions{
  src: string;
}

export const renderPlacePoint = ({ color, label, size = 20 }: IPlacePointOptions): string => {
  const source = `<svg width="${ size }" height="${ size }" xmlns="http://www.w3.org/2000/svg" fill="none">
    <circle fill="${ color }" r="${ size/2 }" cy="${ size/2 }" cx="${ size/2 }"/>
    <text
            font-style="normal"
            font-weight="normal"
            xml:space="preserve"
            text-anchor="middle"
            dominant-baseline="middle"
            font-family="monospace"
            font-size="12"
            y="50%"
            x="10px"
            dy="1px"
            fill="#ffffff">{label}</text>
    </svg>`;

  const result = source.replace("{label}", label || "");
  return "data:image/svg+xml;base64," + btoa(result);
};

export const renderPlaceStubImage = ({ radius }: IStubImageOptions): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  canvas.width = radius * 2;
  canvas.height = radius * 2;

  context.beginPath();
  context.shadowBlur = 5;
  context.shadowColor = "black";
  context.fillStyle = "#ffffff";
  context.arc(radius, radius, radius - 4, 0, 2 * Math.PI, true);
  context.fill();

  context.save();
  context.beginPath();
  context.arc(radius, radius, radius - 6, 0, Math.PI * 2, true);
  context.closePath();
  context.clip();
  return canvas;
};

export const cachedStubPlaceImage = (() => {
  const cache: Record<number, HTMLCanvasElement> = {};
  return (radius: number) => {
    if (cache[radius]) {
      return cache[radius];
    }
    return cache[radius] = renderPlaceStubImage({ radius });
  };
})();

export const renderPlaceImage = ({ radius, src }: IImageOptions): Promise<HTMLCanvasElement> => {
  const imageSide = radius * 2 - 6;
  const image = new Image(imageSide, imageSide);
  image.src = src;

  return new Promise((resolve) => {
    const canvas = renderPlaceStubImage({ radius });
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    image.onload = () => {
      context.drawImage(image, 3, 3, imageSide, imageSide);
      resolve(canvas);
    };

    image.onerror = () => {
      image.src = require("@/assets/svg/location.svg");
    };
  });
};

export const renderCachedPlaceImage = (() => {
  return ({ src, ...rest }: IImageOptions) => {
      if (PLACE_IMAGES_CACHE[src]) {
        return Promise.resolve(PLACE_IMAGES_CACHE[src]);
      }

      return renderPlaceImage({ src, ...rest }).then(
        result => PLACE_IMAGES_CACHE[src] = result
      );
  };
})();

export const isCacheContain = (src: string): boolean => src in PLACE_IMAGES_CACHE;
