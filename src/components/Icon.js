import { cloneElement } from "react";
import classNames from "classnames";
import { icons, iconSizes } from "@/assets/icons";

/**
 *
 * @param {object} props
 * @param {keyof icons} props.icon
 * @param {keyof iconSizes} props.size
 * @returns
 */
export const Icon = ({ icon, className, size = "md" }) => {
  return cloneElement(icons[icon], {
    ...icons[icon].props,
    className: classNames(iconSizes[size], { [className]: className }),
  });
};
