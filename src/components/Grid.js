import { Fragment, useEffect, useState } from "react";
import { FormControl } from "./FormControl";
import _ from "lodash";

export const Grid = (props) => {
  const { __grid__, gridData, schema, data } = props;
  const CONTENT_ID_KEY = "__" + __grid__ + "__content__id__";

  const heads = schema?.head || [];
  const bodies = schema?.body || [];
  const options = schema?.options || {};

  let { page, setPage, size, setSize } = props;
  const [_page_edit, _setPage_edit] = useState(0); // only edit
  const [_size_edit, _setSize_edit] = useState(10); // only edit
  page = options.edit ? _page_edit : page;
  setPage = options.edit ? _setPage_edit : setPage;
  size = options.edit ? _size_edit : size;
  setSize = options.edit ? _setSize_edit : setSize;

  const { content = [], totCnt = 0 } = data || {};
  const [_content, _setContent] = useState([]);
  const [pageGroup, setPageGroup] = useState(0);
  const totalCount = options.edit ? _content.length : totCnt; // only edit
  const _content_edit_group = _.chunk(_content, size); // only edit
  const _content_edit = _content_edit_group[page] || []; // only edit
  const totPage = Math.ceil(totalCount / size) || 0;
  const pageGroupSize = 10;
  const pageGroups = _.chunk([...Array(totPage).keys()], pageGroupSize);

  useEffect(() => {
    if (options.checkbox) unCheckboxAll();
  }, [options, page]);

  useEffect(() => {
    resetContent();
  }, [data]);

  useEffect(() => {
    if (!gridData?.current) return;
    gridData.current = _content;
  }, [_content]);

  useEffect(() => {
    if (!options.edit) return;
    if (_content_edit_group.length < page + 1) {
      setPage((prev) => (prev > 0 ? prev - 1 : prev));
    }
  }, [_content_edit_group]);

  const resetContent = () => {
    _setContent(content.map((_, i) => ({ ..._, [CONTENT_ID_KEY]: `origin.${i}.${page}.${size}` })));
  };

  const unCheckboxAll = () => {
    const node = document.getElementsByName(`${__grid__}.checkbox.all`)[0];
    node.checked = false;
  };
  const handleChangeCheckBoxAll = (e) => {
    const checked = e.target.checked;
    const nodes = document.getElementsByName(`${__grid__}.checkbox`);
    nodes.forEach((node) => (node.checked = checked));
  };
  const handleChangeCheckbox = () => {
    const every = Array.from(document.getElementsByName(`${__grid__}.checkbox`)).every((node) => node.checked);
    const node = document.getElementsByName(`${__grid__}.checkbox.all`)[0];
    node.checked = every;
  };

  // only edit
  const handleChangeInput = (e, rowId, colId) => {
    const value = e.target.value;
    _setContent((prev) => {
      const next = prev.map((row) => {
        if (row[CONTENT_ID_KEY] === rowId) row[colId] = value;
        return row;
      });
      return next;
    });
  };
  // only edit
  const handleClickAdd = () => {
    unCheckboxAll();
    setPage((prev) => (totPage - 1 > 0 ? totPage - 1 : prev));
    _setContent((prev) => [
      ...prev,
      bodies
        .flat()
        .reduce((prev, curr) => ({ ...prev, [curr.id]: "" }), { [CONTENT_ID_KEY]: `new.${new Date().getTime()}` }),
    ]);
  };
  // only edit
  const handleClickRemove = () => {
    const indexes = Array.from(document.getElementsByName(`${__grid__}.checkbox`))
      .filter((node) => node.checked)
      .map((node) => Number(node.value));
    if (!indexes.length) return;
    unCheckboxAll();
    _setContent((prev) => {
      const next = prev.filter((_, i) => !indexes.map((__) => __ + page * size).includes(i));
      return next;
    });
  };

  const gridHeaderEditProps = { resetContent, handleClickAdd, handleClickRemove };
  const gridTableBodyProps = {
    __grid__,
    bodies,
    _content,
    options,
    page,
    size,
    CONTENT_ID_KEY,
    _content_edit,
    handleChangeCheckbox,
    handleChangeInput,
  };
  const gridTableHeadProps = { __grid__, heads, options, handleChangeCheckBoxAll };
  const gridPaginationProps = {
    __grid__,
    page,
    size,
    setSize,
    totalCount,
    pageGroup,
    pageGroups,
    setPage,
    setPageGroup,
  };

  return (
    <div className="space-y-4">
      {options.edit && <GridHeader_Edit {...gridHeaderEditProps} />}
      <table className="w-full border [&_td]:border [&_th]:border">
        <GridTableHead {...gridTableHeadProps} />
        <GridTableBody {...gridTableBodyProps} />
      </table>
      <GridPagination {...gridPaginationProps} />
    </div>
  );
};

const GridHeader_Edit = ({ resetContent, handleClickAdd, handleClickRemove }) => {
  return (
    <div className="p-2 ps-3 pe-3">
      {/* <Layout.Right>
                <Layout.IconButton icon={["fa", "redo"]} type="primary" size="xs" onClick={resetContent} />
                <Layout.IconButton icon={["fa", "plus"]} type="primary" size="xs" onClick={handleClickAdd} />
                <Layout.IconButton icon={["fa", "minus"]} type="danger" size="xs" onClick={handleClickRemove} />
            </Layout.Right> */}
    </div>
  );
};

