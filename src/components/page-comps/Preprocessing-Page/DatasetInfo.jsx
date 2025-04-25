import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../Base/LoadingBar';
import { mapLabelResult } from '../../../utils/helper';

const DatasetInfo = ({ totalData = 0, topicCounts }) => {
  return (
    <div className='dataset-info'>
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
            {Object.entries(topicCounts).length !== 0 ? (
              Object.entries(topicCounts).map(([topic, count]) => (
                <tr key={topic}>
                  <td>
                    <strong>{mapLabelResult(topic)}</strong>
                  </td>
                  <td>{count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} style={{ textAlign: 'center' }}>
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

DatasetInfo.propTypes = {
  totalData: PropTypes.number,
  topicCounts: PropTypes.object.isRequired,
};

export default DatasetInfo;
