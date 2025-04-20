// src/components/page-comps/Parameters-Page/TopicSummaryTable.jsx
import React from 'react';
import PropTypes from 'prop-types';

const TopicSummaryTable = ({ trainSize, testSize, trainPerTopic, testPerTopic }) => {
  // Gabungkan semua topik yang muncul di train maupun test
  const allTopics = Array.from(
    new Set([...Object.keys(trainPerTopic), ...Object.keys(testPerTopic)])
  );

  return (
    <div className='summary-section'>
      <table className='dataset-info-table'>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Train Data</th>
            <th>Test Data</th>
          </tr>
        </thead>
        <tbody>
          {allTopics.map((topic) => (
            <tr key={topic}>
              <td>{topic}</td>
              <td>{trainPerTopic[topic] || 0}</td>
              <td>{testPerTopic[topic] || 0}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className='summary-total-row'>
            <td>
              <strong>Total</strong>
            </td>
            <td>
              <strong>{trainSize}</strong>
            </td>
            <td>
              <strong>{testSize}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

TopicSummaryTable.propTypes = {
  trainSize: PropTypes.number.isRequired,
  testSize: PropTypes.number.isRequired,
  trainPerTopic: PropTypes.object.isRequired,
  testPerTopic: PropTypes.object.isRequired,
};

export default TopicSummaryTable;
