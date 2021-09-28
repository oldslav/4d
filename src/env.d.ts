declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: "hash" | "history" | "abstract" | undefined;
    VUE_ROUTER_BASE: string | undefined;
    SERVER_API_HOST: string;
    BROWSER_API_HOST: string;
  }
}

declare interface Window {
  Cesium?: any
}

declare interface IGeoJSONFeature {
  properties: {
    images?: string[] | string
  }
}

declare interface IGeoJSON {
  features: IGeoJSONFeature[]
}

declare interface ICesiumEntityMaterial {
  color: any
}

declare type ICesiumEntityProperties = Record<string, { getValue: <T>() => T }>

declare interface ICesiumEntityLabel {
  text: string;
  font: string;
  style: any;
  fillColor: any;
  scale: number,
  verticalOrigin: any;
  horizontalOrigin: any;
  pixelOffset: any;
}

declare interface ICesiumEntity {
  properties: ICesiumEntityProperties;
  show: boolean;
  polygon: {
    show: boolean;
    outline: boolean;
    extrudedHeight: number;
    outlineWidth: number;
    outlineColor: any;
    material: ICesiumEntityMaterial;
  },
  polyline: {
    clampToGround: boolean;
    material: ICesiumEntityMaterial;
    zIndex: number;
    width: number;
  },
  billboard: {
    size?: number;
    width?: number;
    height?: number;
    image?: string | HTMLCanvasElement
    pixelOffset?: any
  } | null,
  label: ICesiumEntityLabel | null,
  point: {
    show: boolean;
    color: ICesiumEntityMaterial;
    pixelSize: number;
    outlineWidth: number;
  } | null,
  entityCollection: {
    remove: (ICesiumEntity) => void
    add: (ICesiumEntity) => void
  }
}
