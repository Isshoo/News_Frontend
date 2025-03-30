import React from 'react';
import PropTypes from 'prop-types';

function DatasetInfo({ totalData, topicCounts }) {
  return (
    <div>
      <h2>Dataset Information</h2>
      <p>Total Data: {totalData}</p>
      <h3>Data per Topik:</h3>
      <ul>
        {Object.entries(topicCounts).map(([topic, count]) => (
          <li key={topic}>
            {topic}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
}

DatasetInfo.propTypes = {
  totalData: PropTypes.number.isRequired,
  topicCounts: PropTypes.object.isRequired,
};

export default DatasetInfo;
