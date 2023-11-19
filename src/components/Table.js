import { FC } from "react";
import classNames from "classnames";

export const Table = ({ children }) => {
    return (
        <table className="table-fixed w-full [&_th]:border [&_th]:h-10 [&_th]:bg-header [&_td]:border [&_td]:h-10 [&_td]:p-1 [&_th]:p-1">
            <tbody>{children}</tbody>
        </table>
    );
};

const Tr = ({ children }) => {
    return <tr>{children}</tr>;
};

/**
 * @typedef {object} cellProps
 * @property {boolean} required
 * @property {number} colSpan
 * @property {number} rowSpan
 * @property {string} width
 */

/**
 * @type FC<cellProps>
 */
const Th = (props) => {
    const { children, required, colSpan, rowSpan, width } = props;
    return (
        <th className="relative" colSpan={colSpan} rowSpan={rowSpan} width={width}>
            {children}
            {required && <span className={classNames("text-invalid ml-0.5", { "absolute top-0 right-0.5": typeof children !== "string" })}>*</span>}
        </th>
    );
};

/**
 * @type FC<cellProps>
 */
const Td = (props) => {
    const { children, required, colSpan, rowSpan, width } = props;
    return (
        <td className="relative" colSpan={colSpan} rowSpan={rowSpan} width={width}>
            {children}
            {required && <span className={classNames("text-invalid ml-0.5", { "absolute top-0 right-0.5": typeof children !== "string" })}>*</span>}
        </td>
    );
};

Table.Tr = Tr;
Table.Th = Th;
Table.Td = Td;
