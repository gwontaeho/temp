import { cloneElement } from "react";
import classNames from "classnames";
import { icons, iconSizes } from "@/assets/icons";

/**
 * @typedef {object} iconProps
 * @property {keyof icons} icon
 * @property {keyof iconSizes} size
 */

/**
 * @param {iconProps} props
 */
export const Icon = ({ icon, className, size = "md" }) => {
  return cloneElement(icons[icon], {
    ...icons[icon].props,
    className: classNames(iconSizes[size], { [className]: className }),
    strokeWidth: 2.5,
  });
};
