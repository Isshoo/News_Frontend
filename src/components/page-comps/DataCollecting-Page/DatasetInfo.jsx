import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../Base/LoadingBar';

const DatasetInfo = ({ totalData = 0, topicCounts, loading }) => {
  return (
    <div className='dataset-info'>
      {loading ? (
        <Loading />
      ) : (
        <>
          {totalData !== 0 ? <p>Total Data: {totalData}</p> : ''}
          <h3>Data per Topik:</h3>
          <ul>
            {Object.entries(topicCounts).map(([topic, count]) => (
              <li key={topic}>
                {topic}: {count}
              </li>
            ))}
          </ul>
        </>
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
