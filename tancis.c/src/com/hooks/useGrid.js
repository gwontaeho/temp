import { useRef, useState } from "react";

/**
 *
 * @param {Object} props
 * @param {Object} props.defaultSchema
 * @returns
 */
export const useGrid = (props) => {
  const { defaultSchema } = props || {};
  const { __grid__, ..._schema } = defaultSchema || {};

  const gridData = useRef([]);
  const [schema] = useState(_schema);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const getData = () => {
    return gridData.current;
  };

  const getChecked = () => {
    const indexes = Array.from(document.getElementsByName(`${__grid__}.checkbox`))
      .filter((node) => node.checked)
      .map((node) => Number(node.value));
    return gridData.current.filter((_, i) => indexes.includes(i));
  };

  const getSelected = () => {
    const index = Number(
      Array.from(document.getElementsByName(`${__grid__}.radio`)).filter((node) => node.checked)[0]?.value
    );
    return gridData.current.find((_, i) => i === index);
  };

  const grid = { __grid__, gridData, schema, page, setPage, size, setSize };

  return { grid, page, size, getData, getChecked, getSelected };
};
