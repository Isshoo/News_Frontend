import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../Base/LoadingBar';

const ParameterInfo = ({ totalData = 0, topicCounts, loading }) => {
  return (
    <div className='dataset-info'>
      {loading ? (
        <Loading />
      ) : (
        <div className='dataset-info-content'>
          <h3 className='section-subtitle'>
            <span>Topics Count:</span>
          </h3>
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
            <tfoot>
              <tr className='summary-total-row'>
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>{totalData}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

ParameterInfo.propTypes = {
  totalData: PropTypes.number,
  topicCounts: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ParameterInfo;
