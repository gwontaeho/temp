import { FC, cloneElement } from "react";
import classNames from "classnames";
import { icons, iconSizes } from "@/assets/icons";

/**
 * @typedef {object} IconProps
 * @property {keyof icons} icon
 * @property {keyof iconSizes} size
 */

/**
 * @type FC<IconProps>
 */
export const Icon = ({ icon, className, size = "md" }) => {
    return cloneElement(icons[icon], {
        ...icons[icon].props,
        className: classNames(iconSizes[size], { [className]: className }),
    });
};
