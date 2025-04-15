import React from 'react';
import PropTypes from 'prop-types';
import { mapLabelResult } from '../../../utils/helper';

const ConfusionMatrix = ({ confusionMatrix }) => {
  if (!confusionMatrix || confusionMatrix.length === 0) {
    return null;
  }
  return (
    <div className='confusion-matrix'>
      <h3>Confusion Matrix</h3>
      <table className='confusion-table'>
        <thead>
          <tr>
            <th>True\Pred</th>
            {confusionMatrix.map((_, i) => (
              <th key={`col-${i}`}>{mapLabelResult(i)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {confusionMatrix.map((row, i) => (
            <tr key={`row-${i}`}>
              <th>{mapLabelResult(i)}</th>
              {row.map((value, j) => (
                <td key={`cell-${i}-${j}`}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ConfusionMatrix.propTypes = {
  confusionMatrix: PropTypes.array.isRequired,
};

export default ConfusionMatrix;
