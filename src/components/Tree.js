import { FC, useState } from "react";
import classNames from "classnames";
import uuid from "react-uuid";
import { Collapse, Icon } from "@/components";

const TreeItem = (props) => {
    const { children, name } = props;

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    return (
        <li className="font-mono">
            <button className="h-7 flex items-center space-x-1.5" onClick={handleClick}>
                {children ? <Icon icon="right" size="sm" className={classNames("transition", { "rotate-90": open })} /> : <span className="w-3" />}
                <input type="checkbox" className="w-3" onClick={(e) => e.stopPropagation()} />
                <p>{name}</p>
            </button>
            {Array.isArray(children) && (
                <Collapse open={open}>
                    <ul className="pl-[1.125rem]">
                        {children.map((child) => {
                            return <TreeItem key={uuid()} {...child} />;
                        })}
                    </ul>
                </Collapse>
            )}
        </li>
    );
};

/**
 * @typedef TreeProps
 * @property {Array} data
 */

/**
 * @type FC<TreeProps>
 */
export const Tree = (props) => {
    const { data } = props;

    return (
        <ul className="w-fit">
            {data?.map((child) => {
                return <TreeItem key={uuid()} {...child} />;
            })}
        </ul>
    );
};
