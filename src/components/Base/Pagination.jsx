import React from 'react';
import PropTypes from 'prop-types';

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div>
      <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
        First
      </button>
      <span> </span>
      <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
        Previous
      </button>
      <span>
        {' '}
        Page {currentPage} of {totalPages}{' '}
      </span>
      <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
        Next
      </button>
      <span> </span>
      <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>
        Last
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
