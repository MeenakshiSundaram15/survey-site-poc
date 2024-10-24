import { SVGAttributes } from "react";

export const SortIcon = ({ order, ...rest}: SVGAttributes<HTMLOrSVGElement> & { order: "asc" | "desc" }) => (
  <svg width="1em" height="1em" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
    <path
      d="M14.6843 10.7156L11.7939 13.606C11.6132 13.7867 11.282 13.7867 11.1014 13.606L8.21094 10.7156C8.03029 10.5349 8.03029 10.2037 8.21094 10.0231C8.39159 9.84243 8.72278 9.84243 8.90344 10.0231L10.9809 12.1006V0.71953C10.9809 0.478661 11.1917 0.237793 11.4627 0.237793C11.7035 0.237793 11.9444 0.478661 11.9444 0.71953V12.1006L13.9918 10.0231C14.1724 9.84243 14.5036 9.84243 14.6843 10.0231C14.8649 10.2037 14.8649 10.5349 14.6843 10.7156Z"
      fill="currentColor"
      className={`duration-300 origin-center ${order !== 'desc' ? 'opacity-25 scale-75' : ''}`}
      
    />
    <path
      d="M4.0856 0.388232L6.97602 3.27865C7.15667 3.4593 7.15667 3.7905 6.97602 3.97115C6.79537 4.1518 6.46417 4.1518 6.28352 3.97115L4.23614 1.89366V13.2446C4.23614 13.5156 3.99527 13.7263 3.7544 13.7263C3.48342 13.7263 3.27266 13.5156 3.27266 13.2446V1.89366L1.19517 3.97115C1.01452 4.1518 0.683327 4.1518 0.502676 3.97115C0.322024 3.7905 0.322024 3.4593 0.502676 3.27865L3.3931 0.388232C3.57375 0.20758 3.90494 0.20758 4.0856 0.388232Z"
      fill="currentColor"
      className={`duration-300 origin-center ${order !== 'asc' ? 'opacity-25 scale-75' : ''}`}
    />
  </svg>
);