const GridTableHead = ({ __grid__, heads, options, handleChangeCheckBoxAll }) => {
  return (
    <thead className="bg-header h-10">
      {heads.map((col, i) => {
        return (
          <tr key={`${__grid__}.head.${i}`}>
            {i === 0 && options.checkbox && (
              <th className="w-10" rowSpan={heads.length}>
                <input type="checkbox" name={`${__grid__}.checkbox.all`} onChange={handleChangeCheckBoxAll} />
              </th>
            )}
            {i === 0 && options.radio && <th className="w-10" rowSpan={heads.length} />}
            {col.map(({ label, rowSpan, colSpan }, _i) => {
              return (
                <th key={`${__grid__}.head.${i}.${_i}`} rowSpan={rowSpan} colSpan={colSpan}>
                  {label}
                </th>
              );
            })}
          </tr>
        );
      })}
    </thead>
  );
};

const GridTableBody = ({
  __grid__,
  bodies,
  _content,
  options,
  page,
  size,
  CONTENT_ID_KEY,
  _content_edit,
  handleChangeCheckbox,
  handleChangeInput,
}) => {
  return (
    <tbody>
      {!options.edit &&
        _content.map((row, i) => {
          return (
            <Fragment key={row[CONTENT_ID_KEY]}>
              {bodies.map((cols, _i) => {
                return (
                  <tr key={`${row[CONTENT_ID_KEY]}.${_i}`} style={{ height: 40 }}>
                    {_i === 0 && options.checkbox && (
                      <td rowSpan={bodies.length} className="text-center">
                        <input
                          type="checkbox"
                          name={`${__grid__}.checkbox`}
                          value={i}
                          onChange={handleChangeCheckbox}
                        />
                      </td>
                    )}
                    {_i === 0 && options.radio && (
                      <td rowSpan={bodies.length} className="text-center">
                        <input type="radio" name={`${__grid__}.radio`} value={i} />
                      </td>
                    )}
                    {cols.map((col, __i) => {
                      const { rowSpan, colSpan, cel } = col;
                      return (
                        <td
                          className="p-2"
                          key={`${row[CONTENT_ID_KEY]}.${_i}.${__i}`}
                          rowSpan={rowSpan}
                          colSpan={colSpan}>
                          {Array.isArray(cel) &&
                            cel.map(({ id, render, onClick }, ___i) => {
                              return (
                                <Fragment key={`${row[CONTENT_ID_KEY]}.${_i}.${__i}.${___i}`}>
                                  {render ? (
                                    render(row)
                                  ) : onClick ? (
                                    <button onClick={() => onClick(row)}>{row[id]}</button>
                                  ) : (
                                    row[id]
                                  )}
                                </Fragment>
                              );
                            })}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </Fragment>
          );
        })}
      {options.edit &&
        _content_edit.map((row, i) => {
          return (
            <Fragment key={row[CONTENT_ID_KEY]}>
              {bodies.map((cols, _i) => {
                return (
                  <tr key={`${row[CONTENT_ID_KEY]}.${_i}`} style={{ height: 40 }}>
                    {_i === 0 && options.checkbox && (
                      <td rowSpan={bodies.length} className="text-center">
                        <input
                          type="checkbox"
                          name={`${__grid__}.checkbox`}
                          value={i + page * size}
                          onChange={handleChangeCheckbox}
                        />
                      </td>
                    )}
                    {_i === 0 && options.radio && (
                      <td rowSpan={bodies.length} className="text-center">
                        <input type="radio" name={`${__grid__}.radio`} value={i + page * size} />
                      </td>
                    )}
                    {cols.map((col, __i) => {
                      const { rowSpan, colSpan, cel } = col;
                      return (
                        <td
                          key={`${row[CONTENT_ID_KEY]}.${_i}.${__i}`}
                          rowSpan={rowSpan}
                          colSpan={colSpan}
                          className="py-0">
                          {Array.isArray(cel) && (
                            <div>
                              {cel.map(({ id, ...rest }, ___i) => {
                                return (
                                  <FormControl
                                    key={`${row[CONTENT_ID_KEY]}.${_i}.${__i}.${___i}`}
                                    {...rest}
                                    defaultValue={row[id]}
                                    onChange={(e) => handleChangeInput(e, row[CONTENT_ID_KEY], id)}
                                  />
                                );
                              })}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </Fragment>
          );
        })}
    </tbody>
  );
};

const GridPagination = ({
  __grid__,
  page,
  size,
  setSize,
  totalCount,
  pageGroup,
  pageGroups,
  setPage,
  setPageGroup,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center space-x-4">
          <p>{`${page * size + 1} to ${(page + 1) * size} of ${totalCount}`}</p>
          <p>Rows per page:</p>
          <FormControl
            type="select"
            size="fit"
            value={String(size)}
            onChange={(e) => {
              setPage(0);
              setSize(Number(e.target.value));
            }}
            options={[
              { label: "10", value: 10 },
              { label: "20", value: 20 },
              { label: "30", value: 30 },
              { label: "40", value: 40 },
            ]}
          />
        </div>
      </div>
      <div>
        <ul className="flex space-x-1">
          <button
            disabled={pageGroup < 1}
            className="px-2 py-1.5 rounded bg-bg w-fit shadow disabled:text-disabled"
            onClick={() => setPageGroup((prev) => prev - 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          {pageGroups[pageGroup]?.map((_) => {
            return (
              <li key={`${__grid__}.page.${_}`} className={_ === page ? "active" : ""}>
                <button
                  {...(page === _ && { "aria-current": "page" })}
                  className="px-2 py-1.5 rounded bg-bg shadow aria-[current=page]:text-bl"
                  onClick={() => setPage(_)}>
                  {_ + 1}
                </button>
              </li>
            );
          })}
          <button
            className="px-2 py-1.5 rounded bg-bg shadow disabled:text-disabled"
            disabled={pageGroup >= pageGroups.length - 1}
            onClick={() => setPageGroup((prev) => prev + 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </ul>
      </div>
    </div>
  );
};
