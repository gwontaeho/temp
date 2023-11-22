import classNames from "classnames";

/**
 * @typedef {object} tableProps
 * @property {boolean} border
 */

/**
 * @param {tableProps} props
 */
export const Table = (props) => {
  const { children, border = true } = props;

  return (
    <table
      className={classNames("table-fixed w-full [&_th]:h-10 [&_th]:bg-header [&_td]:h-10 [&_td]:p-1 [&_th]:p-1", {
        "[&_th]:border [&_td]:border [&_tr]:border": border,
      })}>
      <tbody>{children}</tbody>
    </table>
  );
};

const Tr = ({ children }) => {
  return <tr>{children}</tr>;
};

/**
 * @typedef {object} tableCellProps
 * @property {boolean} required
 * @property {number} colSpan
 * @property {number} rowSpan
 * @property {string} width
 */

/**
 * @param {tableCellProps} props
 */
const Th = (props) => {
  const { children, required, colSpan, rowSpan, width } = props;
  return (
    <th className="relative" colSpan={colSpan} rowSpan={rowSpan} width={width}>
      {children}
      {required && (
        <span
          className={classNames("text-invalid ml-0.5", { "absolute top-0 right-0.5": typeof children !== "string" })}>
          *
        </span>
      )}
    </th>
  );
};

/**
 * @param {tableCellProps} props
 */
const Td = (props) => {
  const { children, required, colSpan, rowSpan, width } = props;
  return (
    <td className="relative" colSpan={colSpan} rowSpan={rowSpan} width={width}>
      {children}
      {required && (
        <span
          className={classNames("text-invalid ml-0.5", { "absolute top-0 right-0.5": typeof children !== "string" })}>
          *
        </span>
      )}
    </td>
  );
};

Table.Tr = Tr;
Table.Th = Th;
Table.Td = Td;
