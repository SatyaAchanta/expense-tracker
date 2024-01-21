import { iIconProps } from "@/types";
import React from "react";

export const DeleteIcon: React.FC<iIconProps> = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg
      data-name="Iconly/Curved/Delete"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size || width || 24}
      height={size || height || 24}
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path
          data-name="Stroke 1"
          d="M21 8v12a3 3 0 01-3 3H6a3 3 0 01-3-3V8a1 1 0 011-1h4.173a1 1 0 01.986.836l1.717 10.302a2 2 0 002 1.862h2.424a2 2 0 002-1.862L16.841 7.8A1 1 0 0118.827 7H21a1 1 0 011 1z"
        />
        <path data-name="Stroke 3" d="M10 6V3a1 1 0 011-1h2a1 1 0 011 1v3" />
      </g>
    </svg>
  );
};
