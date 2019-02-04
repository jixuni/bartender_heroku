import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = props => {
  const {
    itemsCount,
    pageSize,
    currentPage,
    onPageNext,
    onPagePrevious
  } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
          <a className="page-link" onClick={() => onPagePrevious()}>
            {"<<"}
          </a>
        </li>
        <li key={currentPage} className="page-item active page-link">
          {currentPage}
        </li>
        <li
          className={
            currentPage === pages.length - 1
              ? "page-item disabled"
              : "page-item"
          }
        >
          <a className="page-link" onClick={() => onPageNext()}>
            {">>"}
          </a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageNext: PropTypes.func.isRequired,
  onPagePrevious: PropTypes.func.isRequired
};

export default Pagination;
