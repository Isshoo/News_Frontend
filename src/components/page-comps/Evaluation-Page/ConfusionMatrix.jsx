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
        <th>True\Pred</th>
        {defaultLabels.map((label) => (
          <th key={`col-${label}`}>{mapLabelResult(label)}</th>
        ))}
      </tr>
    </thead>
  );

  const renderBody = () => {
    if (isEmpty) {
      return defaultLabels.map((label, index) => (
        <tr key={`row-${label}`}>
          <th>{mapLabelResult(label)}</th>
          {index === 0 && (
            <td colSpan={defaultLabels.length} rowSpan={defaultLabels.length}>
              <em>Confusion matrix is not available. please select a model first.</em>
            </td>
          )}
        </tr>
      ));
    }

    return confusionMatrix.map((row, i) => (
      <tr key={`row-${i}`}>
        <th>{mapLabelResult(i)}</th>
        {row.map((value, j) => (
          <td key={`cell-${i}-${j}`}>{value}</td>
        ))}
      </tr>
    ));
  };

  return (
    <div className='confusion-matrix'>
      <h3>Confusion Matrix</h3>
      <table className='confusion-table'>
        <colgroup>
          <col style={{ width: '25%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
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
