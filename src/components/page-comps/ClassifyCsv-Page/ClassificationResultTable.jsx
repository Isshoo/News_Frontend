import React from 'react';
import PropTypes from 'prop-types';

const ClassificationResultTable = ({ classificationResult, classifySingleRow }) => (
  <div className='csv-result-table'>
    <table>
      <thead>
        <tr>
          <th>Content Snippet</th>
          <th>Hybrid Predicted</th>
          <th>DeepSeek Predicted</th>
        </tr>
      </thead>
      <tbody>
        {classificationResult.map((row, index) => (
          <tr key={index}>
            <td>{row.contentSnippet}</td>
            <td>{row.Hybrid_C5_KNN || '-'}</td>
            <td>
              {!row.DeepSeek || row.DeepSeek === 'Unknown' ? (
                <button onClick={() => classifySingleRow(index, row.contentSnippet)}>
                  Classify Again
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
  classificationResult: PropTypes.array.isRequired,
  classifySingleRow: PropTypes.func.isRequired,
};

export default ClassificationResultTable;
