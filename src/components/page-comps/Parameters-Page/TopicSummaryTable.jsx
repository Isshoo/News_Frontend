import React from 'react';
import PropTypes from 'prop-types';
import SplitSelector from './SplitSelector';
import { mapLabelResult } from '../../../utils/helper';

const TopicSummaryTable = ({
  trainSize,
  testSize,
  trainPerTopic,
  testPerTopic,
  splitSize,
  handleSplitChange,
  noDataset,
}) => {
  // Topik default – bisa ubah ke label sebenarnya kalau bukan 0-4
  const defaultTopics = ['0', '1', '2', '3', '4'];

  const isEmpty = Object.keys(trainPerTopic).length === 0 && Object.keys(testPerTopic).length === 0;

  const allTopics = Array.from(
    new Set([...Object.keys(trainPerTopic), ...Object.keys(testPerTopic)])
  );

  const renderDataRows = () =>
    allTopics.map((topic) => (
      <tr key={topic}>
        <td>{mapLabelResult(topic)}</td>
        <td>{trainPerTopic[topic] || 0}</td>
        <td>{testPerTopic[topic] || 0}</td>
      </tr>
    ));

  const renderEmptyPlaceholder = () =>
    defaultTopics.map((topic, index) => (
      <tr key={topic}>
        <td>{mapLabelResult(topic)}</td>
        {index === 0 && (
          <td colSpan='2' rowSpan={defaultTopics.length}>
            <em>
              Please select a preprocessed dataset first and choose the split size to view its topic
              distribution data after split, or select a model.
            </em>
          </td>
        )}
      </tr>
    ));

  return (
    <div className='dataset-info-content'>
      <div className='split-topic-container'>
        <h3 className='section-subtitle'>
          <span>Topics Count After Split:</span>
        </h3>
        <SplitSelector value={splitSize} onChange={handleSplitChange} noDataset={noDataset} />
      </div>

      <table className='report-table'>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Train Data</th>
            <th>Test Data</th>
          </tr>
        </thead>
        <tbody>{isEmpty ? renderEmptyPlaceholder() : renderDataRows()}</tbody>

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
  splitSize: PropTypes.number.isRequired,
  handleSplitChange: PropTypes.func.isRequired,
  noDataset: PropTypes.bool.isRequired,
};

export default TopicSummaryTable;
