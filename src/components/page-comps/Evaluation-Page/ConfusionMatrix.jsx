import React from 'react';
import PropTypes from 'prop-types';
import { mapLabelResult } from '../../../utils/helper';

const ConfusionMatrix = ({ confusionMatrix }) => {
  const defaultLabels = [0, 1, 2, 3, 4]; // Tetap tampilkan label 5 kelas
  const isEmpty =
    !confusionMatrix ||
    confusionMatrix.length === 0 ||
    confusionMatrix.every((row) => row.every((val) => val === 0));

  const renderHeader = () => (
    <thead>
      <tr>
        <th colSpan='2' rowSpan='2' className='label-header'>
          Label
        </th>
        <th colSpan={defaultLabels.length} className='predicted-header'>
          Predicted
        </th>
      </tr>
      <tr>
        {defaultLabels.map((label) => (
          <th key={`col-${label}`}>{mapLabelResult(label)}</th>
        ))}
      </tr>
    </thead>
  );

  const renderBody = () => {
    return (
      <>
        <tr>
          <th rowSpan={defaultLabels.length + 1} className='actual-header'>
            Actual
          </th>
        </tr>
        {defaultLabels.map((category, i) => (
          <tr key={`row-${i}`}>
            <th className='row-category'>{mapLabelResult(category)}</th>
            {isEmpty ? (
              i === 2 ? (
                <td colSpan={defaultLabels.length} className='empty-cell'>
                  <em>Confusion matrix is not available. Please select a model first.</em>
                </td>
              ) : (
                // Create empty cells for other rows when in empty state
                Array(defaultLabels.length)
                  .fill(0)
                  .map((_, j) => <td key={`empty-cell-${i}-${j}`} className='empty-cell'></td>)
              )
            ) : (
              // When data is available, display actual values
              (confusionMatrix[i] || Array(defaultLabels.length).fill(0)).map((value, j) => (
                <td key={`cell-${i}-${j}`}>{value}</td>
              ))
            )}
          </tr>
        ))}
      </>
    );
  };

  return (
    <div className='confusion-matrix'>
      <h3>Confusion Matrix</h3>
      <table className='confusion-table'>
        <colgroup>
          <col style={{ width: '5%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
        </colgroup>
        {renderHeader()}
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
};

ConfusionMatrix.propTypes = {
  confusionMatrix: PropTypes.array.isRequired,
};

export default ConfusionMatrix;
