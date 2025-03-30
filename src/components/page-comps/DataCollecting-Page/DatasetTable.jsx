import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../Base/LoadingBar';

function DatasetTable({ data, limit, currentPage, setCurrentPage, loading, totalPages }) {
  return (
    <div>
      <h2>Dataset</h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          <table border='1'>
            <thead>
              <tr>
                <th>ID</th>
                <th>contentSnippet</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan='3'>No data available.</td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.index + 1}</td>
                    <td>{row.contentSnippet}</td>
                    <td>{row.topik}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

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
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
            <span> </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              Last
            </button>
          </div>
        </>
      )}
    </div>
  );
}

DatasetTable.propTypes = {
  data: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default DatasetTable;
