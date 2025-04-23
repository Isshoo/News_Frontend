import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../Base/LoadingBar';
import { mapLabelResult } from '../../../utils/helper';

const ParameterInfo = ({ totalData = 0, topicCounts }) => {
  const defaultTopics = ['0', '1', '2', '3', '4'];
  const isEmpty = !topicCounts || Object.keys(topicCounts).length === 0;

  const renderDataRows = () =>
    Object.entries(topicCounts).map(([topic, count]) => (
      <tr key={topic}>
        <td>{mapLabelResult(topic)}</td>
        <td>{count}</td>
      </tr>
    ));

  const renderEmptyPlaceholder = () =>
    defaultTopics.map((topic, index) => (
      <tr key={topic}>
        <td>{mapLabelResult(topic)}</td>
        {index === 0 && (
          <td rowSpan={defaultTopics.length} colSpan='1'>
            <em>
              Please select a dataset and preprocessed dataset or select a model to view its topic
              distribution data.
            </em>
          </td>
        )}
      </tr>
    ));

  return (
    <div className='dataset-info'>
      <div className='dataset-info-content'>
        <h3 className='section-subtitle'>
          <span>Topics Count:</span>
        </h3>
        <table className='report-table'>
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '60%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Topic</th>
              <th>Total Data</th>
            </tr>
          </thead>
          <tbody>{isEmpty ? renderEmptyPlaceholder() : renderDataRows()}</tbody>

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
    </div>
  );
};

ParameterInfo.propTypes = {
  totalData: PropTypes.number,
  topicCounts: PropTypes.object.isRequired,
};

export default ParameterInfo;
