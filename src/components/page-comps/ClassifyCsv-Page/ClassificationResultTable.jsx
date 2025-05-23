import React from 'react';
import PropTypes from 'prop-types';

const ClassificationResultTable = ({
  totalData,
  classificationResult,
  classifySingleRow,
  startIndex,
  retryLoading,
}) => (
  <div className='csv-result-table'>
    <div className='csv-result-table-info'>
      <h2>Classification Results</h2>
      <p>
        <strong>Total Data:</strong> {totalData}
      </p>
    </div>
    <table>
      <colgroup>
        <col style={{ width: '4%' }} />
        <col style={{ width: '70%' }} />
        <col style={{ width: '13%' }} />
        <col style={{ width: '13%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>No</th>
          <th>Text</th>
          <th>Hybrid Prediction</th>
          <th>DeepSeek Prediction</th>
        </tr>
      </thead>
      <tbody>
        {classificationResult.map((row, index) => (
          <tr key={index}>
            <td className='numbering'>{startIndex + index + 1}</td>
            <td title={row.contentSnippet} style={{ maxHeight: '3.6em', overflow: 'hidden' }}>
              {row.contentSnippet}
            </td>
            <td>{row.Hybrid_C5_KNN || 'Unknown'}</td>
            <td>
              {!row.DeepSeek || row.DeepSeek === '-' ? (
                <button
                  className='retry-button'
                  disabled={retryLoading[startIndex + index]}
                  onClick={() => classifySingleRow(startIndex + index, row.contentSnippet)}
                >
                  {retryLoading[startIndex + index] ? 'Retrying...' : 'Retry'}
                </button>
              ) : (
                row.DeepSeek
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

ClassificationResultTable.propTypes = {
  totalData: PropTypes.number.isRequired,
  classificationResult: PropTypes.array.isRequired,
  classifySingleRow: PropTypes.func.isRequired,
  startIndex: PropTypes.number.isRequired,
  retryLoading: PropTypes.object,
};
export default ClassificationResultTable;
