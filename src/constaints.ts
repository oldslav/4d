const FIVE_YEARS = 1000 * 60 * 24 * 365 * 5;

export const DEFAULT_COOKIE_OPTIONS = {
  path: "/",
  expires: new Date(Date.now() + FIVE_YEARS)
};

export enum CesiumScenes {
  "2d" = "2d",
  "3d" = "3d",
}
