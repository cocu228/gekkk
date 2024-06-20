import { Breakpoints, MediaQuery } from "./types";

export const breakpoints: Breakpoints = {
  mobile: 768
};

export const mediaQuery: MediaQuery = {
  isMobile: `@media only screen and (max-width: ${breakpoints.mobile}px)`,
  isDesktop: `@media only screen and (min-width: ${breakpoints.mobile}px)`
};
