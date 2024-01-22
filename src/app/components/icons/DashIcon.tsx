import { iIconProps } from "@/types";
import React from "react";

export const DashIcon: React.FC<iIconProps> = ({
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
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-dash-lg"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"
      />
    </svg>
  );
};
