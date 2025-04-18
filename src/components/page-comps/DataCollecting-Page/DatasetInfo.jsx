import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../Base/LoadingBar';

const DatasetInfo = ({ totalData = 0, topicCounts, loading }) => {
  return (
    <div className='dataset-info'>
      {loading ? (
        <Loading />
      ) : (
        <div className='dataset-info-content'>
          <p className='dataset-total'>
            <strong>Topics Count:</strong>
          </p>
          <table className='dataset-info-table'>
            <thead>
              <tr>
                <th>Topic</th>
                <th>Total Data</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(topicCounts).map(([topic, count]) => (
                <tr key={topic}>
                  <td>{topic}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

DatasetInfo.propTypes = {
  totalData: PropTypes.number,
  topicCounts: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default DatasetInfo;
