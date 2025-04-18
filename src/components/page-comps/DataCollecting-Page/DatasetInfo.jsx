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
          <h3>Data per Topik</h3>
          <ul className='topic-list'>
            {Object.entries(topicCounts).map(([topic, count]) => (
              <li key={topic}>
                <span className='topic-name'>{topic}</span>
                <span className='topic-count'>{count}</span>
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
