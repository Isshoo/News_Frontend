import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../Base/LoadingBar';

const DatasetTable = ({ data, loading }) => {
  return (
    <div className='dataset-table'>
      <h2>Dataset</h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          <table>
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
        </>
      )}
    </div>
  );
};

DatasetTable.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default DatasetTable;
