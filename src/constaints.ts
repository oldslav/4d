const FIVE_YEARS = 1000 * 60 * 24 * 365 * 5;

export const DEFAULT_COOKIE_OPTIONS = {
  path: "/",
  expires: new Date(Date.now() + FIVE_YEARS)
};
