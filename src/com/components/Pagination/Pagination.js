import { useEffect, useState } from "react";
import uuid from "react-uuid";
import _ from "lodash";
import { Icon } from "@/com/components";

export const Pagination = ({
  page = 0,
  size = 10,
  totalCount = 100,
  pageGroupSize = 10,
  onChangePage,
  onChangeSize,
}) => {
  const [_size, _setSize] = useState();
  const [_page, _setPage] = useState();
  const [_pageGroup, _setPageGroup] = useState(0);

  const _pageGroups = _.chunk([...Array(Math.ceil(totalCount / size)).keys()], pageGroupSize);

  useEffect(() => {
    _setPage(page);
  }, [page]);

  useEffect(() => {
    _setSize(size);
  }, [size]);

  const handleChangePage = (nextPage) => {
    _setPage(nextPage);
    if (onChangePage) onChangePage(nextPage);
  };

  const handleChangeSize = (nextSize) => {
    _setSize(nextSize);
    handleChangePage(0);
    if (onChangeSize) onChangeSize(nextSize);
  };

  return (
    <div className="flex justify-between">
      <select className="input w-14" value={_size} onChange={(e) => handleChangeSize(Number(e.target.value))}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>

      <ul className="flex space-x-1">
        <button
          disabled={_pageGroup < 1}
          className="button w-7 flex items-center justify-center disabled:text-disabled"
          onClick={() => _setPageGroup((prev) => prev - 1)}>
          <Icon icon="left" size="xs" />
        </button>
        {_pageGroups[_pageGroup]?.map((_) => {
          return (
            <li key={uuid()}>
              <button
                {...(_page === _ && { "aria-current": "page" })}
                className="button min-w-[1.75rem] aria-[current=page]:text-blue"
                onClick={() => handleChangePage(_)}>
                {_ + 1}
              </button>
            </li>
          );
        })}
        <button
          className="button w-7 flex items-center justify-center disabled:text-disabled"
          disabled={_pageGroup >= _pageGroups.length - 1}
          onClick={() => _setPageGroup((prev) => prev + 1)}>
          <Icon icon="right" size="xs" />
        </button>
      </ul>
    </div>
  );
};
